import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';
import { ElementDefinition } from "cytoscape";
import { useTheme } from '@mui/material/styles';
import Title from './Title';

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
const NetworkGraph = (elements) => {
  
  console.log('NetworkGraph')

  const theme = useTheme();

  const layout1 = { name: 'random' };
  const layout2 = { name: 'grid' };
  const layout3 = { name: 'circle' };
  const layout4 = { name: 'concentric' };
  const layout5 = { name: 'breadthfirst' };
  const layout6 = { name: 'cose' };

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
  
  if (Object.keys( elements['elements'] ).length < 1 ){
    return (
      <div>グラフ描画データが空です</div>
     );

  }else{
    console.log('エレメントデータが来たかも！？');
    console.log(elements['elements']); 
    return (
      <CytoscapeComponent
        elements={elements['elements']}
        layout={layout3}
        style={ {width: '900px', height: '900px'}}
        cy={(cy) => cy.style( cyStylesheet )} />
      );
  }
}

export default NetworkGraph