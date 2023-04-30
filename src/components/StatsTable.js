import React, { useState } from 'react';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const StatsTable = () => {
  const [teamStats, setTeamStats] = useState([]);

  // useEffect(() => {
  //   // Replace the URL with the API endpoint you're using to fetch the JSON data
  //   fetch("http://127.0.0.1:5000/api/teams/2023")
  //     .then((response) => response.json())
  //     .then((data) => setTeamStats(data));
  // }, []);

  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Team</TableCell>
              <TableCell align="right">Games</TableCell>
              <TableCell align="right">Pass Attempts</TableCell>
              <TableCell align="right">Completions</TableCell>
              <TableCell align="right">Yards</TableCell>
              <TableCell align="right">Pass TDs</TableCell>
              <TableCell align="right">Rush Attempts</TableCell>
              <TableCell align="right">Rushing Yards</TableCell>
              <TableCell align="right">Total TDs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {teamStats.map((stat) => (
              <TableRow key={stat.Tm}>
                <TableCell component="th" scope="row">
                  {stat.Tm}
                </TableCell>
                <TableCell align="right">{stat.G}</TableCell>
                <TableCell align="right">{stat.Pass_att.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.Cmp.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.Yds.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.Pass_TD.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.Rush_att.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.Yds_rushing.toFixed(1)}</TableCell>
                <TableCell align="right">{stat.TD.toFixed(1)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default StatsTable;
