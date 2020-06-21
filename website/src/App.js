import React from 'react';
// import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header'
import Layout from './components/Layout'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      
      <Header />
      <Layout />
      <Footer />
    </div>
  );
}

export default App;
