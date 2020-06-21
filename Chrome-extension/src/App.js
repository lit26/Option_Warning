import React from 'react';
// import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './components/Layout'

const appStyle={
  margin: "20px",
  width: "300px"
}

function App() {
  return (
    <div className="App" style={appStyle}>
      <h2>Option Warning</h2>
      <Layout />
    </div>
  );
}

export default App;
