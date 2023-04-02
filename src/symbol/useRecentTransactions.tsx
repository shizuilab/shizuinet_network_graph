import React, { useEffect, useState } from 'react'
import { ElementDefinition } from "cytoscape";
import {
    Account,
    NetworkType,
    Address, 
    RepositoryFactoryHttp, 
  } from 'symbol-sdk'
import { element } from 'prop-types';

/*
  対象のSymbolアドレスから直近のトランザクションを取得するカスタムフック
*/
export const useRecentTransactions = (targetAddress:string) => {

  console.log('*** useRecentTransactions() *** ');
  const [address, setAddress] = useState(targetAddress);
  const [transactions, setTransactions] = useState([]);

  const sym = require("../../node_modules/symbol-sdk");

    // ネットワークグラフ描画用
    let elements: ElementDefinition[] = [];

    // エレメントをStateとして持つ
    const [elementsState, setElementsState] = useState(elements);

  // アカウント情報
  //const [accountInfo, setAccountInfo] = useState()
  // アカウント情報
  //console.log('account info');
  const accountInfo = () => {
    const accountAddress = Address.createFromRawAddress(address);
    console.log("アカウントアドレス",accountAddress);
    const nodeUrl = 'https://dhealth.shizuilab.com:3001';
    console.log("ノードURL",nodeUrl);
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    console.log("リポジトリファクトリ",repositoryFactory);
    const accountHttp = repositoryFactory.createAccountRepository();
    console.log("アカウントHttp",accountHttp);
    accountHttp.getAccountInfo(accountAddress).subscribe(
      //(accountInfo) => console.log(accountInfo),
      //(err) => console.error(err),
    );
  }
  //accountInfo();

  // 直近のトランザクション取得
  async function asyncFunc(){
    const nodeUrl = 'https://dhealth.shizuilab.com:3001';
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl);
    const txRepo = repositoryFactory.createTransactionRepository();
    const accountAddress = Address.createFromRawAddress(address);
    const result = await txRepo.search(
      {
        group:sym.TransactionGroup.Confirmed,
        embedded:true,
        address:accountAddress
      }
    ).toPromise();

    // ノードの連想配列
    let id=0;
    let nodelist:Map<string, number> = new Map();
    
    if (result == undefined){
      return [elementsState, setElementsState]
    }
    const txes = result.data;
    let node_data = []

    // 自身のアドレスを最初のノードに追加
    nodelist.set(address,id)
    id += 1;

    txes.forEach(tx => {

      // トランザクションの宛先情報を取り出し
      if (tx['type'] == 16724){
        //console.log(tx)
        const recipientAddress = tx['recipientAddress']['address'] 
        //console.log(recipientAddress);

        // ノード一覧の作成
        if (nodelist.has(recipientAddress) == false){
          nodelist.set(recipientAddress,id)
          // ノードリスト追加
          elements.push(
            { data: { id: String(id), label: recipientAddress }}
          )
        }

        // ベクトル情報の作成
        elements.push(
          { data: { source: 0, target: id, label: 'Edge from ' + address + ' to ' + recipientAddress } }
        )
      }
    });

    setElementsState(elements)
  }

  const promise = asyncFunc();

  return [elementsState, setElementsState]
};
