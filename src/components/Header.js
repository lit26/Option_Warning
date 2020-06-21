import React, { Component } from 'react'

const headerStyle={
    paddingTop: "30px",
    paddingBottom: "30px",
    color: "#fff",
    background: "#2e2e2e",
    textAlign: "left",
}

function Header() {
    return (
    <div style={headerStyle}>
        <div style={{margin: '30px'}}>
            <h2>Option Warning</h2>
            <div style={{width:'300px'}}>
                This website will calculate max profit and max loss for your option tradings.
            </div>
        </div>
        
    </div>
    );
  }
  
export default Header;