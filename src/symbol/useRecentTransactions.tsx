import React, { useEffect, useState } from 'react'
import {
    Account,
    NetworkType,
    Address, 
    RepositoryFactoryHttp, 
  } from 'symbol-sdk'

/*
  対象のSymbolアドレスから直近のトランザクションを取得するカスタムフック
*/
export const useRecentTransactions = (targetAddress:string) => {

  const [address, setAddress] = useState(targetAddress)
  const [transactions, setTransactions] = useState([])

  // アカウント情報
  const [accountInfo, setAccountInfo] = useState()

  // 直近のトランザクション取得


  return [transactions, setTransactions]
};