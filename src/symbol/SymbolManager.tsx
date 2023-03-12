import React, { useState } from 'react'
import { ElementDefinition } from "cytoscape";
import {
    Account,
    AccountInfo,
    AccountRepository,
    NetworkType,
    Address, 
    RepositoryFactoryHttp,
    TransactionHttp,
    TransactionInfo,
    Transaction
  } from 'symbol-sdk'
import { retry } from 'rxjs';
import { createNoSubstitutionTemplateLiteral } from 'typescript';

/* SymbolBlockchain管理クラス */
export class SymbolManager{

    // 形宣言
    private _nodeUrl: string = 'https://marrons-xym-farm001.com:3001';
    private _address: string;
    private _sym = require("../../node_modules/symbol-sdk");

    // constructor
    constructor(address:string = 'NBZPR42WLMMGN56YVRO7Y4PFRVTZP4OG4Q75GPA'){
        this._address = address;
    }


    // 初期化
    public async init(){
        // Todo:Symbolアドレスのバリデーション

        // Symbolアカウント情報の取得
        //await this.setAccountInfo();

    }

    // トランザクション一覧からグラフ描画用データを出力
    public async makeElementsByRecentTransactions(pageNumber:number = 1, pageSize:number = 10, pageLimit:number=5, includeAggregate:boolean=false){

        // グラフ描画データ
        let elements: ElementDefinition[] = [];
        let nodes: ElementDefinition[] = [];
        let vektor: ElementDefinition[] = [];

        // アドレス管理リスト(グラフのノード重複登録防止)
        let addressList:Map<string, number> = new Map();

        // 基点となるアドレスを各データセットに追加
        addressList.set(this._address,0);  
        nodes.push(
            { data: { id: String(0), label: this._address }}
        );
        // ノードID初期化
        let id=1;

        // 過去のトランザクション一覧を取得
        // 取得上限に達するか、最後のPageにたどり着くまで繰り返し取得
        let offset:number = 0;  // トランザクション検索オフセット(TransactionID)
        do{
            
            // トランザクション履歴取得
            const page = await this.getRecentTransactions(pageNumber++, pageSize, offset);
            if( page == undefined ){
                break;
            }

            // トランザクションタイプごとに分けて分析 
            const txes = page.data;
            for( const tx of txes){
                // ----------------------
                // TransferTransaction
                // ----------------------
                const txType = tx['type'];
                if ( txType == 16724){

                    if( tx['transactionInfo'] == undefined || tx['signer'] == undefined ){
                        continue
                    }

                    // トランザクションハッシュ
                    const hash = tx['transactionInfo']['hash']

                    // 送信先アドレス
                    const recipientAddress = tx['recipientAddress']['address'] 
                    if (addressList.has(recipientAddress) == false){
                        addressList.set(recipientAddress,id);
                        nodes.push(
                            { data: { id: String(id++), label: recipientAddress }}
                        );
                    }
                    // 送信元アドレス
                    const fromAddress = tx['signer']['address'][`address`]  
                    if (addressList.has(fromAddress) == false){
                        addressList.set(fromAddress,id)
                        nodes.push(
                            { data: { id: String(id++), label: fromAddress }}
                        );                        
                    }    
                    // ベクトル追加
                    vektor.push(
                        { data: { source: addressList.get(fromAddress), target: addressList.get(recipientAddress), label: hash } }
                    );   
                    continue;
                }
                
                // ----------------------
                // アグリゲートトランザクション
                // -> トランザクションハッシュから詳細情報を取ってくる
                // ----------------------
                if( txType == 16705 ){

                    if(includeAggregate == false){
                        continue;
                    }

                    if( tx['transactionInfo'] == undefined){
                        continue;
                    }
                    // トランザクションハッシュ
                    const hash = tx['transactionInfo']['hash']      
                    if( hash == undefined){
                        continue;
                    }            

                    // トランザクション詳細の取得
                    const txInfo = await this.getTransactionInfo(hash);
                    for( const info of txInfo ){

                        const inner_hash = tx['transactionInfo']['hash']

                        // 送信先アドレス
                        const recipientAddress = info['recipientAddress']['address'];
                        if (addressList.has(recipientAddress) == false){
                            addressList.set(recipientAddress,id)
                            nodes.push(
                                { data: { id: String(id++), label: recipientAddress }}
                            );
                        }
                        // 送信元アドレス
                        if (tx['signer'] == undefined){
                            continue;
                        }
                        const fromAddress = tx['signer']['address'][`address`] 
                        if (addressList.has(fromAddress) == false){
                            addressList.set(fromAddress,id)
                            nodes.push(
                                { data: { id: String(id++), label: fromAddress }}
                            );
                        }
                        // ベクトル追加
                        vektor.push(
                            { data: { source: addressList.get(fromAddress), target: addressList.get(recipientAddress), label: inner_hash } }
                        );
                    }
                }
            }

            // 最後のページ or 上限到達で終了
            if ( page.isLastPage == true || pageNumber > pageLimit){
                break;
            }

        }while(1)

        console.log('FINISH');
        console.log('id = ' + id);
        console.log('total page size = ' + (pageNumber - 1) )
        
        elements = nodes.concat( vektor );
        return elements;
    }

    // ハッシュからトランザクション詳細を取得
    private async getTransactionInfo(hash:string){
        
        let txInfo:TransactionInfo[] = [];

        console.log('getTransactionInfo');
        const repositoryFactory = new RepositoryFactoryHttp(this._nodeUrl);
        const txRepo = repositoryFactory.createTransactionRepository();
        const result = await txRepo.getTransaction(hash, this._sym.TransactionGroup.Confirmed).toPromise();
        //console.log(result)

        if ( result == undefined ){
            return txInfo;
        } 

        // InnerTransactionsからTransferTransactionを抽出
        const innerTx:TransactionInfo[] = result['innerTransactions']
        for ( const tx of innerTx ){
            // TransferTransaction以外はスキップ
            if( tx['type'] != 16724){
                continue;
            }
            // トランザクション情報を取り出す
            txInfo.push( tx )
        }
        return txInfo;
    }

    // 直近のトランザクション履歴取得
    private async getRecentTransactions(pageNumber, pageSize, offset?: number){
        
        let isLastPage:boolean = false;
        let txes:Transaction[] = [];
        
        console.log('RecentTransactions');
        const repositoryFactory = new RepositoryFactoryHttp(this._nodeUrl);
        const txRepo = repositoryFactory.createTransactionRepository();
        const accountAddress = Address.createFromRawAddress(this._address);
        const result = await txRepo.search(
            {
                group:this._sym.TransactionGroup.Confirmed,
                embedded:true,
                address:accountAddress,
                pageNumber: pageNumber,
                pageSize: pageSize,
            }
        ).toPromise();
        return result;
    }

    // AccountInfoの取得
    private async setAccountInfo(){
        /*
        console.log('Set Account info');
        await this._accountHttp.getAccountInfo(this._accountAddress).subscribe({
            next: (value) => {
                this._accountInfo = value;
            },
            error: (error) => console.log("error: " + error),
            complete: () => {
                console.log(this._accountInfo);
                console.log("completed");
            }
        });
        */
    }
}