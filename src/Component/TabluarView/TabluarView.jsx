import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getmapLocation } from '../../Service/AxioService';
import OpenStreetMap from '../OpenStreetMap';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

// function createData(id, user, Latitude, Longitude, Place,Action) {
//   return { id, user, Latitude, Longitude, Place,Action };
// }

// const rows = [
//   createData(1,'vm@gmail.com',13.909,80.65,'Home','Edit')
// ];

export default function TabularView(props) {

  console.log(props)
    const [tabledata,settabledata] = React.useState([])
    const [openmap,setopenmap] = React.useState(false)
    const [editdata,seteditdata] = React.useState([])
 
    const gettabledata = () => {
      getmapLocation().then((res) => {
          console.log(res)
          settabledata(res.data)
      }).catch((err) => {
          console.log(err)
      })
  }

  const handleedit = (data) => {
    setopenmap(true)
    console.log("testing",data)
    seteditdata(data)
  }


  React.useEffect(()=> {
    gettabledata()
  },[])


  return (
    <TableContainer component={Paper}>

      {openmap ? <div className="mapview"> <OpenStreetMap editdata={handleedit} /> </div> :
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Id</StyledTableCell>
            <StyledTableCell align="centre">User</StyledTableCell>
            <StyledTableCell align="centre">Latitude&nbsp;</StyledTableCell>
            <StyledTableCell align="centre">Longitude&nbsp;</StyledTableCell>
            <StyledTableCell align="centre">Place&nbsp;</StyledTableCell>
            <StyledTableCell align="centre">Action&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabledata.map((row) => (
            <StyledTableRow key={row.name}>
              {/* <StyledTableCell component="th" scope="row">
              {row.id}
              </StyledTableCell> */}
             <StyledTableCell align="left">{row.id}</StyledTableCell>
              <StyledTableCell align="centre">{row.user}</StyledTableCell>
              <StyledTableCell align="centre">{row.lat}</StyledTableCell>
              <StyledTableCell align="centre">{row.lng}</StyledTableCell>
              <StyledTableCell align="centre">{row.Place}</StyledTableCell>
              <StyledTableCell align="centre">{row.Action}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
}
    </TableContainer>
            
  );
}


