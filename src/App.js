import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  return (
    <div className = "app">
      <div className="wrapper">
        <div class = "terminal">
          <div class = "buttongroup">
            <ButtonGroup variant="contained" size = "large" color ="primary" aria-label="terminal button group" fullWidth>
              <Button>All</Button>
              <Button>World</Button>
              <Button>Trade</Button>
              <Button>Chat</Button>
            </ButtonGroup>
          </div>
        </div> 
        <input 
          type="text"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{
          if (e.key === "Enter"){
            let newOutput = "";
            newOutput = output + "\n" + input;
            // eslint-disable-next-line default-case
            switch (input) {
            
              }
            setOutput(newOutput)
            setInput("")
            }
          }}
        /> 
        <div class ="interact">
            {output}        
        </div> 
        <div class = "hud">
          <div class = "buttongroup">
            <ButtonGroup variant="contained" size = "large" color ="primary" aria-label="hud button group" fullWidth>
              <Button>Map</Button>
              <Button>Inventory</Button>
              <Button>Stats</Button>
            </ButtonGroup>
          </div>
        </div>
        <div class = "character">
          <strong>Character</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
