import React, { useState } from 'react'
import {
    Account,
    NetworkType,
    Address, 
    RepositoryFactoryHttp, 
  } from 'symbol-sdk'

const GetAccountInfo = () => {

  const [address, setAddress] = useState('')
  const [publicKey, setPublicKey] = useState('')

  // アカウント情報
  const accountInfo = () => {
    const accountAddress = Address.createFromRawAddress(address)
    console.log("アカウントアドレス",accountAddress)
    const nodeUrl = 'https://dhealth.shizuilab.com:3001'
    console.log("ノードURL",nodeUrl)
    const repositoryFactory = new RepositoryFactoryHttp(nodeUrl)
    console.log("リポジトリファクトリ",repositoryFactory)
    const accountHttp = repositoryFactory.createAccountRepository()
    console.log("アカウントHttp",accountHttp)
    accountHttp.getAccountInfo(accountAddress).subscribe(
      (accountInfo) => console.log(accountInfo),
      (err) => console.error(err),
    );
  }

  return (
    <div>
    <div>
      <input
        onChange={(e) => {
            e.preventDefault()
            setAddress(e.target.value)
        }} 
        className="shadow rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" />
      <button onClick={accountInfo}>
      アドレスからアカウントを取得
      </button>
      <br />
    </div>
    </div>
  )
}

export default GetAccountInfo
