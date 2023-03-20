import React, { useState } from 'react'
import { ElementDefinition } from "cytoscape";
import {
    Account,
    AccountInfo,
    AccountRepository,
    NetworkType,
    Address, 
    MosaicInfo,
    MosaicId,
    RepositoryFactoryHttp,
    TransactionHttp,
    TransactionInfo,
    Transaction,
    NamespaceId
  } from 'symbol-sdk'
import { retry } from 'rxjs';
import { createNoSubstitutionTemplateLiteral } from 'typescript';
import axios from 'axios'
import base32Encode from 'base32-encode'

/* SymbolBlockchain管理クラス */
export class SymbolManager{

    // 形宣言
    private _nodeUrl: string = 'https://marrons-xym-farm001.com:3001';
    private _address: string = '';
    private _sym = require("../../node_modules/symbol-sdk");

    // constructor
    constructor(){
    }

    // アドレスセッター
    set address(address: string) {
        this._address = address;
    }
    
    // 初期化
    public async init(){
        // Todo:Symbolアドレスのバリデーション

        // Symbolアカウント情報の取得
        //await this.setAccountInfo();

    }

    // トランザクション一覧からグラフ描画用データを出力
    public async makeElementsByRecentTransactions(
        pageNumber:number = 1,
        pageSize:number = 10,
        pageLimit:number=5,
        includeAggregate:boolean=false
        ){

        // グラフ描画データ
        let elements: ElementDefinition[] = [];
        let nodes: ElementDefinition[] = [];
        let vektor: ElementDefinition[] = [];

        // アドレス管理リスト(グラフのノード重複登録防止)
        let addressList:Map<string, number> = new Map();

        // 基点となるアドレスを各データセットに追加
        addressList.set(this._address,0);  
        nodes.push(
            { data: { id: String(0), label: this._address, name:'name', type:'node', isParent:true }}
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
                    let recipientAddress = tx['recipientAddress']['address'] 
                    // 送信先アドレスがネームスペースだった場合
                    if( recipientAddress == undefined || tx['recipientAddress'] instanceof NamespaceId ){
                        // ネームスペースからアドレス形式に変換
                        console.log('ノード追加時にネームスペースを発見！')
                        recipientAddress = await this.getAddressByNamespace( tx['recipientAddress']  );
                    }
                    if (addressList.has(recipientAddress) == false){
                        addressList.set(recipientAddress,id);
                        nodes.push(
                            { data: { id: String(id++), label: recipientAddress, name:'name', type:'node' }}
                        );
                    }
                    // 送信元アドレス
                    const fromAddress = tx['signer']['address'][`address`]  
                    if (addressList.has(fromAddress) == false){
                        addressList.set(fromAddress,id)
                        nodes.push(
                            { data: { id: String(id++), label: fromAddress, name:'name', type:'node' }}
                        );                        
                    }    
                    // ベクトル追加
                    vektor.push(
                        { data: { source: addressList.get(fromAddress), target: addressList.get(recipientAddress), label: hash, type:'edge' } }
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
                    const txInfo = await this.getInnerTransactions(hash);
                    for( const info of txInfo ){

                        const inner_hash = tx['transactionInfo']['hash']

                        // 送信先アドレス
                        const recipientAddress = info['recipientAddress']['address'];
                        if (addressList.has(recipientAddress) == false){
                            addressList.set(recipientAddress,id)
                            nodes.push(
                                { data: { id: String(id++), label: recipientAddress, name:'name', type:'node' }}
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
                                { data: { id: String(id++), label: fromAddress, name:'name', type:'node' }}
                            );
                        }
                        // ベクトル追加
                        vektor.push(
                            { data: { source: addressList.get(fromAddress), target: addressList.get(recipientAddress), label: inner_hash, type:'edge' } }
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
    private async getInnerTransactions(hash:string){
        
        let txInfo:TransactionInfo[] = [];
        const repositoryFactory = new RepositoryFactoryHttp(this._nodeUrl);
        const txRepo = repositoryFactory.createTransactionRepository();
        const result = await txRepo.getTransaction(hash, this._sym.TransactionGroup.Confirmed).toPromise();

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

    // ハッシュからトランザクション詳細を取得
    public async getTransaction(hash:string){
    
        let txInfo:TransactionInfo[] = [];
        const repositoryFactory = new RepositoryFactoryHttp(this._nodeUrl);
        const txRepo = repositoryFactory.createTransactionRepository();
        const result = await txRepo.getTransaction(hash, this._sym.TransactionGroup.Confirmed).toPromise();
        return result;
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



    // ネームスペースからアドレスへの変換
    public async getAddressByNamespace( namespaceId:NamespaceId ){

        let address = '';

        // 16進文字列からバイト配列への変換
        const hexToBytes = (hex: string): Uint8Array =>  {
            const byteCount = hex.length / 2;
            const byteArray = new Uint8Array(byteCount);
        
            for (let i = 0; i < byteCount; i++) {
                const byte = parseInt(hex.substr(i * 2, 2), 16);
                byteArray[i] = byte;
            }
        
            return byteArray;
        }

        const url = this._nodeUrl + '/namespaces/' + namespaceId.id.toHex();
        console.log( url )

        // 対象ネームスペースIDをノードに問い合わせ
        return await axios.get(url)
        .then(function (response: any) {
	        console.log(response.data);
            const rawAddress = response.data.namespace.alias.address
            address = base32Encode( hexToBytes(rawAddress), 'RFC4648', { padding: false });
	    })
        .catch(function (error: any) {
		    console.log("*** error ***")
		    console.log(error)
		})
	    .then(function () {
		    console.log ("*** 終了 ***")
            console.log(address)
            return address;
		})        
    }

    // AccountInfoの取得
    public async getAddress( address:string ){
        return await Address.createFromRawAddress(address);
    }

    // MosaciInfoの取得
    public async getMosaicInfo( mosaicId:MosaicId ){

        const repositoryFactory = new RepositoryFactoryHttp(this._nodeUrl);
        const mosaicHttp = repositoryFactory.createMosaicRepository();

        let info = await mosaicHttp.getMosaic(mosaicId).toPromise();

        return info;

    }
}