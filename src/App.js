import * as React from "react";
import { useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import data from './data/data.json'
import TeamCard from "./components/TeamCard";

function App() {
  const [teams, setTeams] = useState(data);
  // const [playerData, setPlayerData] = React.useState([]);


  // // useEffect(() => {
  // //   setTeams(data);
  // // }, []);
  // const updatePlayerData = (teamId, updatedPlayers) => {
  //   setPlayerData((prevData) => {
  //     const newData = [...prevData];
  //     const teamIndex = newData.findIndex((team) => team.id === teamId);
  //     newData[teamIndex].players = updatedPlayers;
  //     return newData;
  //   });
  // };

  const updateTeamData = (updatedTeam) => {
    setTeams((prevTeams) => {
      const newTeams = [...prevTeams];
      const teamIndex = newTeams.findIndex((team) => team.Tm === updatedTeam.Tm);
      newTeams[teamIndex] = updatedTeam;
      return newTeams;
    });
    
  };
  const handleShowPlayerData = () => {
    const allPlayers = [];
    console.log(teams)
    teams.forEach((team) => {
      
      team.players.forEach((player) => {
        const updatedPlayer = {
          name: player.Player,
          position: player.Pos,
          team: team.Tm,
          FPts: player.FPts,
        };
        allPlayers.push(updatedPlayer);
      });
    });
  
    console.log(allPlayers);
  };
  

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            NFL Teams - 2023

          </Typography>
            <Button onClick={handleShowPlayerData}>Show Player Data</Button>
          <Grid container spacing={4}>
            {teams.map((team) => (
              <TeamCard key={team.Tm} team={team} updateTeamData={updateTeamData} />
            ))}
          </Grid>
        </Box>
        {/* <StatsTable /> */}
      </Container>
    </div>
  );
  
}

export default App;
