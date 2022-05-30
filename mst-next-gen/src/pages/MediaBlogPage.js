import React, { useState, useEffect } from "react";
import "../App.css";
import Button from '@mui/material/Button';
import BlogPost from "../components/BlogPost";

import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../utils/axios'
import LoadingBox from "../components/LoadingBox";
import BlogAForumDialog from "../components/BlogAForumDialog";

const theme = createTheme({
    status: {
        danger: '#f44336',
    },
    palette: {
        primary: {
            main: '#e02b20',
        },

    },
});

function MediaBlogPage() {
    const [blogPosts, setBlogPosts] = useState([]);
    const [media, setMedia] = useState([]);
    const [currentMediaID, setCurrentMediaID] = useState();
    const [currentMediaLink, setCurrentMediaLink] = useState("");
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({})
    const [visible, setVisible] = useState(false)
    const [detail, setDetail] = useState({})
    const [type, setType] = useState("")

    const getBlogPosts = () => {
        setLoading(true)
        axios.get("/blog/list")
            .then(res => {
                setBlogPosts(res);
            })
            .finally(() => {
                setLoading(false)
            })
        // fetch('BlogPosts.json', {
        //     headers : { 
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //         }
        //     }
        // )
        // .then(function(data){
        //     return data.json();
        //   })
        // .then(function(jsonData) {
        //     setBlogPosts(jsonData);
        // });
    }

    const getMedia = () => {
        axios.get("media/list")
            .then(res => {
                setMedia(res);
                setCurrentMediaLink(res[0].path);
                setCurrentMediaID(0);
            })
            // fetch('MediaLinks.json', {
            //     headers : { 
            //         'Content-Type': 'application/json',
            //         'Accept': 'application/json'
            //         }
            //     }
            // )
            // .then(function(data){
            //     return data.json();
            //   })
            // .then(function(jsonData) {
            //     // console.log(jsonData);
            //     setMedia(jsonData);
            //     setCurrentMediaLink(jsonData[0].path);
            //     setCurrentMediaID(0);
            // })
            ;
    }

    const scrollRight = () => {
        let id = currentMediaID;

        if (id + 1 >= media.length) {
            console.log('entering here');
            id = 0;
        }
        else {
            console.log('else entering here');
            id = id + 1;
        }

        setCurrentMediaLink(media[id].path);
        setCurrentMediaID(id);
    }
    const scrollLeft = () => {
        let id = currentMediaID;
        if (id - 1 < 0) {
            id = media.length - 1;
        }
        else {
            id = id - 1;
        }
        setCurrentMediaLink(media[id].path);
        setCurrentMediaID(id);
    }

    const handleSubmit = (type, data) => {
        const params = {
            ...data,
            userId: user._id
        }
        console.log(type, params)
        if (!type) return;
        let promise = null
        if (type === "add") promise = axios.put("/blog/add", params)
        if (type === "edit") promise = axios.post("/blog/edit", params)
        if (type === "delete") promise = axios.delete(`/blog/delete/${params._id}`)
        promise.then(res => {
            handleClose()
            getBlogPosts();

        })

    }
    const handleOpen = (key, row) => {
        setType(key)
        setDetail(row || {})
        setVisible(true)
    }
    const handleClose = () => {
        setType("")
        setDetail({})
        setVisible(false)
    }
    useEffect(() => {
        getBlogPosts();
        getMedia();
        try {
            setUser(JSON.parse(localStorage.getItem("user") || "{}"))
        } catch {

        }
    }, [])


    return (
        <div>
            <div id="mediaBlogContainer">
                <div id="blogContainer">
                    <div className={user?.role === "admin" ? "HANDLE_flex mediaBlogTitle" : "mediaBlogTitle"}>
                        <span>Blog</span>
                        {user?.role === "admin" && <Button variant="contained" color="primary" className="Blog_bt" onClick={() => handleOpen('add')}>Add</Button>}
                    </div>
                    <div id="blogPosts">
                        <LoadingBox loading={loading} empty={!blogPosts.length}>
                            {blogPosts.map(post =>
                                <BlogPost
                                    key={post.createTime}
                                    title={post.title}
                                    description={post.content}
                                    date={post.createTime}
                                    user={user}
                                    detail={post}
                                    handleOpen={handleOpen}
                                />
                            )}
                        </LoadingBox>
                    </div>

                </div>
                <div id="mediaContainer">
                    <p className="mediaBlogTitle">Media</p>
                    <div id="mediaTilesContainer">
                        <ThemeProvider theme={theme}>
                            <Button
                                variant="text"
                                color="primary"
                                className="mediaArrows"
                                onClick={() => {
                                    scrollLeft();
                                }}
                                style={{ fontSize: '60px' }}
                                disableRipple
                            >&#8249;</Button>
                        </ThemeProvider>

                        <iframe
                            className="mediaTiles"
                            src={currentMediaLink}
                        />

                        <ThemeProvider theme={theme}>
                            <Button
                                variant="text"
                                color="primary"
                                className="mediaArrows"
                                onClick={() => {
                                    scrollRight();
                                }}
                                style={{ fontSize: '60px' }}
                                disableRipple
                            >&#8250;</Button>
                        </ThemeProvider>
                    </div>
                    <div id="mediaLivestreams">
                        <div id="recentLivestreams">
                            <p className="livestreamTitle">Recent Livestreams</p>
                            <p className="livestreamListing"><a href="#/mediablog">December 2021</a></p>
                        </div>
                        <div id="upcomingLivestreams">
                            <p className="livestreamTitle">Upcoming Livestreams</p>
                            <p className="livestreamListing"><a href="#/mediablog">June 2022</a></p>
                        </div>
                    </div>
                </div>
            </div>

            <BlogAForumDialog detail={detail} type={type} visible={visible} submit={handleSubmit} setVisible={handleClose} />
        </div>
    );
}

export default MediaBlogPage
