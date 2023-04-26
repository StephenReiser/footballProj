import * as React from "react";
import { useState, useEffect } from "react";
import { Container, Grid, Typography, Paper, Box } from "@mui/material";
import data from './data/data.json'
import TeamCard from "./components/TeamCard";

function App() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    setTeams(data);
  }, []);


  return (
    <div className="App">
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            NFL Teams - 2023
          </Typography>
          <Grid container spacing={4}>
            {teams.map((team) => (
              <TeamCard key={team.Tm} team={team} />
            ))}
          </Grid>
        </Box>
        {/* <StatsTable /> */}
      </Container>
    </div>
  );
  
}

export default App;
