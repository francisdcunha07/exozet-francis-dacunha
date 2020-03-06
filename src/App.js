import React from 'react';
import { Route, Switch } from 'react-router-dom'
import Resume from './Containers/Resume/Resume'
import Generate from './Containers/Generate/Generate'
import './App.css'

function App() {
  return (
    <div className="App">
     <Switch>
         <Route path="/Resume" component={Resume} />
         <Route path="/" exact component={Generate} />
       </Switch>
    </div>
  );
}

export default App;
