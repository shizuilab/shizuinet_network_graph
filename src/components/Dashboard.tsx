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
import { useRecentTransactions } from '../symbol/useRecentTransactions';

import { ElementDefinition } from "cytoscape";

import {SymbolManager} from '../symbol/SymbolManager'

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

  // SymbolManagerクラス
  let symbolManager = new SymbolManager();
  symbolManager.getMosaicInfo();


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
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Symbol Network Graph
            </Typography>
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
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* 入力ダイアログ */}
              <Grid item xs={12}>
                <FormDialog 
                setGraphMode={setGraphMode}
                setInputProp={setInputProp}
                setAggregateOpt={setAggregateOpt}
                setPageNumberOpt={setPageNumberOpt}
                setPageSizeOpt={setPageSizeOpt}
                setPageLimitOpt={setPageLimitOpt}/>
              </Grid>
              {/* Network Status */}
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 100,
                  }}
                >
                  <NetworkStatus/>
                </Paper>
              </Grid>
              {/* Network Graph */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 600, }}>
                  <NetworkGraph elements={graphElements} isProgress={isProgress} />
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