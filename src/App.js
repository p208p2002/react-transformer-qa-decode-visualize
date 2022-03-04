import './App.css';
import data from './dump.json'
import ReactTooltip from 'react-tooltip';


function HlLayer({ hl_context, color, opacity_level }) {
  console.log(opacity_level)
  return (
    <div style={{pointerEvents:'none'}} className={`align-to-parent hl-hover op-${opacity_level} hl-${color}`}
      dangerouslySetInnerHTML={{ __html: hl_context }}
    />
  )
}

function App() {
  let { context = "", result = [] } = data

  let result_1_3 = result.slice(0, 3).map((r, index) => {
    let start = r.global_context_start
    let end = r.global_context_end
    console.log(context.slice(start, end))

    let hl_span = `<hl data-tip="${r.answer_span}">${context.slice(start, end)}</hl>`
    let hl_context = context.slice(0, start) + hl_span + context.slice(end, context.length)

    let opacity_level = 10 - index
    if (opacity_level < 1) {
      opacity_level = 1
    }
    return <HlLayer key={index} hl_context={hl_context} color={'blue'} opacity_level={opacity_level} />
  })

  let result_4_6 = result.slice(3, 6).map((r, index) => {
    let start = r.global_context_start
    let end = r.global_context_end
    console.log(context.slice(start, end))

    let hl_span = `<hl data-tip="${r.answer_span}">${context.slice(start, end)}</hl>`
    let hl_context = context.slice(0, start) + hl_span + context.slice(end, context.length)

    let opacity_level = 10 - index
    if (opacity_level < 1) {
      opacity_level = 1
    }
    return <HlLayer key={index} hl_context={hl_context} color={'red'} opacity_level={opacity_level} />
  })

  return (
    <div className="App">
      <div className="position-relative">
        {context}
      </div>
      <div id="SpanHL">
        {result_1_3}
        {result_4_6}
      </div>

      <ReactTooltip />
    </div>
  );
}

export default App;
