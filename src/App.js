import * as React from "react";
import { useState } from "react";
import { Container, Grid, Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, Snackbar, Alert } from "@mui/material";
import data from './data/data.json'
import starters from './data/starters.json'
import TeamCard from "./components/TeamCard";
import PlayerTable from "./components/PlayerTable";
import Papa from 'papaparse'; // Import papaparse
import { styled } from '@mui/system';

const ButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(2),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));



function App() {
  const [teams, setTeams] = useState(data);
  const [playerSummary, setPlayerSummary] = useState([])
  const [uniqueKey, setUniqueKey] = useState(Date.now());
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const allPlayers = data.reduce((acc, team) => {
    return [...acc, ...team.players];
  }, []);

  const [players, setPlayers] = useState(allPlayers);
  const [isPlayerTableOpen, setIsPlayerTableOpen] = useState(false);
// Loading and Saving

// Add this function to handle CSV export
const handleExportCSV = () => {
  const teamCSV = Papa.unparse(teams);
  const playerCSV = Papa.unparse(playerSummary);

  const downloadCSV = (csv, filename) => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  downloadCSV(teamCSV, 'teams.csv');
  downloadCSV(playerCSV, 'players.csv');
};
// Add this function to handle CSV import
const handleImportCSV = (event, isTeam) => {
  const file = event.target.files[0];
  if (file) {
    Papa.parse(file, {
      header: true,
      complete: (results) => {
        if (isTeam) {
          setTeams(results.data);
        } else {
          setPlayerSummary(results.data);
        }
        setUniqueKey(Date.now());
      },
      error: (error) => {
        console.error('Error parsing CSV:', error);
      },
    });
  }
};

// to local storage:
  const handleSave = () => {
    localStorage.setItem('teams', JSON.stringify(teams));
    localStorage.setItem('players', JSON.stringify(players));
    console.log(players)
  };
  const handleLoad = () => {
    const savedTeams = JSON.parse(localStorage.getItem('teams'));
    const savedPlayers = JSON.parse(localStorage.getItem('players'));
    // console.log(savedTeams)
    if (savedTeams) setTeams(savedTeams);
    if (savedPlayers) setPlayers(savedPlayers);
    // console.log(savedTeams)
    setUniqueKey(Date.now());
  };
  
  // New functions for handling Dialog and Snackbar
  const handleSaveClick = () => {
    setOpenDialog(true);
  };

const handleDialogClose = (shouldSave) => {
    setOpenDialog(false);

    if (shouldSave) {
      handleSave();
      setSnackbarMessage('Saved');
    } else {
      setSnackbarMessage('Data not saved');
    }
    setOpenSnackbar(true);
  };

  const handleLoadClick = () => {
    handleLoad();
    setSnackbarMessage('Projections Loaded');
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
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
        // console.log(player)
        const teamPlayers = playerOutput.filter((p) => p.Full_Team === player.Full_Team);
        const totRecYds = teamPlayers.reduce((acc, curr) => acc + curr.RecYds, 0);
        const totRecTd = teamPlayers.reduce((acc, curr) => acc + curr.RecTd, 0);

        player.FantasyPoints += totRecYds / 25 + totRecTd * 4;
      }
    }
  });
    // console.log(playerOutput)
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
          <ButtonContainer>
          <StyledButton variant="contained" color="primary" onClick={handleSaveClick}>
            Save
          </StyledButton>
          <StyledButton variant="contained" color="primary" onClick={handleLoadClick}>
            Load
          </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleShowPlayerData}
            >
              Show Player Data
            </StyledButton>
            <StyledButton
              variant="contained"
              color="primary"
              onClick={handleExportCSV}
            >
              Export CSV
            </StyledButton>
            <label htmlFor="team-csv" style={{ marginRight: 10 }}>
              <input
                style={{ display: 'none' }}
                id="team-csv"
                type="file"
                accept=".csv"
                onChange={(e) => handleImportCSV(e, true)}
              />
              <StyledButton
                component="span"
                variant="contained"
                color="secondary"
              >
                Load Teams from CSV
              </StyledButton>
            </label>
            <label htmlFor="player-csv">
              <input
                style={{ display: 'none' }}
                id="player-csv"
                type="file"
                accept=".csv"
                onChange={(e) => handleImportCSV(e, false)}
              />
              <StyledButton
                component="span"
                variant="contained"
                color="secondary"
              >
                Load Players from CSV
              </StyledButton>
            </label>
          </ButtonContainer>
          <Dialog
            open={openDialog}
            onClose={() => handleDialogClose(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Save data?</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Would you like to save the data?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDialogClose(false)} color="primary">
                No
              </Button>
              <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          
          {/* Add the Snackbar component for the Load button */}
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          >
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
              {snackbarMessage}
            </Alert>
          </Snackbar>
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
