import React, { useContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import './moviedetail.css'
import axios from 'axios';
import { saveAs } from 'file-saver'
import { AuthContext } from '../../App';
import { toast, ToastContainer } from 'react-toastify';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';


const labels = {
    0.5: 1,
    1: 2,
    1.5: 3,
    2: 4,
    2.5: 5,
    3: 6,
    3.5: 7,
    4: 8,
    4.5: 9,
    5: 10,
};


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


export default function MovieDetail({ movies, setMovies }) {

    const [auth, setAuth] = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('authUser')) {
            setAuth(JSON.parse(localStorage.getItem('authUser')))
        } else {
            navigate('/')
        }
    }, [])

    const [openEdit, setOpenEdit] = useState(false)
    const handleClose = () => {
        setOpenEdit(false)
    }

    const [myRating, setMyRating] = useState('')

    const getLabelText = (value) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [value, setValue] = useState(2)
    const [hover, setHover] = useState(-1)

    const { state } = useLocation()

    const [movie, setMovie] = useState({ ...state })
    const [comments, setComments] = useState([])

    const [uploader, setUploader] = useState('')

    const getUploader = async () => {
        try {
            const result = await axios.get(`http://localhost:5240/api/Auth/user/${movie.uploaderID}`)
            setUploader(result.data)
        } catch (error) {
            toast.error('Fail to get uploader', {
                position: toast.POSITION.TOP_CENTER
            })
        }

    }

    const getMovieComments = async () => {
        if (movie !== null) {
            try {
                const result = await axios.get(`http://localhost:5240/api/Comment?movieID=${movie.movieID}`)
                setComments(result.data)
            } catch (error) {
                console.log(error);
                toast.error('Fail to load comments', {
                    position: toast.POSITION.TOP_CENTER
                })
            }
        }
    }

    const getMyRating = async () => {
        if (auth.id !== undefined) {
            try {
                const result = await axios.get(`http://localhost:5240/api/Rating?movieID=${movie.movieID}&userID=${auth.id}`)
                if (result.data !== '') {
                    setMyRating(result.data.myRating)
                    setValue(result.data.myRating / 2)
                }

            } catch (error) {
                console.log(error);
            }
        }
    }


    useEffect(() => {
        getUploader()
        getMovieComments()
        getMyRating()
    }, [])

    const downloadMovie = async () => {
        const filename = new URL(movie.s3FilePath).pathname.split('/').pop();
        const result = await axios({
            method: 'get',
            responseType: 'arraybuffer',
            url: `http://localhost:5240/api/Movie/download?s3URL=${filename}`
        })

        const blob = new Blob([result.data], {
            type: 'application/octet-stream'
        })
        saveAs(blob, filename)
    }

    const [content, setContent] = useState('')

    const submitComment = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5240/api/Comment', {
                movieID: movie.movieID,
                userID: auth.id,
                createDate: Date.now(),
                content: content
            })
            toast.success('Comment successfully', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            getMovieComments()
            setContent('')
        } catch (error) {
            console.log(error);
            toast.error('Fail to comment', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

    }

    const [commentToBeEdit, setCommentToBeEdit] = useState({})

    const editComment = (comment) => {
        setCommentToBeEdit(comment)
        setOpenEdit(true)
    }

    const updateComment = async () => {
        setOpenEdit(false)
        try {
            await axios.put('http://localhost:5240/api/Comment', {
                commentID: commentToBeEdit.commentID,
                userID: commentToBeEdit.userID,
                content: commentToBeEdit.content
            })
            toast.success('Comment updated!', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            getMovieComments()
        } catch (error) {
            toast.error('Fail to updated comment', {
                position: toast.POSITION.BOTTOM_CENTER
            })
        }

        setCommentToBeEdit({})
    }

    const addRating = async (rating) => {
        // actual rating is rating *2
        rating *= 2
        try {
            await axios.post(`http://localhost:5240/api/Rating`, {
                movieID: movie.movieID,
                userID: auth.id,
                myRating: rating
            })

            setMyRating(rating)

            toast.success('Movie rated successfully!', {
                position: toast.POSITION.BOTTOM_CENTER
            })
            // update the average rating
            const result = await axios.get(`http://localhost:5240/api/Movie/movieID/${movie.movieID}`)
            setMovie(result.data)
            const res = await axios.get('http://localhost:5240/api/Movie')
            setMovies(res.data)
        } catch (error) {
            console.log(error);
        }

    }


    return (
        <div className="detail-container">
            <div className="movie-detail">
                <img src={movie.s3ImgPath} alt="" />
                <ul>
                    <li className="data">
                        <p className='title'>{movie.title}</p>
                    </li>
                    <li className="data">
                        <span>Rate:</span>
                        <span>{movie.avgRating === 0 ? 'No rating yet' : movie.avgRating}</span>
                    </li>
                    <li className='data'>
                        <span>
                            Genre:
                        </span>
                        <span>{movie.genre}</span>
                    </li>
                    <li className='data'>
                        <span>Director&#40;s&#41;:</span>
                        <span>{movie.directors}</span>
                    </li>
                    <li className="data">
                        <span>
                            Release Time:</span>
                        <span>{new Date(movie.releaseTime * 1000).toLocaleDateString()}</span>
                    </li>
                    <li className="data">
                        <span>
                            Uploaded by:</span>
                        <span>{uploader.firstName} {uploader.lastName}</span>
                    </li>
                    <li className="data">
                        <span>Overview: </span>
                        <span className='data-overview'>{movie.overview}</span>
                    </li>
                    <li>
                        <button className='download' onClick={downloadMovie}>Download</button>
                        {myRating === '' ? <span className='my-rating'>Rate the movie</span> : <span className='my-rating'>Already Rated</span>}
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 300,
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >

                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                readOnly={myRating === '' ? false : true}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
                                    addRating(newValue);
                                }}
                                onChangeActive={(event, newHover) => {
                                    setHover(newHover);
                                }}
                                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            />
                            {value !== null && (
                                <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                            )}
                        </Box>
                    </li>
                </ul>
            </div>
            <h3 className='header-comment'>Leave a comment</h3>
            <form className='form-comment' onSubmit={submitComment}>
                <textarea name="" id="" cols="30" rows="5" placeholder="Comment on this movie" value={content} onChange={e => setContent(e.target.value)} required></textarea>
                <button type="submit" className='submit'>Submit</button>
            </form>
            <div className="comments">
                <ul>
                    {comments.map(comment => (
                        <li className='comment' key={comment.commentID}>
                            <div>
                                <h4>{comment.fullName}</h4>
                                <span>{new Date(comment.createDate).toLocaleString()}</span>
                            </div>
                            <p className="content">{comment.content}</p>
                            {/* if written within 24 hrs can modify */}
                            {Date.now() - comment.createDate >= 86400000 ? '' :
                                comment.userID === auth.id &&
                                <button className="edit" onClick={() => editComment(comment)}>Edit</button>
                            }
                        </li>
                    ))}

                </ul>
            </div>
            <Modal
                open={openEdit}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h2>Edit Comment</h2>
                    <div className="form-control">
                        <span>Content: </span>  <textarea name="content" cols="30" rows="5" value={commentToBeEdit.content}
                            onChange={e => setCommentToBeEdit({
                                ...commentToBeEdit,
                                content: e.target.value
                            })}></textarea>
                    </div>
                    <Button variant="contained" sx={{
                        display: 'block',
                        margin: '10px auto'
                    }} onClick={updateComment}>Update</Button>
                </Box>
            </Modal>
            <ToastContainer />
        </div>
    )
}
