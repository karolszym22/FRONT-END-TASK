import React, { Component } from 'react';
import "./App.css";
import "./CSS/style.css"
import logo from "./Assets/logo.svg"
import EditIntern from "./EditIntern";
import InternList from "./InternList";
import { Routes, Route } from "react-router-dom";


class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
    callBackendAPI = async () => {
      const response = await fetch('http://localhost:3002/express_backend');
      const body = await response.json();
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      console.log(body);
    };
render() {
  return (
    <div className='main-wrapper'>
      <div className='container'>
        <header>
          <i><img  className='logo' src={logo}/></i>
        </header>
           <Routes>
              <Route path="/interns/:id" exact element={<EditIntern />} />
              <Route path="/" element={<InternList />} />
           </Routes>
      
      
      </div>
    </div>
  );
}}

export default App;
