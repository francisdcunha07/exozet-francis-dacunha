import React, {Component} from 'react'
import './Generate.css'

class Generate extends Component{

    state= {
       name:'',
        valid:false 
    }
    checkValid(value, rules){
        let isValid = true;
        if(rules.required){
         isValid = value.trim() !== ''
        }
        
        if(rules.minLegnth){
         isValid = value.length  >= rules.minLegnth && isValid
        }
        
        return isValid
    }

    inputChangeHandler = (event) => {
       const udpdateState = {...this.state};
    //  let name ='', 
        if( event.target.value != '' && event.target.value.length > 0 ){
           udpdateState["name"] = event.target.value;
           udpdateState["valid"] = true;
        }else{
            udpdateState["valid"] = false;
        }
        udpdateState["name"] = event.target.value;
        this.setState(udpdateState);
       
    }

    handleGenerate = () => {
        this.props.history.push({pathname:'/Resume', search: '?name='+this.state.name})
    }

    render(){
        return (
        <div className="genMainCont">
         <div className="headingTxt"> <h1>My Github Resume</h1></div>
        <div className="genCont">
        <div className="genInnerCont">
            <div style={{marginLeft:'8%', marginRight:'8%' }}>
                <div style={{'fontSize': '20px', 'fontWeight': '600'}} className="marginBtm">Github Username</div>
            <input type="text" placeholder="User Name"  onChange={(event) => this.inputChangeHandler(event)} />
            <button disabled={!this.state.valid} className="generateButton" onClick={this.handleGenerate} >Generieren</button>
            </div>
        </div>
        </div>
        </div>)
    }
}

export default Generate;