import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';
import { ElementDefinition, Stylesheet } from "cytoscape";
import { useTheme } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';
import { functionTypeAnnotation } from "@babel/types";


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

const stylesheet:Stylesheet[] = [
  {
    "selector": "node",
    "style": {
      "text-valign": "top",
      "text-halign": "center",
      "width": 20,
      "height": 20,
      "label": "data(label)",
      "shape":"ellipse",
    }
  }, {
    "selector": "node[isParent]",
    "style": {
      "shape":"star",
      "width": 50,
      "height": 50,
      "background-color":"Yellow",
    }
  },
  {
    "selector": "node[isResidents = 'yes']",
    "style": {
      "shape":"round-hexagon",
      "width": 50,
      "height": 50,
      "background-image":"data(image)"
    }
  }, {
    "selector": "edge",
    "style": {
      "width": 2,
      "curve-style": "bezier",
      "target-arrow-shape": "triangle"
    }
  }
];

/* ネットワークグラフ描画コンポーネント */
const NetworkGraph = ({elements, isProgress, graphCanvasSize, getElement }) => {
  
  console.log('NetworkGraph')
  const theme = useTheme();

  // グラフ描画タイプ
  const [graphLayoutType, setGraphLayoutType] = React.useState('concentric');
  const layout1 = { name: graphLayoutType,
                    fit: true,
                    animate: true,
                  };

  // グラフ描画領域のサイズ
  const [canvasSize, setCanvasSize] = React.useState({width:100, height:100});

  // キャンバスサイズの調整
  React.useEffect(() => {
    setCanvasSize( graphCanvasSize );
  }, [graphCanvasSize]);

  // グラフ要素クリック時処理
  const tappedElement = function( event ){
    const tgt = event.target;
    const data = tgt.data();
    getElement(data);
  }

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
  if (elements.length < 1 ){
    return (
      <div>グラフ描画データが空です</div>
    );
  }

  // 読み込み中画面の表示
  if ( isProgress ){
    return (
      <Box sx={{ mx: 'auto', my: 'auto', width: '100%' }}>
        <LinearProgress />
      </Box>
    );
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
      elements={elements}
      stylesheet={stylesheet}
      style={{width: canvasSize.width,
              height: canvasSize.height,
            } }
      cy={(cy) => {
        // グラフ表示タイプの適用
        cy.elements().layout(layout1).run();
        // ノードとエッジがクリックされた時
        cy.on('tap', 'edge', tappedElement);
        cy.on("tap", 'node', tappedElement);
      }} 
      />

      </Grid>
    </Grid>


  );
}

export default NetworkGraph