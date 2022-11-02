import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Box from '@mui/material/Box';
import './moviedetail.css'

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

export default function MovieDetail() {

    const getLabelText = (value) => {
        return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
    }

    const [value, setValue] = useState(2)
    const [hover, setHover] = useState(-1)

    return (
        <div className="detail-container">
            <div className="movie-detail">
                <img src="" alt="" />
                <ul>
                    <li className="data">
                        <span className='title'>Title</span>
                    </li>
                    <li className="data">
                        <span>Rate:</span>
                        <span>9.3</span>
                    </li>
                    <li className='data'>
                        <span>
                            Genre:
                        </span>
                        <span>Fiction</span>
                    </li>
                    <li className='data'>
                        <span>Director&#40; s&#41;:</span>
                        <span>Jay</span>
                    </li>
                    <li className="data">
                        <span>
                            Release Time:</span>
                        <span>Oct 12 2022</span>
                    </li>
                    <li className="data">
                        <span>
                            Uploaded by:</span>
                        <span>Zhen</span>
                    </li>
                    <li className="data">
                        <span>Overview:

                        </span>
                        <span>Lorem ipsum dolor, sit assumenda est s placeat unde accusantium culpa.</span>
                    </li>
                    <li>
                        <button className='download'>Download</button>
                        <Box
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                left: 150,
                                width: 200,
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <Rating
                                name="hover-feedback"
                                value={value}
                                precision={0.5}
                                getLabelText={getLabelText}
                                onChange={(event, newValue) => {
                                    setValue(newValue);
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
            <form className='form-comment'>
                <textarea name="" id="" cols="30" rows="5" placeholder="Comment on this movie"></textarea>
                <button type="submit" className='submit'>Submit</button>
            </form>
            <div className="comments">
                <ul>
                    <li className='comment'>
                        <div>
                            <h4>Username</h4>
                            <span>Time</span>
                        </div>
                        <p className="content">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quo.</p>
                        {/* if written within 24 hrs can modify */}
                        <button className="edit">Edit</button>

                    </li>
                </ul>

            </div>
        </div>
    )
}
