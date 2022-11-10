import React, { useState, useContext, useEffect } from 'react'
import './mymovies.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { green } from '@mui/material/colors';
import { AuthContext } from '../../App';
import { ToastContainer, toast } from 'react-toastify';
import { baseURL } from '../../config/env';

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

export default function MyMovies() {

    const [auth, setAuth] = useContext(AuthContext)

    const [openEdit, setOpenEdit] = useState(false)
    const [openAdd, setOpenAdd] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('authUser')) {
            setAuth(JSON.parse(localStorage.getItem('authUser')))
        } else {
            navigate('/')
        }
    }, [])

    const [rows, setRows] = useState([])

    const getMyMovies = async () => {
        if (auth.id !== undefined) {
            const result = await axios.get(`${baseURL}/api/Movie/uploader/${auth.id}`)
            setRows(result.data)
        }
    }

    useEffect(() => {
        getMyMovies()
    }, [])

    const handleClose = () => {
        setOpenAdd(false)
        setMovieToBeUpload({
            ...movieToBeUpload,
            ImageFile: ''
        })
        setOpenEdit(false)
        setLoading(false)
    }

    const addMovie = () => {
        setOpenAdd(true)
    }

    const editMovie = (movie) => {
        setOpenEdit(true);
        console.log('edit123', movie);
        setMovieToBeEdit({
            MovieID: movie.movieID,
            Title: movie.title,
            Genre: movie.genre,
            AvgRating: movie.avgRating,
            Directors: movie.directors,
            ReleaseTime: formateDate(new Date(movie.releaseTime * 1000 - new Date(movie.releaseTime * 1000).getTimezoneOffset() * -60000)),
            Overview: movie.overview,
            UploaderID: auth.id
        })
    }

    const formateDate = (date) => {
        const mm = date.getMonth() + 1
        const dd = date.getDate()
        return `${date.getFullYear()}-${(mm > 9 ? '' : '0') + mm}-${(dd > 9 ? '' : '0') + dd
            }`
    }

    const deleteMovie = async (movie) => {
        console.log(movie);
        try {
            await axios.delete(`${baseURL}/api/Movie`, {
                data: {
                    movieID: movie.movieID,
                    uploaderID: auth.id,
                    s3FilePath: movie.s3FilePath,
                    s3ImgPath: movie.s3ImgPath
                }
            })
            toast.success('Movie Deleted', {
                position: toast.POSITION.TOP_CENTER
            })
            await getMyMovies()
        } catch (error) {
            console.log(error);
            toast.error('Fail to delete movie', {
                position: toast.POSITION.TOP_CENTER
            })
        }

    }

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const buttonSx = {
        display: 'block',
        margin: '10px auto',
        ...(success && {
            bgcolor: green[500],
            '&:hover': {
                bgcolor: green[700],
            },
        }),
    };

    const [movieToBeUpload, setMovieToBeUpload] = useState({
        Title: '',
        Genre: 'Action',
        Directors: '',
        ReleaseTime: '',
        Overview: '',
        MovieFile: '',
        ImageFile: '',
        UploaderID: auth.id
    })

    const [movieToBeEdit, setMovieToBeEdit] = useState({
        MovieID: '',
        Title: '',
        Genre: '',
        Directors: '',
        ReleaseTime: '',
        Overview: '',
        UploaderID: auth.id
    })

    const uploadMovie = async () => {
        console.log(auth);
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }
        const formData = new FormData()
        for (const [key, value] of Object.entries(movieToBeUpload)) {
            formData.append(key, value)
        }

        console.log('formdata', formData)

        try {
            const res = await axios.post(`${baseURL}/api/Movie`, formData)
            if (res.status === 200 || res.status === 204) {
                setSuccess(true);
                setLoading(false);
                toast.success('Movie uploaded', {
                    position: toast.POSITION.TOP_CENTER
                })
                setOpenAdd(false)
                setMovieToBeUpload({})
                await getMyMovies()
            } else {
                setSuccess(false);
                setLoading(false);
                toast.error('Fail to upload movie', {
                    position: toast.POSITION.TOP_CENTER
                })
            }

        } catch (error) {
            console.log(error);
            setSuccess(false);
            setLoading(false);
            toast.error('Fail to upload movie', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    const updateMovie = async () => {
        console.log(auth);
        if (!loading) {
            setSuccess(false);
            setLoading(true);
        }

        try {
            const res = await axios.patch(`${baseURL}/api/Movie`, movieToBeEdit)
            if (res.status === 200 || res.status === 204) {
                toast.success('Movie updated', {
                    position: toast.POSITION.TOP_CENTER
                })
                setOpenEdit(false)
                await getMyMovies()
            } else {
                toast.error('Fail to update movie', {
                    position: toast.POSITION.TOP_CENTER
                })
            }

        } catch (error) {
            toast.error('Fail to update movie', {
                position: toast.POSITION.TOP_CENTER
            })
        }
    }


    const onToBeUploadChange = e => {
        if (e.target.name !== 'MovieFile' && e.target.name !== 'ImageFile') {
            setMovieToBeUpload({
                ...movieToBeUpload,
                [e.target.name]: e.target.value
            })
        } else {
            setMovieToBeUpload({
                ...movieToBeUpload,
                [e.target.name]: e.target.files[0]
            })
            // preview the image
            if (e.target.name === 'ImageFile') {
                const img = document.querySelector('#img-preview')
                img.setAttribute('src', URL.createObjectURL(e.target.files[0]))
            }
        }
    }

    const onToBeEditChange = e => {
        setMovieToBeEdit({
            ...movieToBeEdit,
            [e.target.name]: e.target.value
        })
    }

    const navigate = useNavigate()

    const viewDetail = (movie) => {
        // to movie detail page
        navigate('/moviedetail', { state: movie })
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
                            <StyledTableRow key={row.movieID}>
                                <StyledTableCell component="th" scope="row" onClick={() => viewDetail(row)} sx={{
                                    cursor: 'pointer'
                                }}>
                                    {row.title}
                                </StyledTableCell>
                                <StyledTableCell align="center">{row.genre}</StyledTableCell>
                                <StyledTableCell align="center">{row.directors}</StyledTableCell>
                                <StyledTableCell align="center">{new Date(row.releaseTime * 1000 - new Date(row.releaseTime * 1000).getTimezoneOffset() * -60000).toLocaleDateString()}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button style={{ marginRight: '20px' }} variant="contained" endIcon={<SettingsOutlinedIcon />}
                                        onClick={() => editMovie(row)}
                                    >
                                        Edit
                                    </Button>
                                    <Button variant="outlined" startIcon={<DeleteIcon />}
                                        onClick={() => deleteMovie(row)}>
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
                        <span>Title: </span>  <input type="text" name="Title" value={movieToBeUpload.Title} onChange={onToBeUploadChange} />
                    </div>
                    <div className="form-control">
                        <span>Genre: </span>
                        <select name="Genre" value={movieToBeUpload.Genre} onChange={onToBeUploadChange}>
                            <option value="Action">Action</option>
                            <option value="Animation">Animation</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Crime">Crime</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Historical">Historical</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <span>Director&#40;s&#41;: </span>  <input type="text" name="Directors" value={movieToBeUpload.Directors} onChange={onToBeUploadChange} />
                    </div>
                    <div className="form-control">
                        <span>Release Time: </span>  <input type="date" name="ReleaseTime" value={movieToBeUpload.ReleaseTime} onChange={onToBeUploadChange} />
                    </div>
                    <div className="form-control">
                        <span>Overview: </span>  <textarea cols="30" rows="5" name="Overview" value={movieToBeUpload.Overview} onChange={onToBeUploadChange}></textarea>
                    </div>
                    <div className="form-control">
                        <span>Cover Image: </span>
                        <input type="file" accept="image/*" name="ImageFile" onChange={onToBeUploadChange} />
                    </div>
                    <div className="form-control" style={{ display: movieToBeUpload.ImageFile === '' ? 'none' : 'flex' }}>
                        <span>Image Preview: </span>
                        <img src="" id='img-preview' alt='cover page preview' />
                    </div>
                    <div className="form-control">
                        <span>Movie File: </span>  <input type="file" accept="video/*" name="MovieFile" onChange={onToBeUploadChange} />
                    </div>
                    <Box sx={{ m: 1, position: 'relative' }}>
                        <Button
                            variant="contained"
                            sx={buttonSx}
                            disabled={loading}
                            onClick={uploadMovie}
                        >
                            Upload
                        </Button>
                        {loading && (
                            <CircularProgress
                                size={24}
                                sx={{
                                    color: green[500],
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: '-12px',
                                    marginLeft: '-12px',
                                }}
                            />
                        )}
                    </Box>
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
                        <span>Title: </span>   <input type="text" name="Title" value={movieToBeEdit.Title} onChange={onToBeEditChange} required />
                    </div>
                    <div className="form-control">
                        <span>Genre: </span>
                        <select name="Genre" value={movieToBeEdit.Genre} onChange={onToBeEditChange} required>
                            <option value="Action">Action</option>
                            <option value="Animation">Animation</option>
                            <option value="Comedy">Comedy</option>
                            <option value="Crime">Crime</option>
                            <option value="Drama">Drama</option>
                            <option value="Horror">Horror</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="Historical">Historical</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <span>Director&#40;s&#41;: </span>   <input type="text" name="Directors" value={movieToBeEdit.Directors} onChange={onToBeEditChange} required />
                    </div>
                    <div className="form-control">
                        <span>Release Time: </span><input type="date" name="ReleaseTime" value={movieToBeEdit.ReleaseTime} onChange={onToBeEditChange} required />
                    </div>
                    <div className="form-control">
                        <span>Overview: </span>  <textarea name="Overview" cols="30" rows="5" value={movieToBeEdit.Overview} onChange={onToBeEditChange}></textarea>
                    </div>
                    <Button variant="contained" sx={{
                        display: 'block',
                        margin: '10px auto'
                    }} onClick={updateMovie}>Update</Button>
                </Box>
            </Modal>
            <ToastContainer />
        </div >
    )
}
