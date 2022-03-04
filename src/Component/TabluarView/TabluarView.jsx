import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getmapLocation, deleteLocation, Posthistory } from '../../Service/AxioService';
import OpenStreetMap from '../OpenStreetMap/OpenStreetMap';
import EditLocationAltTwoToneIcon from '@mui/icons-material/EditLocationAltTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import MapTwoToneIcon from '@mui/icons-material/MapTwoTone';
import { useNavigate } from 'react-router-dom';
import './TabularView.scss';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function TabularView(props) {
  const navigate = useNavigate()

    console.log(props)
    const [tabledata,settabledata] = React.useState([])
    const [openmap,setopenmap] = React.useState(false)
    const [editdata,seteditdata] = React.useState([]);
    
 
    const gettabledata = () => {
      getmapLocation().then((res) => {
          console.log(res)
          settabledata(res.data)
      }).catch((err) => {
          console.log(err)
      })
  }
    //edit data
  const handleedit = (data) => {
    setopenmap(true)
    console.log(data);
    seteditdata(data)
  }

    //Delete data
    const removeData = (id) => {
      if (window.confirm("Are you sure that you want to delete this location?")) {

          const del = tabledata.filter((delData) => delData.id !== id )
          const deletedData = tabledata.filter((delData) => delData.id == id )
                console.log(del)
                Posthistory(deletedData)

              deleteLocation(id) 
                .then(res => {
                settabledata(del)
                
              console.log('res', res)})
                .catch(err => console.log(err));
      }
    }
    

  React.useEffect(()=> {
    gettabledata()
  },[])


  return (
    <TableContainer component={Paper}>

      {openmap ? <div className="mapview"> <OpenStreetMap editdata={editdata} /> </div> :
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="centre">Latitude</StyledTableCell>
            <StyledTableCell align="centre">Longitude</StyledTableCell>
            <StyledTableCell align="centre">Place</StyledTableCell>
            <StyledTableCell align="centre">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tabledata.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell align="left">{row.lat}</StyledTableCell>
              <StyledTableCell align="centre">{row.lng}</StyledTableCell>
              <StyledTableCell align="centre">{row.Place}</StyledTableCell>
             {row.lat != null ? 
              <StyledTableCell align="left">
                {row.Action}
              <div className='action-container'>
                <a ><div className='editbtn' title='edit'>< EditLocationAltTwoToneIcon   onClick={() => handleedit(row)} /></div>
                <div className='deletebtn' title='delete'><DeleteTwoToneIcon onClick={() => removeData(row.id)}/></div>
                <div className='mapbtn' title='map view'><MapTwoToneIcon onClick={()=> navigate("/openstreetmap")} /></div>

                </a>
              </div>
              </StyledTableCell>
              :null}

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
}
    </TableContainer>
            
  );
}

