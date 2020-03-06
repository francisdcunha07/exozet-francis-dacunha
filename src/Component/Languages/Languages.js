import React from 'react'
import './Languages.css'

const languageUsed = (props) => {
    const {langUsed } = props
    return (
         <div className="langMainCont">
               <div className="langCont">
               <div className="langHdr">
                    <div style={{marginRight:'10px'}}><span>{langUsed[0]+"  "}</span></div>
                    <div className="greyColor ftSize">({ langUsed[1].toFixed(1) +"%"})</div></div>
               </div>
               <div className="langPerctCont">
                   <div className="langInnerPerctCont" style={{width:langUsed[1].toFixed(1) +"%"}}></div>
               </div>
         </div>
    )
}

export default languageUsed;