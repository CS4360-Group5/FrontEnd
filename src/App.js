import "./App.css";
import * as React from "react";
import { spacing } from "@mui/system";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {useEffect, useState } from "react";
import Map from "./Map";
import Inventory from "./Inventory";
import Stats from "./Stats";


function viewHUD({ view }) {
  if (view == "map") {
    return <Map />;
  } else if (view == "inventory") {
    return <Inventory />;
  } else if (view == "stats") {
    return <Stats />;
  } else {
    return <div>TESTING</div>;
  }
}

function App({ responseData, zoneData }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [currentChat, setCurrentChat] = React.useState("all");
  const [currentHUD, setCurrentHUD] = React.useState("map");
  let [currentZone, setCurrentZone] = useState("");

  const styles = {
    "&.MuiToggleButton-root.Mui-selected": {
      color: "black",
      backgroundColor: "white",
      fontWeight: "bold",
    },
    "&.MuiToggleButton-root": { color: "black", backgroundColor: "#BFBFBF" },
  };

  useEffect(() => {
    setOutput(`Welcome ${responseData.gamerTag}, for help type "help"`);
  }, [responseData.gamerTag]);
  
  useEffect(() => {
    setCurrentZone(0);
  }, []);

  return (
    <div className="app">
      <div className="wrapper">
        <div className="terminal">
          <div className="buttongroup">
            <ToggleButtonGroup
              color="primary"
              value={currentChat}
              exclusive
              onChange={(event, newChat) => {
                setCurrentChat(newChat);
              }}
              aria-label="terminal button group"
              fullWidth
            >
              <ToggleButton value="all" sx={styles}>
                ALL
              </ToggleButton>
              <ToggleButton value="world" sx={styles}>
                WORLD
              </ToggleButton>
              <ToggleButton value="trade" sx={styles}>
                TRADE
              </ToggleButton>
              <ToggleButton value="chat" sx={styles}>
                CHAT
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              let newOutput = "";
              let command = input.trim().toLowerCase(); // Get the user's command and convert it to lowercase
              switch (command) {
                case "move north":
                case "n":
                  newOutput = output + "\n" + `You move north.`;
                  // updatePlayerPosition("north"); // Call a function to update the player's position
                  break;
                case "move south":
                case "s":
                  // Handle the "south" command
                  newOutput = output + "\n" + `You move south.`;
                  // updatePlayerPosition("south");
                  break;
                case "move east":
                case "e":
                  // Handle the "east" command
                  newOutput = output + "\n" + `You move east.`;
                  // updatePlayerPosition("east");
                  break;
                case "move west":
                case "w":
                  // Handle the "west" command
                  newOutput = output + "\n" + `You move west.`;
                  // updatePlayerPosition("west");
                  break;
                case "help":
                  // List all available commands
                  setOutput( output +"\nAvailable commands: move north, move south, move east, move west, inspect, travel forward, travel back, help");
                  break;
                case "inspect":
                  // Display the zone you are in
                  if (currentZone === 1) {
                      newOutput = output + "\n" + "You are in The Forest.";
                      break;
                  } else if (currentZone === 2) {
                      newOutput = output + "\n" + "You are in The Desert.";
                      break;
                  } else if (currentZone === 3) {
                      newOutput = output + "\n" + "You are in The Mountains.";
                      break;
                  } else if (currentZone === 4) {
                      newOutput = output + "\n" + "You are in The Swamp.";
                      break;
                  } else if (currentZone === 5) {
                      newOutput = output + "\n" + "You are in The Plains.";
                      break;
                  } else if(currentZone === 6) {
                      newOutput = output + "\n" + "You are in The Village.";
                      break;
                  } else {
                      //console.log(zoneData);
                      newOutput = output + "\n" + "You are in The Guild.";
                      break;
                  }
                case "travel forward":
                case "travel f":
                  // move to the new zone
                  if (currentZone === 1) {
                      newOutput = output + "\n" + "You travel to The Mountains.";
                      setCurrentZone(3);
                      break;
                  } else if (currentZone === 2) {
                      newOutput = output + "\n" + "You travel to The Plains.";
                      setCurrentZone(5);
                      break;
                  } else if (currentZone === 3) {
                      newOutput = output + "\n" + "You travel to the desert.";
                      setCurrentZone(2);
                      break;
                  } else if (currentZone === 4) { 
                      newOutput = output + "\n" + "You travel to The Village.";
                      setCurrentZone(6);
                      break;
                  } else if (currentZone === 5) {
                      newOutput = output + "\n" + "You travel to The Swamp.";
                      setCurrentZone(4);
                      break;
                  } else if (currentZone === 6) {
                      newOutput = output + "\n" + "You travel to The Forest.";
                      setCurrentZone(1);
                      break;
                  } else if (currentZone === 0) {
                      newOutput = output + "\n" + "You leave the guild.";
                      setCurrentZone(6);
                      break;
                  }     
                  break;
                case "travel backward":
                case "travel back":
                case "travel b":
                  // move to the previous zone
                  if (currentZone === 1) {
                      newOutput = output + "\n" + "You travel to The Village.";
                      setCurrentZone(6);
                      break;
                  } else if (currentZone === 2) {
                      newOutput = output + "\n" + "You travel to The Mountains.";
                      setCurrentZone(3);
                      break;
                  } else if (currentZone === 3) {
                      newOutput = output + "\n" + "You travel to The Forest.";
                      setCurrentZone(1);
                      break;
                  } else if (currentZone === 4) {
                      newOutput = output + "\n" + "You travel to The Plains.";
                      setCurrentZone(5);
                      break;
                  } else if (currentZone === 5) {
                      newOutput = output + "\n" + "You travel to The Desert.";
                      setCurrentZone(2);
                      break;
                  } else if (currentZone === 6) {
                      newOutput = output + "\n" + "You enter The Guild.";
                      setCurrentZone(0);
                      break;
                  }
                  break;
                default:
                  // Chat
                  newOutput =
                    output + "\n" + `${responseData.gamerTag}: ${input}`;
              }
              setOutput(newOutput);
              setInput("");
            }
          }}
        />
        <div className="interact">{output}</div>
        <div className="hud">
          <div className="buttongroup">
            <ToggleButtonGroup
              color="primary"
              value={currentHUD}
              exclusive
              onChange={(event, newHUD) => {
                setCurrentHUD(newHUD);
              }}
              aria-label="hud button group"
              fullWidth
            >
              <ToggleButton value="map" sx={styles}>
                MAP
              </ToggleButton>
              <ToggleButton value="inventory" sx={styles}>
                INVENTORY
              </ToggleButton>
              <ToggleButton value="stats" sx={styles}>
                STATS
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {viewHUD({ view: currentHUD })}
        </div>
        <div className="character">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              m: 1,
              height: "100%",
            }}
          >
            <div>
              <Typography fontWeight={"bold"} color={"white"}>
                Health
              </Typography>
              <LinearProgress
                style={{ height: "10px" }}
                sx={{
                  border: 1,
                  borderRadius: 2,
                  borderColor: "white",
                  m: 1,
                  width: "97%",
                  backgroundColor: "black",
                  "& .MuiLinearProgress-bar": { backgroundColor: "red" },
                }}
                variant="determinate"
                value="90"
              />
            </div>
            <div>
              <Typography fontWeight={"bold"} color={"white"}>
                Mana
              </Typography>
              <LinearProgress
                style={{ height: "10px" }}
                sx={{
                  border: 1,
                  borderRadius: 2,
                  borderColor: "white",
                  m: 1,
                  width: "97%",
                  backgroundColor: "black",
                  "& .MuiLinearProgress-bar": { backgroundColor: "aqua" },
                }}
                variant="determinate"
                value="25"
              />
            </div>
            <div>
              <Typography fontWeight={"bold"} color={"white"}>
                Experience
              </Typography>
              <LinearProgress
                style={{ height: "10px" }}
                sx={{
                  border: 1,
                  borderRadius: 2,
                  borderColor: "white",
                  m: 1,
                  width: "97%",
                  backgroundColor: "black",
                  "& .MuiLinearProgress-bar": { backgroundColor: "lime" },
                }}
                variant="determinate"
                value="50"
              />
            </div>
            <div>
              <Typography fontWeight={"bold"} color={"white"}>
                Moves
              </Typography>
              <LinearProgress
                style={{ height: "10px" }}
                sx={{
                  border: 1,
                  borderRadius: 2,
                  borderColor: "white",
                  m: 1,
                  width: "97%",
                  backgroundColor: "black",
                  "& .MuiLinearProgress-bar": { backgroundColor: "gold" },
                }}
                variant="determinate"
                value="10"
              />
            </div>
          </Box>
        </div>
      </div>
    </div>
  );
}

export default App;
