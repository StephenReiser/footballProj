// import { Grid, Typography, Paper, TextField, Box } from "@mui/material";
import {
    Grid,
    Typography,
    Paper,
    TextField,
    Box,
    Button
  } from "@mui/material";
import { useState } from "react";
import TeamModal from "./TeamModal";


const TeamCard = ({ team }) => {
    console.log(team)
    const [open, setOpen] = useState(false);
    const [passTDs, setPassTDs] = useState(team.Pass_TD);
    const [rushTDs, setRushTDs] = useState(team.TD);
    const [totalPlays, setTotalPlays] = useState(parseFloat(team.Pass_att + team.Rush_att).toFixed(1));
    const [rushPerc, setRushPerc] = useState(
        parseFloat((team.Rush_att / totalPlays) * 100).toFixed(1));
    const [passPerc, setPassPerc] = useState(
        parseFloat((team.Pass_att / totalPlays) * 100).toFixed(1));

  const [passTDPercentage, setPassTDPercentage] = useState(
    parseFloat(((team.Pass_TD / (team.Pass_TD + team.TD)) * 100).toFixed(1))
  );
  const [rushTDPercentage, setRushTDPercentage] = useState(
    parseFloat(((team.TD / (team.Pass_TD + team.TD)) * 100).toFixed(1))
  );
  const [totalTDs, setTotalTDs] = useState(parseFloat(team.Pass_TD + team.TD).toFixed(1));

  // State previously in TeamModal:
  const [rushTdShares, setRushTdShares] = useState(
    team.players.map((player) => player.rushTdShare)
  );
  const [recTdShares, setRecTdShares] = useState(
    team.players.map((player) => player.recTdShare)
  );
  const [targetShares, setTargetShares] = useState(
    team.players.map((player) => player.targetShare)
  );
  const [rushShares, setRushShares] = useState(
    team.players.map((player) => player.rushShare)
  );
  const [yardsPerRushAttempt, setYardsPerRushAttempt] = useState(team.players.map(player => player["Y/A"]));
  const [catchRates, setCatchRates] = useState(team.players.map(player => player["Ctch%"]));
  const [yardsPerTarget, setYardsPerTarget] = useState(team.players.map(player => player["Y/Tgt"]));

  // Update Functions Previously in Modal:
  const updateRushTdShare = (index, value) => {
    const newRushTdShares = [...rushTdShares];
    newRushTdShares[index] = parseFloat(value) / 100 || 0;
    setRushTdShares(newRushTdShares);
};

const updateRecTdShare = (index, value) => {
  const newRecTdShares = [...recTdShares];
  newRecTdShares[index] = parseFloat(value) / 100 || 0;
  setRecTdShares(newRecTdShares);
};
const updateTargetShare = (index, value) => {
  const newTargetShares = [...targetShares];
  newTargetShares[index] = parseFloat(value) / 100 || 0;
  setTargetShares(newTargetShares);
};
const updateRushShare = (index, value) => {
  const newRushShares = [...rushShares];
  newRushShares[index] = parseFloat(value) / 100 || 0;
  setRushShares(newRushShares);
};
const updateYardsPerRushAttempt = (index, value) => {
  const newYardsPerRushAttempt = [...yardsPerRushAttempt];
  newYardsPerRushAttempt[index] = parseFloat(value);
  setYardsPerRushAttempt(newYardsPerRushAttempt);
};

const updateCatchRate = (index, value) => {
  const newCatchRates = [...catchRates];
  newCatchRates[index] = parseFloat(value) / 100 || 0;
  setCatchRates(newCatchRates);
};

const updateYardsPerTarget = (index, value) => {
  const newYardsPerTarget = [...yardsPerTarget];
  newYardsPerTarget[index] = parseFloat(value);
  setYardsPerTarget(newYardsPerTarget);
};
//   Functions:
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
  const handlePercentageChange = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);
  
    if (target.name === "passTDPercentage") {
      setPassTDPercentage(value);
      setRushTDPercentage(100-value);
      setPassTDs(totalTDs * value/100);
      setRushTDs(totalTDs * (100 - value)/100);
    } else if (target.name === "rushTDPercentage") {
      setRushTDPercentage(value);
      setPassTDPercentage(100-value);
      setRushTDs(totalTDs * value/100);
      setPassTDs(totalTDs * (100 - value)/100);
    }
  };
  
    const handlePlayPercentageChange = (event) => {
        const target = event.target;
        const value = parseFloat(target.value);

        if (target.name === "rushPerc") {
        setRushPerc(value);
        setPassPerc(100 - value);
        } else if (target.name === "passPerc") {
        setPassPerc(value);
        setRushPerc(100 - value);
        }
    };
  const handleTotalTDsChange = (event) => {
    const newTotalTDs = parseInt(event.target.value, 10);
    console.log(newTotalTDs)
    setTotalTDs(newTotalTDs);
    setPassTDs(Math.round(newTotalTDs * passTDPercentage/100));
    setRushTDs(Math.round(newTotalTDs * rushTDPercentage/100));
  };
  const handleTotalPlaysChange = (event) => {
    const newTotalPlays = parseInt(event.target.value, 10);
    
    setTotalPlays(newTotalPlays);
    // setPassTDs(Math.round(newTotalTDs * passTDPercentage/100));
    // setRushTDs(Math.round(newTotalTDs * rushTDPercentage/100));
  };


  

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Paper elevation={3} sx={{ p: 2, height: "100%" }}>
        <Typography variant="h5" gutterBottom>
          {team.Tm}
        </Typography>
        <Typography variant="body1">Games: {team.G}</Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Total TDs"
            type="number"
            value={totalTDs}
            onChange={(e) => handleTotalTDsChange(e)}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Pass TD %"
              type="number"
              name="passTDPercentage"
              value={passTDPercentage}
              onChange={handlePercentageChange}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Rush TD %"
              type="number"
              name="rushTDPercentage"
              value={rushTDPercentage}
              onChange={handlePercentageChange}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Total Plays"
            type="number"
            value={totalPlays}
            onChange={handleTotalPlaysChange}
            variant="outlined"
            fullWidth
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              label="Rush %"
              type="number"
              name="rushPerc"
              value={rushPerc}
              onChange={handlePlayPercentageChange}
              sx={{ mr: 1 }}
            />
            <TextField
              label="Pass %"
              type="number"
              name="passPerc"
              value={passPerc}
              onChange={handlePlayPercentageChange}
            />
          </Box>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1">
                Pass TD: {passTDs.toFixed(1)}
              </Typography>
              <Typography variant="body1">
                Rush TD: {rushTDs.toFixed(1)}
              </Typography>
              <Typography variant="body1">
                Plays/Game: {(totalPlays / team.G).toFixed(1)}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1">
                Pass Plays: {(rushPerc / 100 * totalPlays).toFixed(1)}
              </Typography>
              <Typography variant="body1">
                Rush Plays: {(passPerc / 100 * totalPlays).toFixed(1)}
              </Typography>
              <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
                View Players
                </Button>
                {/* Modal implementation */}
                <TeamModal open={open} handleClose={handleClose} team={team} rushTdShares={rushTdShares} setRushTdShares={setRushTdShares} updateRushTdShare={updateRushTdShare}
                recTdShares={recTdShares} targetShares={targetShares} rushShares={rushShares} yardsPerRushAttempt={yardsPerRushAttempt} catchRates={catchRates} yardsPerTarget={yardsPerTarget}
                updateRecTdShare={updateRecTdShare} updateTargetShare={updateTargetShare} updateRushShare={updateRushShare} updateYardsPerRushAttempt={updateYardsPerRushAttempt}
                updateCatchRate={updateCatchRate} updateYardsPerTarget={updateYardsPerTarget}/>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TeamCard;


