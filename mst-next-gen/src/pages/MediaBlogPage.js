
import React, {useState, useEffect} from "react";
import "../App.css";
import Button from '@mui/material/Button';
import BlogPost from "../components/BlogPost";

import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function MediaBlogPage(){
    const [blogPosts,setBlogPosts] = useState([]);
    const [media,setMedia] = useState([]);
    const [currentMediaID,setCurrentMediaID] = useState();
    const [currentMediaLink,setCurrentMediaLink] = useState("");
    

    const getBlogPosts = () => {
        fetch('BlogPosts.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            }
        )
        .then(function(data){
            return data.json();
          })
        .then(function(jsonData) {
            setBlogPosts(jsonData);
        });
    }

    const getMedia = () => {
        fetch('MediaLinks.json', {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                }
            }
        )
        .then(function(data){
            return data.json();
          })
        .then(function(jsonData) {
            // console.log(jsonData);
            setMedia(jsonData);
            setCurrentMediaLink(jsonData[0].path);
            setCurrentMediaID(0);
        })
        ;
    }

    const scrollRight = () => {
        let id = currentMediaID;
        
        if(id+1>=media.length){
            console.log('entering here');
            id=0;
        }
        else {
            console.log('else entering here');
            id=id+1;
        }

        setCurrentMediaLink(media[id].path);
        setCurrentMediaID(id);
    }
    const scrollLeft = () => {
        let id = currentMediaID;
        if(id-1<0){
            id = media.length-1;
        }
        else {
            id=id-1;
        }
        setCurrentMediaLink(media[id].path);
        setCurrentMediaID(id);
    }

    useEffect(()=>{
        getBlogPosts();
        getMedia();
        
    },[])
   

    return (
        <div>
            <div id="mediaBlogContainer">
                <div id="blogContainer">
                    <p className="mediaBlogTitle">Blog</p>
                    <div id="blogPosts">
                        {blogPosts.map(post => 
                            <BlogPost 
                                title={post.title}
                                description = {post.description}
                                date = {post.date}
                            /> 
                        )}
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
                                style={{fontSize: '60px'}}
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
                                style={{fontSize: '60px'}}
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
        </div>
    );
}

export default MediaBlogPage
