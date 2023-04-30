import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';

const StyledTable = styled(Table)({
  minWidth: 650,
});


const StyledTableHead = styled(TableHead)({
  '& .MuiTableCell-head': {
    fontWeight: 'bold',
    backgroundColor: '#f5f5f5',
  },
});
const StyledTableContainer = styled(TableContainer)({
  maxHeight: '70vh',
});



const PlayerTable = ({ playerData, onClose }) => {
  
  
  const [positionFilter, setPositionFilter] = useState('all');
  

  
  const sortedPlayerData = () => {
    const sorted = playerData.slice().sort((a, b) => b.FantasyPoints - a.FantasyPoints);
    return sorted.map((player, index) => ({
      ...player,
      Rank: index + 1,
    }));
  };
  
  
  const filteredPlayerData = () => {
    if (positionFilter === 'all') {
      return sortedPlayerData();
    } else if (positionFilter === 'Flex') {
      return sortedPlayerData().filter(player => player.Position !== 'QB');
    } else {
      return sortedPlayerData().filter(player => player.Position === positionFilter);
    }
  };
  
  
    

  return (
    <Paper>
      <StyledTableContainer>
      <InputLabel id="position-filter-label">Position Filter</InputLabel>
        <Select
          labelId="position-filter-label"
          id="position-filter"
          value={positionFilter}
          label="Position Filter"
          onChange={(event) => setPositionFilter(event.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="QB">QB</MenuItem>
          <MenuItem value="RB">RB</MenuItem>
          <MenuItem value="WR">WR</MenuItem>
          <MenuItem value="TE">TE</MenuItem>
          <MenuItem value="Flex">Flex</MenuItem>
        </Select>

        <StyledTable stickyHeader aria-label="player data table">
          <StyledTableHead>
            <TableRow>
            <TableCell>Rank</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Rush Attempts</TableCell>
              <TableCell>Rush Yards</TableCell>
              <TableCell>Rush TDs</TableCell>
              <TableCell>Targets</TableCell>
              <TableCell>Receptions</TableCell>
              <TableCell>Rec Yds</TableCell>
              <TableCell>Rec TDs</TableCell>
              <TableCell>Fantasy Points</TableCell>
            </TableRow>


          </StyledTableHead>
          <TableBody>
            {filteredPlayerData().map((player, index) => (
              <TableRow key={index}>
                <TableCell>{player.Rank}</TableCell>
                <TableCell>{player.Player}</TableCell>
                <TableCell>{player.Position}</TableCell>
                <TableCell>{player.Full_Team}</TableCell>
                <TableCell>{player.RushAtt.toFixed(2)}</TableCell>
                <TableCell>{player.RushYds.toFixed(2)}</TableCell>
                <TableCell>{player.RushTD.toFixed(2)}</TableCell>
                <TableCell>{player.Targets.toFixed(2)}</TableCell>
                <TableCell>{player.Receptions.toFixed(2)}</TableCell>
                <TableCell>{player.RecYds.toFixed(2)}</TableCell>
                <TableCell>{player.RecTd.toFixed(2)}</TableCell>
                <TableCell>{player.FantasyPoints.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </StyledTable>
      </StyledTableContainer>
    </Paper>
  );
};

export default PlayerTable;
