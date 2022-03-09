import React from 'react';
import albert_data from './dump_albert.json'
import roberta_data from './dump_roberta.json'
import { HlList, HlLayerContainer, HlLayer } from './compoents'
import './compoents/index.css'

function App() {

  let { context = "" } = albert_data

  return (
    <div style={{ width: 800, padding: 20 }}>
      <div>
        <h4>Albert</h4>
        <p>{albert_data.question}</p>
        <HlList data={albert_data} color='red' />
        <hr />
        <h4>Roberta</h4>
        <p>{roberta_data.question}</p>
        <HlList data={roberta_data} color='blue' />
        <hr />
      </div>

      <h4>Context</h4>
      <HlLayerContainer context={context}>
        <HlLayer data={albert_data} color='red' />
        <HlLayer data={roberta_data} color='blue' />
      </HlLayerContainer >
    </div>
  );
}

export default App;
