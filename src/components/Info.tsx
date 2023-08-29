import * as React from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Table, Card } from "@mui/material";

function createData(
  name: string,
  calories: number,
  fat: number,
) {
  return { name, calories, fat };
}

const rows = [
  createData("Tomorrow", 159, 6.0),
  createData("Monday", 237, 9.0),
  createData("Tuesday", 262, 16.0),
  createData("Wednesday", 305, 3.7),
  createData("Thursday", 356, 16.0),
  createData("Friday", 356, 16.0),
  createData("Saturday", 356, 16.0),
];

const Info = () => {
  return (
    <div>
      <p>Today</p>
      <Card>
        <p>Now</p>
        <p>Image</p>
        <p>24&deg;</p>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Day</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Info;
