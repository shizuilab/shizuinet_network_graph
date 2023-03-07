import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import CytoscapeComponent from 'react-cytoscapejs';
import { ElementDefinition } from "cytoscape";
import { useTheme } from '@mui/material/styles';
import Title from './Title';

const NetworkGraph = () => {

  const theme = useTheme();

  const nodesLength = 10;
  let elements: ElementDefinition[] = [];
  for(let i=0; i < nodesLength; i++){
    elements.push(
      { data: { id: String(i), label: 'Node ' + i }}
    )
  }

  for(let l=0; l < nodesLength; l++){
    for(let r=0; r < nodesLength; r++){
      elements.push(
        { data: { source: l, target: r, label: 'Edge from ' + l + ' to ' + r } }
      )
    }
  }

  const layout1 = { name: 'random' };
  const layout2 = { name: 'grid' };
  const layout3 = { name: 'circle' };
  const layout4 = { name: 'concentric' };
  const layout5 = { name: 'breadthfirst' };
  const layout6 = { name: 'cose' };

  return (
    <CytoscapeComponent elements={elements} layout={layout2} style={ { width: '600px', height: '600px' } } />
  );
}

export default NetworkGraph