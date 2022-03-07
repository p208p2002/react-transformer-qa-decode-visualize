import React from 'react';
import ReactTooltip from 'react-tooltip';
import albert_data from './dump_albert.json'
import roberta_data from './dump_roberta.json'
import { HlLayer, HlList } from './compoents'
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
      <div className="position-relative">
        {context}
        <div className="span-hl-container align-to-parent">
          <HlLayer data={albert_data} color='red' />
          <HlLayer data={roberta_data} color='blue' />
        </div>
      </div>

      <ReactTooltip />
    </div>
  );
}

export default App;
