import React from 'react'
import './UserExist.css'

const userExist = () =>{
    return (
        <div className="genCont">
          <div style={{margin:'3% 8% 3% 8%' }}>  
            <h1 className=" MB20">USER NOT FOUND</h1>
            <div className="hr MB30"></div>
            <div className="MB30" style={{fontSize:'14px'}}>The user you requested was not found. Please check your spelling and try again.</div>
            <div className="hr MB30"></div>
           </div> 
        </div>
    )
}

export default userExist;
