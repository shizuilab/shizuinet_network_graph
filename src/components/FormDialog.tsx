import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import { Label } from 'recharts';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

const FormDialog =({setGraphMode, setInputProp, setAggregateOpt, setPageNumberOpt, setPageSizeOpt, setPageLimitOpt}) => {
  
    console.log('*** FormDialog() ***');

    /**
     * State定義 
     */
    // ダイアログ開閉ステータス
    const [open, setOpen] = React.useState(false);
    // 検索モード指定（アカウント検索 or モザイク検索）
    const [mode, setMode] = React.useState('Account');
    // 入力フォーム（ウォレットアドレス or モザイクID）  
    const [formValue, setFormValue] = React.useState("");
    const [inputLabel, setInputLabel] = React.useState('Symbol Wallet Address');
    // 検索オプション(アグリゲートトランザクション含むか、検索ページ数等)
    const [includeAggregateOpt, setIncludeAggregateOpt] = React.useState(false);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(100);
    const [pageLimit, setPageLimit] = React.useState(1);
    // ダイアログ横幅可変用
    const [fullWidth, setFullWidth] = React.useState(true);
    // モードに応じてオプションの表示切り替え
    const [optionVisibility, setOptionVisibility] = React.useState('visible');

    // オプション設定スイッチの名称
    const switchName1 = 'AggregateOption';
    const switchName2 = 'MosaicOption';

    // Pagingオプション名称
    const pageNumberOpt = 'pageNumber'
    const pageSizeOpt = 'pageSize'
    const pageLimitOpt = 'pageLimit'

    // ダイアログ表示ボタンハンドラ
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    // OKボタンハンドラ
    const handleOk = () => {
      console.log("input OK")
      setGraphMode(mode)
      setInputProp(formValue)
      setAggregateOpt(includeAggregateOpt);
      setPageNumberOpt(pageNumber);
      setPageSizeOpt(pageSize);
      setPageLimitOpt(pageLimit);
      setOpen(false);
    };

    // キャンセルボタンハンドラ
    const handleCancel = () => {
        setOpen(false);
      };

    // 枠外クリック時ハンドラ
    const handleClose = () => {
      // 何もしない
    };

    // 横幅変更時ハンドラ
    const handleFullWidthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setFullWidth(event.target.checked);
    };

    // ラジオボタン変更ハンドラ
    const handleRadioChange = (event) => {
      setMode(event.target.value)

      if( event.target.value == 'Account'){
        setOptionVisibility(`visible`);
        setInputLabel('Symbol Wallet Address')
      }else{
        setOptionVisibility(`hidden`);
        setInputLabel('モザイクID')
      }
    };

    // スイッチ切り替わりハンドラ
    const switchHandler = (event) => {
        setIncludeAggregateOpt(event.target.checked);        
    };  

    // セレクタ変更ハンドラ
    const handleSelectChange = (event: SelectChangeEvent) => {
      switch(event.target.name){
        case pageNumberOpt:
          setPageNumber(Number(event.target.value));
          break;
        case pageSizeOpt:
          setPageSize(Number(event.target.value));
          break;
        case pageLimitOpt:
          setPageLimit(Number(event.target.value));
          break;
        default:
          break;
      }
    };

    // サンプルアドレスセットボタンハンドラ
    const handleSetSampleAddress = ( event ) => {
      setFormValue("NCAY26LEBPOXM7NPCNV4HL4EH5WM6UJ5UUN4UGA");
    }
  

    // 初回のみ実行：ダイアログを表示
    React.useEffect(() => {
      //setOpen(true);
    }, []);
        

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          ChangeSetting
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Symbol Network Graph</DialogTitle>          
          <DialogContent>

            {/*モード選択ラジオボタン*/}
            {/*
            // TODO: モザイク検索モードを追加
            <Box sx={{p: 1 }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">モード選択</FormLabel>
                <RadioGroup row value={mode} onChange={handleRadioChange}>
                  <FormControlLabel value="Account" control={<Radio />} label="アカウント" />
                  <FormControlLabel value="Mosaic" control={<Radio />} label="モザイク" />
                </RadioGroup>
              </FormControl>

              <Typography variant="body2" gutterBottom>
                アカウント：対象のアカウントと繋がりのあるアカウントを表示します。<br/>
                モザイク：対象のモザイクの保有者の繋がりを表示します。 ※準備中<br/>
              </Typography>
              
            </Box>
            /*}

            {/* ウォレットアドレス or モザイクIDの入力 */}
            <Box sx={{ p: 1}}>
            <FormLabel component="legend">{inputLabel}</FormLabel>
            <TextField
              autoFocus
              required
              id="outlined-required"
              label="Required"
              margin="dense"
              fullWidth
              value={formValue}
              onChange={e => {
                setFormValue(e.target.value)
              }}
            />
            <Button variant="text" onClick={handleSetSampleAddress}>Set Sample Address</Button>
            </Box>

           

            <Divider variant="middle" />

            {/* トランザクション検索オプション*/}
            <Box sx={{ p:1, visibility: optionVisibility }}>
              <FormControl component="fieldset">
                <FormLabel>Optional</FormLabel>

                  {/*
                  <FormGroup aria-label="position" row sx={{m:1}}>
                    <FormControlLabel
                      value='Aggregate Option'
                      control={<Switch color="primary" name={switchName1} checked={includeAggregateOpt} onChange={switchHandler} disabled={true}/>}
                      label="アグリゲートトランザクションを含める(※準備中)"
                      labelPlacement="end"
                    />
                  </FormGroup>
                  */}
              </FormControl>
            </Box>

            {/* ページ検索オプション*/}
            <Box sx={{p:1, visibility: optionVisibility}}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-label">PageNum</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={pageNumber.toString()}
                    label="PageNumber"
                    onChange={handleSelectChange}
                    name={pageNumberOpt}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={6}>6</MenuItem>
                    <MenuItem value={7}>7</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={9}>9</MenuItem>
                    <MenuItem value={10}>10</MenuItem>           
                  </Select>
                  <FormHelperText>read page position<br/>(Oldest first)</FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={4}>

                <FormControl  variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">PageSize</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pageSize.toString()}
                  label="PageSize"
                  onChange={handleSelectChange}
                  name={pageSizeOpt}
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                    <MenuItem value={100}>100</MenuItem>
                  </Select>
                  <FormHelperText>Number of transactions to include on page</FormHelperText>
                </FormControl>

              </Grid>
              <Grid item xs={4}>

              <FormControl  variant="standard" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">PageLimit</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={pageLimit.toString()}
                label="PageLimit"
                onChange={handleSelectChange}
                name={pageLimitOpt}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
              <FormHelperText>read page position</FormHelperText>
            </FormControl>

              </Grid>
            </Grid>            
            <Alert severity="warning">最大ページ数を大きくしすぎると、検索に時間がかかる場合があります。<br/>
            (If the maximum number of pages is set too large, the search will take longer)</Alert>
            </Box>        
          </DialogContent>

          {/* キャンセルボタン・OKボタン*/}
          <DialogActions>
            <Button onClick={handleCancel}>Cancel</Button>
            <Button onClick={handleOk} disabled={formValue.length==0}>OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

export default FormDialog;