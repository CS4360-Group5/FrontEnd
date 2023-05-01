import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "./Stats.module.css";

const Stats = () => {
  const [stats, setStats] = useState(null);

  const getStats = async () => {
    try {
      const response = await axios.get('http://localhost:8080/stats/0');
      const data = response.data;
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStats();
  }, []);

  return (
    <div>
      {stats ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            m: 1,
            height: "100%",
          }}
        >
          <div key={stats.statsId}>
            <Typography fontWeight={"bold"} fontSize={32} color={"white"}>
              Profile Name: {stats.profile.profileName}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
              Class Type: {stats.profile.classType}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
              Gender: {stats.profile.gender}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
              HP: {stats.hp}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
              Attack: {stats.attack}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
              Defense: {stats.defense}
            </Typography>
            <Typography fontWeight={"bold"} fontSize={22} color={"white"}>
              XP: {stats.xp}
            </Typography>
          </div>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Stats;