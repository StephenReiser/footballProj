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


const TeamCard = ({ team, handleUpdate, setPlayers, players }) => {

    console.log(team,'-------TotalPlays', team.Pass_att+team.Rush_att)
    const filteredPlayers = players.filter((player) => player.Full_Team === team.Tm);
    const [open, setOpen] = useState(false);
    const [passTDs, setPassTDs] = useState(team.Pass_TD);
    const [rushTDs, setRushTDs] = useState(team.TD);
    const [totalPlays, setTotalPlays] = useState(parseFloat(Number(team.Pass_att) + Number(team.Rush_att)).toFixed(1));

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

  // ------------------Set Player level details ----------------------------
  // ------------------Set Player level details ----------------------------
  // ------------------Set Player level details ----------------------------
  const [rushTdShares, _setRushTdShares] = useState(
    filteredPlayers.map((player) => player.rushTdShare)
  );
  
  const setRushTdShares = (newRushTdShares) => {
    // Update the rushTdShares state
    _setRushTdShares(newRushTdShares);
  
    // Update the corresponding players with new rushTdShare values
    const updatedPlayers = players.map((player, index) => {
      const updatedRushTdShare = newRushTdShares[index];
      if (updatedRushTdShare !== undefined) {
        return {
          ...player,
          rushTdShare: updatedRushTdShare,
        };
      }
      return player;
    });
    console.log(updatedPlayers)
    // Update the players state
    setPlayers(updatedPlayers);
  };
  
  const [recTdShares, _setRecTdShares] = useState(
    filteredPlayers.map((player) => player.recTdShare)
  );

  const setRecTdShares = (newRecTdShares) => {
    // Update the rushTdShares state
    _setRecTdShares(newRecTdShares);
  
    // Update the corresponding players with new rushTdShare values
    const updatedPlayers = players.map((player, index) => {
      const updatedRecTdShare = newRecTdShares[index];
      if (updatedRecTdShare !== undefined) {
        return {
          ...player,
          recTdShare: updatedRecTdShare,
        };
      }
      return player;
    });
    console.log(updatedPlayers)
    // Update the players state
    setPlayers(updatedPlayers);
  };

  const [targetShares, _setTargetShares] = useState(
    filteredPlayers.map((player) => player.targetShare)
  );

  const setTargetShares = (newTargetShares) => {
    // Update the rushTdShares state
    _setTargetShares(newTargetShares);
  
    // Update the corresponding players with new rushTdShare values
    const updatedPlayers = players.map((player, index) => {
      const updatedTargetShare = newTargetShares[index];
      if (updatedTargetShare !== undefined) {
        return {
          ...player,
          targetShare: updatedTargetShare,
        };
      }
      return player;
    });
    console.log(updatedPlayers)
    // Update the players state
    setPlayers(updatedPlayers);
  };

  const [rushShares, _setRushShares] = useState(
    filteredPlayers.map((player) => player.rushShare)
  );
  const setRushShares = (newRushShares) => {
    // Update the rushTdShares state
    _setRushShares(newRushShares);
  
    // Update the corresponding players with new rushTdShare values
    const updatedPlayers = players.map((player, index) => {
      const updatedRushShare = newRushShares[index];
      if (updatedRushShare !== undefined) {
        return {
          ...player,
          rushShare: updatedRushShare,
        };
      }
      return player;
    });
    console.log(updatedPlayers)
    // Update the players state
    setPlayers(updatedPlayers);
  };

  const [yardsPerRushAttempt, _setYardsPerRushAttempt] = useState(filteredPlayers.map(player => player["Y/A"]));
  
  const setYardsPerRushAttempt = (ypa) => {
    // Update the rushTdShares state
    _setYardsPerRushAttempt(ypa);
  
    // Update the corresponding players with new rushTdShare values
    const updatedPlayers = players.map((player, index) => {
      const updatedYPA = ypa[index];
      if (updatedYPA !== undefined) {
        return {
          ...player,
          'Y/A': updatedYPA,
        };
      }
      return player;
    });
    console.log(updatedPlayers)
    // Update the players state
    setPlayers(updatedPlayers);
  };

  const [catchRates, _setCatchRates] = useState(filteredPlayers.map(player => player["Ctch%"]));


  const setCatchRates = (catchRate) => {
    // Update the rushTdShares state
    _setCatchRates(catchRate);
  
    // Update the corresponding players with new rushTdShare values
    const updatedPlayers = players.map((player, index) => {
      const updatedRate = catchRate[index];
      if (updatedRate !== undefined) {
        return {
          ...player,
          'Ctch%': updatedRate,
        };
      }
      return player;
    });
    console.log(updatedPlayers)
    // Update the players state
    setPlayers(updatedPlayers);
  };


  const [yardsPerTarget, _setYardsPerTarget] = useState(filteredPlayers.map(player => player["Y/Tgt"]));


  const setYardsPerTarget = (ypt) => {
    // Update the rushTdShares state
    _setYardsPerTarget(ypt);
  
    // Update the corresponding players with new rushTdShare values
    const updatedPlayers = players.map((player, index) => {
      const updatedYPT = ypt[index];
      if (updatedYPT !== undefined) {
        return {
          ...player,
          'Y/Tgt': updatedYPT,
        };
      }
      return player;
    });
    console.log(updatedPlayers)
    // Update the players state
    setPlayers(updatedPlayers);
  };

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


// ------------------ END Set Player level details ----------------------------
// ------------------END Set Player level details ----------------------------
// ------------------END Set Player level details ----------------------------

//   Functions:
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(team)
        // handleModalClose(team)
    };
    


// Here is where we should figure out how to setTeams 
// Here is where we should figure out how to setTeams
// Here is where we should figure out how to setTeams
const handlePercentageChange = (event) => {
  const target = event.target;
  const value = parseFloat(target.value);

  let newPassTDs;
  let newRushTDs;

  if (target.name === "passTDPercentage") {
    setPassTDPercentage(value);
    setRushTDPercentage(100 - value);
    newPassTDs = totalTDs * value / 100;
    newRushTDs = totalTDs * (100 - value) / 100;
  } else if (target.name === "rushTDPercentage") {
    setRushTDPercentage(value);
    setPassTDPercentage(100 - value);
    newRushTDs = totalTDs * value / 100;
    newPassTDs = totalTDs * (100 - value) / 100;
  }

  setPassTDs(newPassTDs);
  setRushTDs(newRushTDs);

  // Create a new team object with the updated properties
  const updatedTeam = {
    ...team,
    Pass_TD: newPassTDs,
    TD: newRushTDs,
  };

  handleUpdate(updatedTeam);
};

  
const handlePlayPercentageChange = (event) => {
  const target = event.target;
  const value = parseFloat(target.value);

  let newRushPerc;
  let newPassPerc;

  if (target.name === "rushPerc") {
    newRushPerc = value;
    newPassPerc = 100 - value;
  } else if (target.name === "passPerc") {
    newPassPerc = value;
    newRushPerc = 100 - value;
  }

  setRushPerc(newRushPerc);
  setPassPerc(newPassPerc);

  // Calculate the new Rush_att and Pass_att values
  const newRushAtt = (newRushPerc / 100 * totalPlays).toFixed(1);
  const newPassAtt = (newPassPerc / 100 * totalPlays).toFixed(1);

  // Create a new team object with the updated properties
  const updatedTeam = {
    ...team,
    Rush_att: newRushAtt,
    Pass_att: newPassAtt,
  };

  handleUpdate(updatedTeam);
};
const handleTotalTDsChange = (event) => {
  const newTotalTDs = parseInt(event.target.value, 10);

  setTotalTDs(newTotalTDs);
  const newPassTDs = Math.round(newTotalTDs * passTDPercentage / 100);
  const newRushTDs = Math.round(newTotalTDs * rushTDPercentage / 100);
  setPassTDs(newPassTDs);
  setRushTDs(newRushTDs);

  // Create a new team object with the updated properties
  const updatedTeam = {
    ...team,
    Pass_TD: newPassTDs,
    TD: newRushTDs,
  };

  handleUpdate(updatedTeam);
};

const handleTotalPlaysChange = (event) => {
  const newTotalPlays = parseInt(event.target.value, 10);

  setTotalPlays(newTotalPlays);

  // Calculate the new Rush_att and Pass_att values
  const newRushAtt = (rushPerc / 100 * newTotalPlays).toFixed(1);
  const newPassAtt = (passPerc / 100 * newTotalPlays).toFixed(1);

  // Create a new team object with the updated properties
  const updatedTeam = {
    ...team,
    Rush_att: newRushAtt,
    Pass_att: newPassAtt,
  };

  handleUpdate(updatedTeam);
};


// End Team Setting


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
                Pass Plays: {(passPerc / 100 * totalPlays).toFixed(1)}
              </Typography>
              <Typography variant="body1">
                Rush Plays: {(rushPerc / 100 * totalPlays).toFixed(1)}
              </Typography>
              <Button variant="contained" onClick={handleOpen} sx={{ mt: 2 }}>
                View Players
                </Button>
                {/* Modal implementation */}
                <TeamModal open={open} handleClose={handleClose} team={team} rushTdShares={rushTdShares} setRushTdShares={setRushTdShares} updateRushTdShare={updateRushTdShare}
                recTdShares={recTdShares} targetShares={targetShares} rushShares={rushShares} yardsPerRushAttempt={yardsPerRushAttempt} catchRates={catchRates} yardsPerTarget={yardsPerTarget}
                updateRecTdShare={updateRecTdShare} updateTargetShare={updateTargetShare} updateRushShare={updateRushShare} updateYardsPerRushAttempt={updateYardsPerRushAttempt}
                updateCatchRate={updateCatchRate} updateYardsPerTarget={updateYardsPerTarget} players={filteredPlayers} />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Grid>
  );
};

export default TeamCard;


