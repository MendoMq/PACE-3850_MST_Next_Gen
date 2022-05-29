import React, { useEffect, useState } from "react";
import "../App.css";
import { useLocation,useNavigate } from 'react-router-dom';
import { Button, Grid, Input, List, ListItem, TextField } from "@mui/material";
import ReplyBox from "../components/ReplyBox";
import ReplyDialog from "../components/ReplyDialog";
import axios from '../utils/axios'
import moment from 'moment'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
function ForumDetail(){
    const rlocation = useLocation();
    const rnavigate = useNavigate();
    const [detail,setDetail] = useState({});
    const [reply,setReply] = useState("")
    const [user,setUser] = useState({})
    const [visible,setVisible] = useState(false);
    const [dialogReply,setDialogReply] = useState("")
    const [dialogDetail,setDialogDetail] = useState({})

    const handleReply = ()=>{
        console.log("reply")
        // setComments(
        //     comments.concat(
        //         {avatar:`https://mui.com/static/images/avatar/1.jpg`,createTime:"20/04/22",content:reply,author:`Test001`,}
        //     )
        // )
        const params = {
            content:reply,
            userId:user._id,
            fid:detail._id,
            replyId:detail._id,
            replyUserId:detail.user?._id
        }
        postReply(params)
        .then(res=>{
            getDetail()
            setReply("")
        })
    }

    const handleComment = (item,parent)=>{
        setVisible(true)
        setDialogDetail(Object.assign({},
            {...item,author:detail,replyId:parent?._id}
        ))
        
        
    }
    const postReply = (data)=>{
        return axios.put("/comment/reply",data)
    }

    const handleDialogReply = ()=>{
        const params = {
            content:dialogReply,
            userId:user._id,
            fid:detail._id,
            replyId:dialogDetail.replyId||dialogDetail._id,
            replyUserId:dialogDetail.userId
        }
        postReply(params)
        .then(res=>{
            handleCloseDialog()
            getDetail()
        })
    }
    const handleCloseDialog = ()=>{
        setDialogReply("")
        setDialogDetail({})
        setVisible(false)
    }
    const getDetail = ()=>{
        if(!rlocation.state.id){
            return rnavigate("/forum")
        }
        axios.get(`/forum/detail/${rlocation.state.id}`)
        .then(res=>{
            setDetail(res)
        })
    }
    useEffect(()=>{
        getDetail()
        try{
            setUser(JSON.parse(localStorage.getItem("user")||"{}"))
        }
        catch{

        }
    },[])

    return (
        <div className="no_border_tb self_container self_detail">
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <div className="detail_title self_red_title">{detail.title}</div>
                    <div className="detail_content">
                        {detail.content}
                    </div>
                    <div className="detail_createTime">
                        {moment(detail.createTime).format("DD/MM/YYYY")}
                        
                    </div>
                    <div className="border_tb detail_cr">
                        <div><span>{detail.comments}</span>Comments</div>
                        <div><span>{detail.likes}</span>Likes</div>
                    </div>
                    <ReplyBox user={user} reply={reply} setReply={setReply} handleReply={handleReply} className="border_tb"/>
                    <List>
                        {
                            detail?.commentList?.map((item,index)=>(
                                <ListItem key={index} alignItems="flex-start" className="border_bottom">
                                    {/* <img src={item.avatar} className="detail_avatar" /> */}
                                    {item.user?.avatar&&<img src={item.user?.avatar} className="detail_avatar"/> }
                                    {!item.user?.avatar&&<Avatar className="detail_avatar" sx={{ bgcolor: deepOrange[500] }}>{item.user?.username?.[0]}</Avatar>}
                                    <div style={{flex:1}}>
                                        <div>
                                            <div>{item.user?.username}</div>
                                            <div>Replying to {detail.user?.username}</div>
                                            <div>{item.content}</div>
                                            <div className="detail_handle_reply" onClick={()=>handleComment(item)}>
                                                <svg t="1652361125313" className="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3794" width="20" height="20"><path d="M827.713294 1024c-26.319481-17.956282-49.933221-33.944751-73.546961-49.933221-48.211386-33.206822-95.930819-67.151573-144.880135-99.128513-9.347105-6.149411-23.121787-8.3632-34.928657-8.609176-131.597406-0.737929-263.194811 0-394.792217-0.737929-89.781408-0.491953-166.03411-68.135479-178.578909-156.687005-0.983906-7.133317-0.737929-14.758588-0.737929-22.137881 0-169.231804 0.491953-338.709584-0.245976-507.941388-0.491953-91.01129 71.087197-164.066298 157.178957-176.119145 12.544799-1.721835 25.335575-2.459765 37.880375-2.459765 216.951237 0 433.656498-0.491953 650.607735 0.245976 88.797502 0.245976 166.280086 70.349267 177.349027 158.40884 0.983906 7.379294 0.491953 14.758588 0.491953 22.137881 0 168.493875-0.737929 336.987749 0.245976 505.481624 0.737929 91.995196-71.087197 165.296181-157.178957 177.103051-12.544799 1.721835-25.089599 2.459765-39.110257 3.689647C827.713294 917.73817 827.713294 969.14725 827.713294 1024zM354.700563 433.656498c0.245976-43.291857-35.174634-79.20442-78.466491-79.450396-42.307951-0.245976-78.220514 35.174634-78.712467 77.974538-0.737929 42.799904 35.42061 79.450396 78.466491 79.450396C318.542024 511.877012 354.454587 476.210425 354.700563 433.656498zM590.837964 433.902474c0.245976-43.291857-34.928657-79.20442-78.220514-79.696373-42.307951-0.245976-78.220514 34.928657-78.958443 77.974538-0.737929 42.799904 35.174634 79.450396 78.466491 79.696373C554.433448 511.877012 590.591988 476.210425 590.837964 433.902474zM826.975365 432.918568c0-43.291857-36.15854-79.20442-78.958443-78.712467-42.553927 0.245976-77.974538 36.15854-77.974538 78.712467 0 43.04588 36.404516 79.20442 79.20442 78.712467C791.800731 511.139082 826.975365 475.718472 826.975365 432.918568z" p-id="3795"></path></svg>
                                            </div>
                                        </div>
                                        {
                                            (item.replys&&item.replys.length)?(
                                                <List className="detail_replysbox">
                                                    {
                                                        item.replys.map((rpitem,rpindex)=>(
                                                            <ListItem key={rpindex} alignItems="flex-start" className="detail_replys">
                                                                {/* <img src={rpitem.user.avatar} className="detail_avatar"/> */}
                                                                {rpitem.user?.avatar&&<img src={rpitem.user?.avatar} className="detail_avatar"/> }
                                                                {!rpitem.user?.avatar&&<Avatar className="detail_avatar" sx={{ bgcolor: deepOrange[500] }}>{rpitem.user?.username?.[0]}</Avatar>}
                                                                <div>
                                                                    <div>
                                                                        <div>{rpitem.user?.username}</div>
                                                                        <div>Replying to {rpitem.replyUser?.username}</div>
                                                                        <div>{rpitem.content}</div>
                                                                        <div className="detail_handle_reply" onClick={()=>handleComment(rpitem,item)}>
                                                                            <svg t="1652361125313" className="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3794" width="20" height="20"><path d="M827.713294 1024c-26.319481-17.956282-49.933221-33.944751-73.546961-49.933221-48.211386-33.206822-95.930819-67.151573-144.880135-99.128513-9.347105-6.149411-23.121787-8.3632-34.928657-8.609176-131.597406-0.737929-263.194811 0-394.792217-0.737929-89.781408-0.491953-166.03411-68.135479-178.578909-156.687005-0.983906-7.133317-0.737929-14.758588-0.737929-22.137881 0-169.231804 0.491953-338.709584-0.245976-507.941388-0.491953-91.01129 71.087197-164.066298 157.178957-176.119145 12.544799-1.721835 25.335575-2.459765 37.880375-2.459765 216.951237 0 433.656498-0.491953 650.607735 0.245976 88.797502 0.245976 166.280086 70.349267 177.349027 158.40884 0.983906 7.379294 0.491953 14.758588 0.491953 22.137881 0 168.493875-0.737929 336.987749 0.245976 505.481624 0.737929 91.995196-71.087197 165.296181-157.178957 177.103051-12.544799 1.721835-25.089599 2.459765-39.110257 3.689647C827.713294 917.73817 827.713294 969.14725 827.713294 1024zM354.700563 433.656498c0.245976-43.291857-35.174634-79.20442-78.466491-79.450396-42.307951-0.245976-78.220514 35.174634-78.712467 77.974538-0.737929 42.799904 35.42061 79.450396 78.466491 79.450396C318.542024 511.877012 354.454587 476.210425 354.700563 433.656498zM590.837964 433.902474c0.245976-43.291857-34.928657-79.20442-78.220514-79.696373-42.307951-0.245976-78.220514 34.928657-78.958443 77.974538-0.737929 42.799904 35.174634 79.450396 78.466491 79.696373C554.433448 511.877012 590.591988 476.210425 590.837964 433.902474zM826.975365 432.918568c0-43.291857-36.15854-79.20442-78.958443-78.712467-42.553927 0.245976-77.974538 36.15854-77.974538 78.712467 0 43.04588 36.404516 79.20442 79.20442 78.712467C791.800731 511.139082 826.975365 475.718472 826.975365 432.918568z" p-id="3795"></path></svg>
                                                                        </div>
                                                                    </div>
                                                                    </div>
                                                            </ListItem>
                                                        ))
                                                    }
                                                </List>
                                            ):(null)
                                        }
                                    </div>
                                </ListItem>
                            ))
                        }
                    </List>
                </Grid>
            </Grid>

            <ReplyDialog user={user}  detail={dialogDetail}  visible={visible} setVisible={handleCloseDialog} reply={dialogReply} setReply={setDialogReply} handleReply={handleDialogReply}/>

        </div>
    );
}

export default ForumDetail