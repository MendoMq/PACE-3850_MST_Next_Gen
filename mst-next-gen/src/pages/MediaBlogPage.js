import React from "react";
import "../App.css";
import MediaAndBlog from "../MediaAndBlog.png"

function MediaBlogPage(){
    return (
        <div>
            <div id="mediaBlogContainer">
                <div id="blogContainer">
                    <p class="mediaBlogTitle">Blog</p>
                    <div id="blogPosts"></div>
                </div>
                <div id="mediaContainer">
                    <p class="mediaBlogTitle">Media</p>
                    <div id="mediaTiles"></div>
                    <div id="mediaLivestreams">
                    <div id="recentLivestreams">
                        <p class="livestreamTitle">Recent Livestreams</p>
                        <p class="livestreamListing"><a href="">December 2021</a></p>
                    </div>
                    <div id="upcomingLivestreams">
                        <p class="livestreamTitle">Upcoming Livestreams</p>
                        <p class="livestreamListing"><a href="">June 2022</a></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MediaBlogPage