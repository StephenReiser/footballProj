import * as React from "react";
import { useState } from "react";
import { Container, Grid, Typography, Box, Button, Dialog, DialogTitle, DialogContent} from "@mui/material";
import data from './data/data.json'
import starters from './data/starters.json'
import TeamCard from "./components/TeamCard";
import PlayerTable from "./components/PlayerTable";

function App() {
  const [teams, setTeams] = useState(data);
  const [playerSummary, setPlayerSummary] = useState([])
  const [uniqueKey, setUniqueKey] = useState(Date.now());

  const allPlayers = data.reduce((acc, team) => {
    return [...acc, ...team.players];
  }, []);

  const [players, setPlayers] = useState(allPlayers);
  const [isPlayerTableOpen, setIsPlayerTableOpen] = useState(false);
// Loading and Saving
  const handleSave = () => {
    localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('players', JSON.stringify(players));
  };
  const handleLoad = () => {
    const savedTeams = JSON.parse(localStorage.getItem('teams'));
    const savedPlayers = JSON.parse(localStorage.getItem('players'));
    console.log(savedTeams)
    if (savedTeams) setTeams(savedTeams);
    if (savedPlayers) setPlayers(savedPlayers);
    // console.log(savedTeams)
    setUniqueKey(Date.now());
  };
  
  
  // End Loading and Saving
  const handleClosePlayerTable = () => {
    setIsPlayerTableOpen(false);
  };
  // const [playerData, setPlayerData] = React.useState([]);


  const handleUpdate = (updatedTeam) => {
    // Find the index of the team that needs to be updated
    const teamIndex = teams.findIndex(team => team.Tm === updatedTeam.Tm);
  
    // Create a new array with the updated team data
    const updatedTeams = [...teams];
    updatedTeams[teamIndex] = updatedTeam;
  
    // Update the state with the new array
    setTeams(updatedTeams);
  };
  
  const handleShowPlayerData = () => {
    const playerOutput = []
    players.forEach((player) => {
      const team = teams.find((t) => t.Tm === player.Full_Team);
  
      const targets = team.Pass_att * player.targetShare;
      const receptions = targets * player["Ctch%"];
      const recYds = targets * player["Y/Tgt"];
      const rushAtt = team.Rush_att * player.rushShare;
      const rushYds = rushAtt * player["Y/A"];
      const rushTD = team.TD * player.rushTdShare;
      const recTd = team.Pass_TD * player.recTdShare;
  
      const fantasyPoints = receptions + (recYds + rushYds) / 10 + (rushTD + recTd) * 6;
      const updatedPlayer = {
        Player: player.Player,
        Full_Team: player.Full_Team,
        Position: player.Pos,
        Targets: targets,
        Receptions: receptions,
        RecYds: recYds,
        RushAtt: rushAtt,
        RushYds: rushYds,
        RushTD: rushTD,
        RecTd: recTd,
        FantasyPoints: fantasyPoints,
      };
      playerOutput.push(updatedPlayer)

    });

    // Add QB logic
  playerOutput.forEach((player) => {
    if (player.Position === 'QB') {
      const isStarter = starters.find((starter) => starter.Team === player.Full_Team && starter.Starter === player.Player);

      if (isStarter) {
        console.log(player)
        const teamPlayers = playerOutput.filter((p) => p.Full_Team === player.Full_Team);
        const totRecYds = teamPlayers.reduce((acc, curr) => acc + curr.RecYds, 0);
        const totRecTd = teamPlayers.reduce((acc, curr) => acc + curr.RecTd, 0);

        player.FantasyPoints += totRecYds / 25 + totRecTd * 4;
      }
    }
  });
    console.log(playerOutput)
    setPlayerSummary(playerOutput)
    setIsPlayerTableOpen(true);
  };
  
  

  return (
    <div className="App">
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" gutterBottom>
            NFL Teams - 2023

          </Typography>
          <Button onClick={handleSave}>Save</Button>
           <Button onClick={handleLoad}>Load</Button>
            <Button onClick={handleShowPlayerData}>Show Player Data</Button>
          <Grid container spacing={4}>
          {teams.map((team) => (
            <TeamCard key={team.Tm + uniqueKey} team={team} handleUpdate={handleUpdate} setPlayers={setPlayers} players={players} />
          ))}

          </Grid>
        </Box>
        {/* <StatsTable /> */}
        

        <Dialog open={isPlayerTableOpen} onClose={handleClosePlayerTable} fullWidth maxWidth="lg">
          <DialogTitle>Player Data</DialogTitle>
          <DialogContent>
            <PlayerTable playerData={playerSummary} onClose={handleClosePlayerTable} />
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
  
}

export default App;
