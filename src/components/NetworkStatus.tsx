import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import { WebSocketManager} from '../symbol/WebSocketManager'

// Generate Sales Data
function createData(time: string, amount?: number) {
  return { time, amount };
}

const NetworkStatus = ()=> {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Network ステータス</Title>
      {/*
      <WebSocketManager></WebSocketManager>
      */}
    </React.Fragment>
  );
}

export default NetworkStatus