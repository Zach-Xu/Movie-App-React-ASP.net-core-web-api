import React, { useState } from 'react'
import './mymovies.css'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
};

const rows = [{
    name: 123
}]

export default function MyMovies() {

    const [openEdit, setOpenEdit] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)

    const handleClose = () => {
        setOpenAdd(false)
        setOpenEdit(false)
    }

    const addMovie = () => {
        setOpenAdd(true)
    }

    const editMovie = (id) => {
        setOpenEdit(true);
    }

    const deleteMovie = (id) => {

    }

    return (
        <div className="mymovies-container">
            <h2>My Uploaded Movies</h2>
            <Button variant="contained" style={{ margin: '20px 0 10px' }} onClick={addMovie}>Add Movie</Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="center">Genre</StyledTableCell>
                            <StyledTableCell align="center">Director&#40; s&#41;</StyledTableCell>
                            <StyledTableCell align="center">Release Time</StyledTableCell>
                            <StyledTableCell align="center">Operations</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <StyledTableRow key={row.name}>
                                <StyledTableCell component="th" scope="row">
                                    {row.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                                <StyledTableCell align="center">{row.fat}</StyledTableCell>
                                <StyledTableCell align="center">{row.carbs}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button style={{ marginRight: '20px' }} variant="contained" endIcon={<SettingsOutlinedIcon />}
                                        onClick={() => editMovie(123)}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="outlined" startIcon={<DeleteIcon />}
                                        onClick={() => deleteMovie(123)}>
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={openAdd}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Add a movie</h2>
                    <div className="form-control">
                        <span>Title: </span>  <input type="text" />
                    </div>
                    <div className="form-control">
                        <span>Genre: </span>  <input type="text" />
                    </div>
                    <div className="form-control">
                        <span>Director&#40;s&#41;: </span>  <input type="text" />
                    </div>
                    <div className="form-control">
                        <span>Release Time: </span>  <input type="date" />
                    </div>
                    <div className="form-control">
                        <span>Overview: </span>  <textarea name="" cols="30" rows="5"></textarea>
                    </div>
                    <div className="form-control">
                        <span>Cover Page: </span>  <input type="file" name="" accept="image/*" />
                    </div>
                    <div className="form-control">
                        <span>Movie File: </span>  <input type="file" name="" accept="video/*" />
                    </div>
                    <Button variant="contained" sx={{
                        display: 'block',
                        margin: '10px auto'
                    }}>Upload</Button>
                </Box>
            </Modal>
            <Modal
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Edit Movie</h2>
                    <div className="form-control">
                        <span>Title: </span>  <input type="text" />
                    </div>
                    <div className="form-control">
                        <span>Genre: </span>  <input type="text" />
                    </div>
                    <div className="form-control">
                        <span>Director&#40;s&#41;: </span>  <input type="text" />
                    </div>
                    <div className="form-control">
                        <span>Release Time: </span>  <input type="date" />
                    </div>
                    <div className="form-control">
                        <span>Overview: </span>  <textarea name="" cols="30" rows="5"></textarea>
                    </div>
                    <Button variant="contained" sx={{
                        display: 'block',
                        margin: '10px auto'
                    }}>Update</Button>
                </Box>
            </Modal>
        </div >
    )
}
