import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import InputAdornment from '@mui/material/InputAdornment';

import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import {SymbolManager} from '../symbol/SymbolManager'
import { TransactionInfo, Transaction, MosaicId, Address, NamespaceId, Mosaic, MosaicInfo } from 'symbol-sdk';
import { number } from 'yargs';

// モザイク量の計算と表現正規化
function regularizationAmount( amount:number|undefined, divisibility:number|undefined ){
  if( amount == undefined ){
    return  0; 
  }
  // 可分性から係数を算出
  if( divisibility == undefined){
    return amount
  }
  const coefficient = ((divisibility ?? 0) == 0) ? 1 : ( 1/(10**divisibility))
  return (amount * coefficient ).toFixed( 6 );
}

/**
 * 
 * @param elementData: 選択されたグラフエレメント情報
 * @param symbolManager: Symbol管理クラス
 * @returns 
 */
const ElementDetailInfo = ( {elementData, symbolManager } )=> {

  const theme = useTheme();

  /*
   * State定義
   */
  const [ txInfo, setTxInfo] = React.useState<Transaction>();
  const [ toAddress, setToAddress] = React.useState<Address>();
  const [ toAddressStr, setToAddressStr] = React.useState<string>('');
  const [ fromAddress, setFromAddress] = React.useState<Address>();
  const [ fromAddressStr, setFromAddressStr] = React.useState<string>('');
  const [ mosaic, setMosaic ] = React.useState<Mosaic>();
  const [ mosaicInfo, setMosaicInfo ] = React.useState<MosaicInfo>();
  const [ message, setMessage ] = React.useState<string>('');

  // Symbolエクスプローラーへのリンク生成用
  const symbolExplorerBaseUrl = 'https://symbol-explorer.com/'
  const transactionsQuery = 'transactions/'
  const accountsQuery = 'accounts/'
  const mosaicQuery = 'mosaics/'

  // エッジ選択時処理：ハッシュからトランザクション詳細情報を取得
  React.useEffect(() => {

    // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。

    // モザイク情報の取得
    const getMosaicInfo = async ( mosaicId:MosaicId ) =>{
        const mosaicInfo = await symbolManager.getMosaicInfo( mosaicId );
        console.log( mosaicInfo );
        return mosaicInfo;
    }

    // トランザクション詳細の取得
    const getTransactionInfo = async ( hash:string ) =>{
        
      // トランザクション詳細取得
      const tx = await symbolManager.getTransaction(hash);
      console.log(tx);
      setTxInfo(tx);

      // 送信元アドレス情報の保持
      setFromAddress( tx?.signer?.address )
      setFromAddressStr(tx?.signer?.address.address )
      
      // 送信先アドレスのネームスペース判定
      if( tx?.recipientAddress instanceof NamespaceId ){
          // ネームスペースからアドレス形式に変換
          const addressStr = await symbolManager.getAddressByNamespace( tx?.recipientAddress );
          if( addressStr != ''){
            const addressObj = await symbolManager.getAddress( addressStr )
            setToAddress( addressObj )
            setToAddressStr (  addressObj?.plain() ?? '')
          }
      }else{
        setToAddress(tx?.recipientAddress )
        setToAddressStr ( tx?.recipientAddress.plain() ?? '')
      }

      // モザイク情報の取得
      if( tx.mosaics.length > 0){
        const mosaicInfo = await getMosaicInfo( tx.mosaics[0].id )
        setMosaic( tx.mosaics[0] );
        setMosaicInfo(mosaicInfo )
      }

      // メッセージ情報の取得
      setMessage( tx.message.payload );

    } 

    // 選択エレメントがエッジの場合
    if( elementData.type == 'edge' ){

      // トランザクションハッシュから詳細情報を取得
      getTransactionInfo( elementData.label );
    
    }else if( elementData.type == 'node'){
    // 選択エレメントがノードの場合

    console.log(elementData)

    }
  }, [ elementData ]);

  // ノードの場合
  if( elementData.type == 'node' ){

    return(
      <React.Fragment>
        <Title>選択要素の詳細</Title>

        <Stack spacing={2}>
          {/* アドレス */}
          <Stack direction="row">
            <TextField
                id="outlined-read-only-input"
                label="アドレス"
                variant="standard"
                value={elementData.label}
                InputProps={{
                  readOnly: true,
                }}
              />          
            <Tooltip title="ViewExplorer">
              <IconButton color="primary" 
              href={ symbolExplorerBaseUrl + accountsQuery + elementData.label } 
              target="_blank" rel="noopener noreferrer">
              <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          </Stack>

          {/* ネームスペース */}
          <TextField
              id="outlined-read-only-input"
              label="ネームスペース"
              variant="standard"
              value={elementData.name}
              InputProps={{
                readOnly: true,
              }}
            />

          {/* SNS情報 */}
          <Stack direction="row">
            <TextField
                id="outlined-read-only-input"
                label="Twitter/SNS"
                variant="standard"
                value={elementData.name}
                InputProps={{
                  readOnly: true,
                }}
              />
            <Tooltip title="ViewExplorer">
              <IconButton color="primary" 
              href={ symbolExplorerBaseUrl + accountsQuery + elementData.label } 
              target="_blank" rel="noopener noreferrer">
              <OpenInNewIcon />
              </IconButton>
            </Tooltip>
          </Stack>

        </Stack>
        
      </React.Fragment>
    );
  }

  // エッジの場合
  else if( elementData.type == 'edge'){

    if( txInfo == undefined ) {
      return(
        <React.Fragment>
          何も選択されてません       
        </React.Fragment>
      );
    }

    return(
    <React.Fragment>

      <Title>選択要素の詳細</Title>

      <Stack spacing={2}>

      <Stack direction="row">
      <TextField
          id="outlined-read-only-input"
          label="トランザクションハッシュ"
          variant="standard"
          value={elementData.label}
          InputProps={{
            readOnly: true,
          }}
        />          
        <Tooltip title="ViewExplorer">
          <IconButton color="primary" 
          href={ symbolExplorerBaseUrl + transactionsQuery + elementData.label }
          target="_blank" rel="noopener noreferrer">
          <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack direction="row">
      <TextField
          id="outlined-read-only-input"
          label="送信先アドレス"
          variant="standard"
          value={ toAddressStr }
          InputProps={{
            readOnly: true,
          }}
        />          
        <Tooltip title="ViewExplorer">
          <IconButton color="primary" 
          href={ symbolExplorerBaseUrl + accountsQuery + toAddressStr  } 
          target="_blank" rel="noopener noreferrer">
          <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack direction="row">
      <TextField
          id="outlined-read-only-input"
          label="送信元アドレス"
          variant="standard"
          value={ fromAddressStr}
          InputProps={{
            readOnly: true,
          }}
        />          

        <Tooltip title="ViewExplorer">
          <IconButton color="primary" 
          href={ symbolExplorerBaseUrl + accountsQuery + fromAddressStr  }
          target="_blank" rel="noopener noreferrer"
          sx={{ my: 'auto'}}>
          <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Stack direction="row">
      <TextField
          id="outlined-read-only-input"
          label="MosaicID"
          variant="standard"
          value={mosaicInfo?.id.toHex() ?? 'none'}
          InputProps={{
            readOnly: true,
          }}
        />          

        <Tooltip title="ViewExplorer">
          <IconButton color="primary" 
          href={ symbolExplorerBaseUrl + mosaicQuery + mosaicInfo?.id.toHex() ?? 'error' }
          target="_blank" rel="noopener noreferrer"
          sx={{ my: 'auto'}}>
          <OpenInNewIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <TextField
          id="outlined-read-only-input"
          label="Amount"
          variant="standard"
          value={ regularizationAmount(mosaic?.amount?.compact(), mosaicInfo?.divisibility)}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                { ((mosaicInfo?.id.toHex() ?? '') == '6BED913FA20223F8') && 'XYM'}
              </InputAdornment>
            ),
          }}
        />   

        <TextField
          id="outlined-read-only-input"
          label="Message"
          multiline
          maxRows={3}
          variant="standard"
          value={ message }
          InputProps={{
            readOnly: true
          }}
        />   

      </Stack>

      </React.Fragment>
    );

  }else{

    return (

        <React.Fragment>
          何も選択されてません       
        </React.Fragment>

      );
  }

}


/**
 *       { (address!='') && <div>アドレス：{address}</div>}
      { (namespace!='') && <div>ネームスペース：{namespace}</div>}

      { (hash!='') && <div>ハッシュ：{hash}</div>}
      
 */

export default ElementDetailInfo