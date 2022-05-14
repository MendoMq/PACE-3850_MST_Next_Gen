import React from "react";
import "../App.css";
import MediaAndBlog from "../MediaAndBlog.png"

function MediaBlogPage(){
    return (
        <div>
            <div id="mediaBlogContainer">
                <div id="blogContainer">
                    <p className="mediaBlogTitle">Blog</p>
                    <div id="blogPosts"></div>
                </div>
                <div id="mediaContainer">
                    <p className="mediaBlogTitle">Media</p>
                    <div id="mediaTilesContainer">
                        <p class="mediaArrows">&#8249;</p>
                        <iframe id="mediaTiles"
                            src="https://www.youtube.com/embed/0v146jfbwdg">
                        </iframe>
                        <p class="mediaArrows">&#8250;</p>
                    </div>
                    <div id="mediaLivestreams">
                    <div id="recentLivestreams">
                        <p className="livestreamTitle">Recent Livestreams</p>
                        <p className="livestreamListing"><a href="">December 2021</a></p>
                    </div>
                    <div id="upcomingLivestreams">
                        <p className="livestreamTitle">Upcoming Livestreams</p>
                        <p className="livestreamListing"><a href="">June 2022</a></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MediaBlogPage
