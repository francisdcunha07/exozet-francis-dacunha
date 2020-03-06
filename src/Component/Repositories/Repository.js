import React from 'react'
import './Repository.css'

const repository = (props) => {
    const { name, description, created, updated, lang, forks, Url, stars } = props.repository
    return (
        <div className="">
             <div className="headerTilte MB10" >
                 <div ><span> {name} </span></div>
                 <div className="greyColor ftSize"> { created.split('-')[0] === updated.split('-')[0] ? created.split('-')[0] : created.split('-')[0] +" - "+ updated.split('-')[0]} </div>
             </div>
             <div className="greyColor MB20">{  lang !=null ? lang+" - ": ""} Creator & Owner</div>
             <div className=" MB20 ftSize">{ description !=null ? description : "No description"}</div>
             <div className="marginBtm ftSize ">This repository has {stars} stars and {forks} forks. if you would like more information about this repository and my contributed code,
              please visit  <a href={Url} target="_blank"><span>the repo</span></a> on github</div>
              <div className="hr MB35"></div>
        </div>   
    )
}

export default repository;