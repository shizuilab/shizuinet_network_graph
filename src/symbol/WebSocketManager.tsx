import React, { Component } from 'react';
import {
    RepositoryFactoryHttp, 
  } from 'symbol-sdk'

export const WebSocketManager = () => {
    const [chainHeight, setChainHeight] = React.useState<string>()
    const socketRef = React.useRef<WebSocket>()
  
    // #0.WebSocket関連の処理は副作用なので、useEffect内で実装
    React.useEffect(() => {
      
      const nodeUrl = 'dhealth.shizuilab.com:3001';
      const repositoryFactory = new RepositoryFactoryHttp(nodeUrl, {
        websocketUrl: 'ws://' + nodeUrl + '/ws',
        websocketInjected: WebSocket
      });
      const listener = repositoryFactory.createListener();

      listener.open().then(() => {
        listener.newBlock().subscribe(
          (block) => {
            let block_info = JSON.parse(JSON.stringify(block))
            let chain_height = block_info['height']['lower'] 
            setChainHeight(String(chain_height));
            listener.close()
          },
          (err) => console.error(err),
        );
      });

      return () => {
        console.log('Disconnecting..');        
    };

    }, [])

    return (
        <>
          <div>CHAIN HEIGHT: {chainHeight}</div>
        </>
      )
    }
