import {
    Dialog,
    DialogTitle,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from "@mui/material";
  import { styled } from "@mui/system";
  import { useState } from "react";
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    fontWeight: "bold",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  }));

  const StyledPlayerTableCell = styled(TableCell)(({ theme }) => ({
    position: "sticky",
    left: 0,
    zIndex: 1,
    backgroundColor: theme.palette.background.paper,
}));

  
  const TeamModal = ({ open, handleClose, team }) => {

    const teamRushTD = team.TD;
    const teamPassTD = team.Pass_TD;
    const rushPlays = team.Rush_att;
    const passPlays = team.Pass_att;
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

    // Update functions for rushTdShare, recTdShare, targetShare, and rushShare input fields
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
          
        const totalRushTdShare = rushTdShares.reduce((sum, share) => sum + share, 0);
        const totalRecTdShare = recTdShares.reduce((sum, share) => sum + share, 0);
        const totalTargetShare = targetShares.reduce((sum, share) => sum + share, 0);
        const totalRushShare = rushShares.reduce((sum, share) => sum + share, 0);
        const totalRecYds = team.players.reduce((sum, _, index) => sum + (yardsPerTarget[index] * targetShares[index] * passPlays), 0);

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>{team.Tm} Players</DialogTitle>
        <DialogContent>
        <TableContainer component={Paper} sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>


            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead    sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 1,
                    backgroundColor: "white",
                }}>
              <TableRow
             
            >

                <StyledPlayerTableCell>Player</StyledPlayerTableCell>
                  <StyledTableCell>Position</StyledTableCell>
                  <StyledTableCell>RushTd%</StyledTableCell>
                  <StyledTableCell>RecTd%</StyledTableCell>
                  <StyledTableCell>Target%</StyledTableCell>
                  <StyledTableCell>Rush%</StyledTableCell>
                  <StyledTableCell>Y/A</StyledTableCell>
                  <StyledTableCell>Ctch%</StyledTableCell>
                  <StyledTableCell>YPT</StyledTableCell>
                  <StyledTableCell align="right">Rush TD</StyledTableCell>
                  <StyledTableCell align="right">Rush Att</StyledTableCell>
                  <StyledTableCell align="right">Rec TD</StyledTableCell>
                  <StyledTableCell align="right">Targets</StyledTableCell>
                  <StyledTableCell align="right">Receptions</StyledTableCell>
                  <StyledTableCell align="right">Rec Yds</StyledTableCell>
                  <StyledTableCell align="right">Rush Yds</StyledTableCell>
                  <StyledTableCell align="right">Fpts</StyledTableCell>
                </TableRow>
                <TableRow>
                <StyledPlayerTableCell>Total</StyledPlayerTableCell>
                <TableCell></TableCell>
                <TableCell>{(totalRushTdShare * 100).toFixed(1)}</TableCell>
                <TableCell>{(totalRecTdShare * 100).toFixed(1)}</TableCell>
                <TableCell>{(totalTargetShare * 100).toFixed(1)}</TableCell>
                <TableCell>{(totalRushShare * 100).toFixed(1)}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="right">{totalRecYds.toFixed(1)}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
            </TableRow>
              </TableHead>
          <TableBody>
            
            {team.players.map((player, index) => {
              // Calculate player statistics
              const rushTD = rushTdShares[index] * teamRushTD;
              const recTD = recTdShares[index] * teamPassTD;
              const targets = targetShares[index] * passPlays;
              const rushAtt = rushShares[index] * rushPlays;
              const receptions = catchRates[index] * targets;
              const recYds = yardsPerTarget[index] * targets;
              const rushYds = yardsPerRushAttempt[index] * rushAtt;
              const fPts = receptions + (recYds + rushYds)/10 + (rushTD + recTD)*6
            //   const receptions = targets * player.catchRate;
            //   const recYds = receptions * player.yardsPerReception;
            //   const rushYds = rushAtt * player.yardsPerRush;

              return (
                <TableRow key={player.Player}>
                  <StyledPlayerTableCell>{player.Player}</StyledPlayerTableCell>
                    
                  
                <TableCell>{player.Pos}</TableCell>
                  
                  <TableCell>
                    <input
                        type="number"
                        step="0.1"
                        value={parseFloat((rushTdShares[index] * 100).toFixed(1))}
                        onChange={(e) => updateRushTdShare(index, e.target.value)}
                    />
                    </TableCell>
                    <TableCell>
                    <input
                        type="number"
                        step="0.1"
                        value={parseFloat((recTdShares[index] * 100).toFixed(1))}
                        onChange={(e) => updateRecTdShare(index, e.target.value)}
                    />
                    </TableCell>
                    <TableCell>
                    <input
                        type="number"
                        step="0.1"
                        value={parseFloat((targetShares[index] * 100).toFixed(1))}
                        onChange={(e) => updateTargetShare(index, e.target.value)}
                    />
                    </TableCell>
                    <TableCell>
                    <input
                        type="number"
                        step="0.1"
                        value={parseFloat((rushShares[index] * 100).toFixed(1))}
                        onChange={(e) => updateRushShare(index, e.target.value)}
                    />
                    </TableCell>
                    <TableCell>
                        <input
                            type="number"
                            step="0.1"
                            value={parseFloat(yardsPerRushAttempt[index].toFixed(1))}
                            onChange={(e) =>
                            updateYardsPerRushAttempt(index, e.target.value)
                            }
                        />
                        </TableCell>
                        <TableCell>
                        <input
                            type="number"
                            step="0.1"
                            value={parseFloat((catchRates[index]*100).toFixed(1))}
                            onChange={(e) =>
                            updateCatchRate(index, e.target.value)
                            }
                        />
                        </TableCell>
                        <TableCell>
                        <input
                            type="number"
                            step="0.1"
                            value={parseFloat(yardsPerTarget[index].toFixed(1))}
                            onChange={(e) =>
                            updateYardsPerTarget(index, e.target.value)
                            }
                        />
                    </TableCell>
                  <TableCell align="right">{rushTD.toFixed(1)}</TableCell>
                  <TableCell align="right">{rushAtt.toFixed(1)}</TableCell>
                  <TableCell align="right">{recTD.toFixed(1)}</TableCell>
                  <TableCell align="right">{targets.toFixed(1)}</TableCell>
                  <TableCell align="right">{(receptions).toFixed(1)}</TableCell>
                  <TableCell align="right">{recYds.toFixed(1)}</TableCell>
                  <TableCell align="right">{rushYds.toFixed(1)}</TableCell>
                  <TableCell align="right">{fPts.toFixed(1)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default TeamModal;
  