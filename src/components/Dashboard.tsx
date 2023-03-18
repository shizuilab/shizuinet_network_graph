import * as React from 'react';
import { styled, alpha, createTheme, ThemeProvider } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

import NetworkGraph from './NetworkGraph';
import NetworkStatus from './NetworkStatus';
import Deposits from './Deposits';
import Orders from './Orders';
import FormDialog from './FormDialog';
import Title from './Title';
import { useRecentTransactions } from '../symbol/useRecentTransactions';

import { ElementDefinition } from "cytoscape";

import {SymbolManager} from '../symbol/SymbolManager'
import useWindowSize from '../hooks/useWindowSize'

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '25ch',
        '&:focus': {
          width: '40ch',
        },
      },
    },
  }));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

function DashboardContent() {

  console.log('*** DashboardContent() ***')


  // ウィンドウサイズ
  const [width, height] = useWindowSize();

  // トグルドロワーの開閉状態
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  // グラフのモード（アカウント検索 or モザイク検索）
  const [graphMode, setGraphMode] = React.useState('Account')
  // ユーザ入力（ウォレットアドレス or モザイクID）
  const [inputProp, setInputProp] = React.useState('')
  // 検索オプション
  const [includeAggregateOpt, setAggregateOpt] = React.useState(false)
  const [pageNumberOpt, setPageNumberOpt] = React.useState(1)
  const [pageSizeOpt, setPageSizeOpt] = React.useState(100)
  const [pageLimitOpt, setPageLimitOpt] = React.useState(1)

  // 読み込み画面制御用State
  const [isProgress,setIsProgress] = React.useState(false);
  // グラフ描画データ
  const [graphElements, setGraphElements] = React.useState<ElementDefinition[]>([]);
  // グラフ描画領域のサイズ
  const [graphCanvasSize, setGraphCanvasSize] = React.useState( {width: 100, height: 100 })

  // Symbol管理クラス
  const [symbolManager, setSymbolManager] = React.useState<SymbolManager>( new SymbolManager() );

  // SymbolManagerクラス
  React.useEffect(() => {
    symbolManager.getMosaicInfo();
  }, []);

  // ウィンドウサイズ変化時の処理
  // グラフ描画コンポーネントへの参照をuseRefで持つ
  // ウィンドウサイズが変わったらグラフ描画キャンバスのサイズも調整
  const elm = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if( elm.current != null){
      // 対象コンポーネントのエレメント情報取得
      /* Example
      {
        "x": 24,
        "y": 196,
        "width": 1088.15625,
        "height": 900,
        "top": 196,
        "right": 1112.15625,
        "bottom": 1096,
        "left": 24
      }
       */
      const elm_data =  JSON.parse(JSON.stringify(elm.current.getBoundingClientRect()));
      // 余白分調整
      const padding_x = 16 * 2;
      const padding_y = (56 + (16.5 * 2) + (16 * 1));
      setGraphCanvasSize( { width:elm_data.width - padding_x, height:elm_data.height-padding_y })
      console.log( graphCanvasSize );
    }
  }, [width, height]);


  React.useEffect(() => {
    // useEffect自体ではasyncの関数を受け取れないので内部で関数を定義して呼び出す。
    const getElements = async (graphMode:string, pageNumber:number, pageSize:number, pageLimit:number, includeAggregate:boolean ) =>{
      console.log(graphMode)
      // アカウントモードの場合
      if( graphMode == 'Account'){
        // 読み込み中画面を表示
        setIsProgress(true);
        // トランザクションからグラフ用データ生成
        const elements:ElementDefinition[] = await symbolManager.makeElementsByRecentTransactions(pageNumber, pageSize, pageLimit, includeAggregate); 
        // 読み込み中画面を非表示
        setIsProgress(false);
        setGraphElements(elements);
      }else{
      // モザイクモードの場合
        console.log('モザイクモード！');
      } 
    } 
    if( inputProp != ''){
      symbolManager.address = inputProp;
      getElements(graphMode, pageNumberOpt, pageSizeOpt, pageLimitOpt, includeAggregateOpt );
    }
  }, [graphMode, inputProp,pageNumberOpt,pageSizeOpt,pageLimitOpt, includeAggregateOpt]);


  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar position="absolute" open={open}>
          {/* 上部ツールバー */}
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            {/* タイトル文字列 */}
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Symbol Network Graph
            </Typography>

            <Paper>
            <FormDialog 
                setGraphMode={setGraphMode}
                setInputProp={setInputProp}
                setAggregateOpt={setAggregateOpt}
                setPageNumberOpt={setPageNumberOpt}
                setPageSizeOpt={setPageSizeOpt}
                setPageLimitOpt={setPageLimitOpt}/>
            </Paper>

            {/* 検索フォーム */}
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Address/MosaicId…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>

          </Toolbar>
        </AppBar>
        
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >

          <Toolbar/>

          <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>

            <Grid container spacing={2}>
              {/* Network Graph */}
              <Grid item xs={10}>
                <Paper ref={elm} sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 900, }}>
                  <NetworkGraph elements={graphElements} isProgress={isProgress} canvasSize={graphCanvasSize} />
                </Paper>
              </Grid>

              {/* Network Status */}
              <Grid item xs={2}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 900,
                  }}
                >
                  <NetworkStatus/>
                </Paper>
              </Grid>


            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}