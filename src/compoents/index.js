import React from 'react';
import ReactTooltip from 'react-tooltip';

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

export function HlLayerContainer({ context, children }) {
  return (
    <div className="hl-layer-container position-relative">
      <div className="span-hl-container align-to-parent">
        {children}
      </div>
      
      <div style={{backgroundColor:'rgba(0,0,0,0)',position:'absolute','pointer-events':'none'}}>
        {context}
      </div>
      
      <ReactTooltip />
    </div>
  )
}

export function HlList({ data, color }) {
  let { result = [] } = data
  let probs = result.map((d) => d.score)
  return (
    <ul className='hl-list'>
      {probs.map((prob, index) => {
        return (
          <li
            key={index}
            className={`position-relative`}
          >
             <span style={{
                position:'absolute',
                backgroundColor:color,
                content:"\\00A0",
                width:'100%',
                height:20,
                opacity:prob
            }}/>

            <span style={{
              position:'absolute',
              backgroundColor:'rgba(0,0,0,0)',
              width:'100%'
            }}>
              <b style={{ paddingLeft: 3, width: 22, display: 'inline-block' }}>{index + 1}.</b> {(prob * 100).toFixed(2)}% {data.result[index].answer_span}
            </span>

          
            {/* <span>{data.result[index].answer_span}</span> */}
           
          </li>
        )
      })}
    </ul>
  )
}


