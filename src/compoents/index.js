import React from 'react';
function softmax(arr) {
  return arr.map(function (value, index) {
    return Math.exp(value) / arr.map(function (y /*value*/) { return Math.exp(y) }).reduce(function (a, b) { return a + b })
  })
}

function HlLayerChild({ hl_context, color, opacity_level }) {
  return (
    <div style={{ pointerEvents: 'none' }} className={`align-to-parent op-${opacity_level} hl-${color}`}
      dangerouslySetInnerHTML={{ __html: hl_context }}
    />
  )
}

export function HlLayer({ data, color }) {
  let { context = "", result = [] } = data
  let layers = result.map((r, index) => {
    let start = r.global_context_start
    let end = r.global_context_end

    let hl_span = `<hl style="background-color:${color}" data-tip="${r.answer_span}">${context.slice(start, end)}</hl>`
    let hl_context = context.slice(0, start) + hl_span + context.slice(end, context.length)

    let opacity_level = 10 - index
    if (opacity_level < 1) {
      opacity_level = 1
    }
    return <HlLayerChild key={index} hl_context={hl_context} color={color} opacity_level={opacity_level} />
  })
  return layers
}

export function HlList({ data, color }) {
  let { result = [] } = data
  let probs = softmax(result.map((d) => d.start_logit))
  return (
    <ul className='hl-list'>
      {probs.map((prob, index) => {
        let opacity_level = 10 - index
        if (opacity_level < 1) {
          opacity_level = 1
        }
        return (
          <li
            key={index}
            className={`position-relative`}>
            <b style={{ paddingLeft: 3, width: 22, display: 'inline-block' }}>{index + 1}.</b> {(prob * 100).toFixed(2)}% {data.result[index].answer_span}
            <span className={`op-${opacity_level} bg-block`} style={{ backgroundColor: color }} />
          </li>
        )
      })}
    </ul>
  )
}


