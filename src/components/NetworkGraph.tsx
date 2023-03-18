import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';
import { ElementDefinition } from "cytoscape";
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

// テストデータ生成
function testElement(){
  const nodesLength = 3;
  let elements2:ElementDefinition[] = [];
  for(let i=0; i < nodesLength; i++){
    elements2.push(
      { data: { id: String(i), label: 'Node ' + i }}
    )
  }

  for(let l=0; l < nodesLength; l++){
    for(let r=0; r < nodesLength; r++){
      elements2.push(
        { data: { source: l, target: r, label: 'Edge from ' + l + ' to ' + r } }
      )
    }
  }
 return elements2;
}

/* ネットワークグラフ描画コンポーネント */
const NetworkGraph = (prop) => {
  
  console.log('NetworkGraph')
  const theme = useTheme();

  // グラフ描画タイプ
  const [graphLayoutType, setGraphLayoutType] = React.useState('random');
  const layout1 = { name: graphLayoutType,
                    fit: true 
                  };

  // グラフ描画領域のサイズ
  const [canvasSize, setCanvasSize] = React.useState({width:100, height:100});

  React.useEffect(() => {
    setCanvasSize( prop['canvasSize']);
    console.log(canvasSize)

    console.log('~=======================================================')
  }, [prop['canvasSize']]);

  /*
  const layout1 = { name: 'circle',
                    fit: true 
                  };
  const layout2 = { name: 'grid' };
  const layout3 = { name: 'circle' };
  const layout4 = { name: 'concentric' };
  const layout5 = { name: 'breadthfirst' };
  const layout6 = { name: 'cose' };
  */

  /*
  const cyStylesheet=[
    {
      selector: 'node',
      style: {
        label: 'data(label)',
        width: 20,
        height: 20,
        //shape: 'rectangle',
        //backgroundColor: 'red',
        //borderColor: 'black',
        //borderWidth: 3,
      }
    },
    {
      selector: 'edge',
      style: {
        width: 5,
        //lineColor: 'green',
        //lineStyle: 'dashed'
      }
    }
  ]
  */

  // グラフ表示タイプ変更ハンドラ
  const handleChange = (event: SelectChangeEvent) => {
    setGraphLayoutType(event.target.value as string);
  };
  
  // グラフデータが空の時の画面表示
  if (Object.keys( prop['elements'] ).length < 1 ){
    return (
      <div>グラフ描画データが空です</div>
     );
  }

  // 読み込み中画面の表示
  if ( prop['isProgress'] == true ){
    console.log('読み込み中！！！！！！');
    return (
      <Box sx={{ mx: 'auto', my: 'auto', width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if(  prop['isProgress'] == false){
    console.log('読み込み中終了！！！！！！');
  }

  // グラフデータ描画
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>

          <FormControl fullWidth>
          <InputLabel>Grapf Layout Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={graphLayoutType}
            label="Graph Layout Type"
            onChange={handleChange}
          >
            <MenuItem value={'random'}>random</MenuItem>
            <MenuItem value={'circle'}>circle</MenuItem>
            <MenuItem value={'grid'}>grid</MenuItem>
            <MenuItem value={'breadthfirst'}>breadthfirst</MenuItem>
            <MenuItem value={'concentric'}>concentric</MenuItem>
            <MenuItem value={'cose'}>cose</MenuItem>

          </Select>
        </FormControl>

      </Grid>

      <Grid item xs={12}>

      <CytoscapeComponent
      elements={prop['elements']}
      style={ {width: canvasSize.width, height: canvasSize.height, background: 'red'}}
      cy={(cy) => {
        //cy.style( cyStylesheet );
        /*
        cy.elements().layout({
          name: 'random',
          fit: true,
          animate: true,
        }).run()
        */
        cy.elements().layout(layout1).run()
      }} 
      />

      </Grid>
    </Grid>


  );
}

export default NetworkGraph