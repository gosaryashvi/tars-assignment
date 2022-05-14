import axios from 'axios';
import React, { useEffect, useState } from 'react';
import envUrls from '../../utils/config';
import Navbar from '../navbar/navbar';
import Dialog from '@mui/material/Dialog';
import './imagegallery.css';

function ImageGallery() {
    const [darkMode, setDarkMode] = useState(localStorage.getItem('darkmode') ? localStorage.getItem('darkmode') == 'true' : false);
    const [page, setPage] = useState(1);
    const [imageData, setImageData] = useState([]);
    const [search, setSearch] = useState('');
    const [open, setOpen] = React.useState(false);
    const [singleImageData, setSingleImageData] = useState('');

    const handleClickOpen = (id) => {
        axios.get(envUrls.baseUrl + '/photos/' + id, {
            headers: {
                'Authorization': 'Client-ID ' + envUrls.accessKey
            }
        }).then((res) => {
            setSingleImageData(res.data)
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        setInterval(() => {
            setDarkMode(localStorage.getItem('darkmode') ? localStorage.getItem('darkmode') == 'true' : false);
        }, 100)
    })

    useEffect(() => {
        axios.get(envUrls.baseUrl + '/photos?page=1', {
            headers: {
                'Authorization': 'Client-ID ' + envUrls.accessKey
            }
        }).then((res) => {
            setImageData(res.data)
            console.log(res.data)
        }).catch((error) => {
            console.log(error)
        })
    }, [])

    const loadMoreImages = () => {
        if (search.length > 0) {
            axios.get(envUrls.baseUrl + '/search/photos?&page=' + page + 1 + '&query=' + search, {
                headers: {
                    'Authorization': 'Client-ID ' + envUrls.accessKey
                }
            }).then((res) => {
                res.data.results.map((elm) => {
                    setImageData(oldData => [...oldData, elm])
                })
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            axios.get(envUrls.baseUrl + '/photos?page=' + page + 1, {
                headers: {
                    'Authorization': 'Client-ID ' + envUrls.accessKey
                }
            }).then((res) => {
                res.data.map((elm) => {
                    setImageData(oldData => [...oldData, elm])
                })
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }

        setPage(page + 1);
    }

    const handleSearch = (value) => {
        setSearch(value);
        console.log(value);
        if (value.length !== 0) {
            axios.get(envUrls.baseUrl + '/search/photos?&page=1&query=' + value, {
                headers: {
                    'Authorization': 'Client-ID ' + envUrls.accessKey
                }
            }).then((res) => {
                setImageData(res.data.results)
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            axios.get(envUrls.baseUrl + '/photos?page=1', {
                headers: {
                    'Authorization': 'Client-ID ' + envUrls.accessKey
                }
            }).then((res) => {
                setImageData(res.data)
                console.log(res.data)
            }).catch((error) => {
                console.log(error)
            })
        }
    }

    return (
        <div>
            <Navbar searchItem={handleSearch} />
            <div className='home__top'>
                <h1 className='home__top__heading'>Download High Quality Images by Creators</h1>
                <p className='home__top__text'>Over 2.4 million+ stock Images by our talented community</p>
                <input type="text" placeholder='Search high resolution Images, categories, wallpapers' onChange={(e) => { handleSearch(e.target.value) }} className='home__top__search' />
            </div>
            <div className={darkMode ? 'imagegallery__body darkmode' : 'imagegallery__body'}>
                <div className='row'>
                    {
                        imageData.length > 0 && imageData.map((elm) => {
                            return (
                                <div className='col-4 text-center mt-5 imagegallery__cards'>
                                    <img src={elm.urls.small} height="300px" width="350px" className='imagegallery__cards__image' onClick={() => { handleClickOpen(elm.id) }} />
                                    <div className={darkMode ? 'imagegallery__cards__infodiv darkmodehome' : 'imagegallery__cards__infodiv'} onClick={() => { handleClickOpen(elm.id) }}>
                                        <img src={elm.user.profile_image.medium} className='imagegallery__cards__userimage' />
                                        <div className='imagegallery__cards__userdata'>
                                            <span className={darkMode ? 'imagegallery__cards__name darkmodehome' : 'imagegallery__cards__name'}>{elm.user.name}</span><br />
                                            <span className={darkMode ? 'imagegallery__cards__username darkmodehome' : 'imagegallery__cards__username'}>@{elm.user.username}</span>
                                        </div>
                                        <p className={darkMode ? 'imagegallery__cards__likes darkmodehome' : 'imagegallery__cards__likes'}><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {elm.likes} K</p>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <button className={darkMode ? 'btn btn-outline-light mt-5 text-white' : 'btn btn-outline-dark mt-5'} onClick={loadMoreImages}>Load More</button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                    {
                        singleImageData ?
                            <div className='dialog__body'>
                                <img src={singleImageData.urls.small} width="100%" height="400px" style={{ objectFit: 'cover' }} />
                                <div className='imagegallery__cards__infodiv' style={{ width: '100%' }}>
                                    <img src={singleImageData.user.profile_image.medium} className='imagegallery__cards__userimage' />
                                    <div className='imagegallery__cards__userdata'>
                                        <span className='imagegallery__cards__name'>{singleImageData.user.name}</span><br />
                                        <span className='imagegallery__cards__username'>@{singleImageData.user.username}</span>
                                    </div>
                                    <p className='imagegallery__cards__likes'><i class="fa fa-thumbs-o-up" aria-hidden="true"></i> {singleImageData.likes} K</p>
                                    <p className='imagegallery__cards__likes'>{singleImageData.downloads} Downloads</p>
                                    <div style={{clear:'both', padding:'20px 0px'}}>
                                        {
                                            singleImageData.user.social?.instagram_username ? 
                                            <div style={{margin:'20px'}}>
                                                <i className='fa fa-instagram'></i> {singleImageData.user.social.instagram_username}
                                            </div> : ""
                                        }
                                        {
                                            singleImageData.user.social?.twitter_username ? 
                                            <div style={{margin:'20px'}}>
                                                <i className='fa fa-twitter'></i> {singleImageData.user.social.twitter_username}
                                            </div> : ""
                                        }
                                        {
                                            singleImageData.user.social?.portfolio_url ? 
                                            <div style={{margin:'20px'}}>
                                                Portfolio: {singleImageData.user.social.portfolio_url}
                                            </div> : ""
                                        }
                                    </div>
                                    {
                                        singleImageData.tags.length > 0 ?
                                            <div style={{ clear: 'both', marginLeft:'20px', marginBottom:'20px' }}>
                                                <br /><p className='dialog__relatedtag'>Related Tags</p>
                                                {
                                                    singleImageData.tags.map((elm)=>{
                                                        return(
                                                            <p className='dialog__relatedtags__ui' >{elm.title}</p>
                                                        )
                                                    })
                                                }<br/>
                                            </div> : ""
                                    }
                                </div>
                            </div> : ""
                    }
                </Dialog>
            </div>
        </div>
    );
}

export default ImageGallery;
