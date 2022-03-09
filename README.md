# React Transformer QA Decode Visualize
A react component for visualizing results generate from transformer-qa model.

To generate data, see [transformer-qa-decode](https://github.com/p208p2002/transformer-qa-decode).

![](assets/images/screenshot.png)

## Usage
### Install
```sh
npm i react-transformer-qa-decode-visualize
```
### Import
```js
import { HlList, HlLayerContainer, HlLayer } from 'react-transformer-qa-decode-visualize'
import 'react-transformer-qa-decode-visualize/dist/index.css'
```

### Example
```js
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
```
> Example data is under [src](./src/)