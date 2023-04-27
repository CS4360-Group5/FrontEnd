import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./Stats.module.css";


const Stats = () => {
  const [stats, setStats] = useState([]);


  const getAllStats = async () => {
    try {
      const response = await axios.get('http://localhost:8080/stats');
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllStats();
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
    {stats.length > 0 ? (
      <div>
        <Box
        sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              m: 1,
              height: "100%",
            }}>
          {stats.map((stat) => (
            <div key={stat.statsId}>
              <Typography fontWeight={"bold"} fontSize={32} color={"white"}>
                Profile Name: {stat.profile.profileName}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
                Class Type: {stat.profile.classType}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
                Gender: {stat.profile.gender}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
                HP: {stat.hp}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
                Attack: {stat.attack}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
                Defense: {stat.defense}
              </Typography>
              <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
                XP: {stat.xp}
              </Typography>
          </div>
        ))}
        </Box>
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
  );
}
 
export default Stats;