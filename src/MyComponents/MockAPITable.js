import React from 'react'

function MockAPITable({id, userid, title, body, isselected}) {
  const highlight = {background:'rgba(0,0,0,0.8)', color:'white'}
  const unhighlight = {background:'none', color:'black'}
  
  return (
    
        <tr className='gridrow'>
            <td style= {(isselected===true)? (highlight):(unhighlight)}>{id}</td>
            <td style= {(isselected===true)? (highlight):(unhighlight)}>{userid}</td>
            <td style= {(isselected===true)? (highlight):(unhighlight)}>{title}</td>
            <td style= {(isselected===true)? (highlight):(unhighlight)}>{body}</td>
        </tr>
    
  )
}

export default MockAPITable