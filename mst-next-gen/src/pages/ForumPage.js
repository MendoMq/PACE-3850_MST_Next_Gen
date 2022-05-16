import { Grid, Icon, List, ListItem, Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import "../App.css";
import ReplyDialog from "../components/ReplyDialog";
import Forum from "../Media/Forum.png"

function ForumPage(){
    const navigate = useNavigate();
    const [listSource,setListSource] = useState([])
    const [renderList,setRenderList] = useState([])
    const [moreList,setMoreList] = useState([])
    const [page,setPage] = useState(0)
    const pageSize = 5

    const [visible,setVisible] = useState(false);//dialog
    const [reply,setReply] = useState("")
    const [detail,setDetail] = useState({})

    const handleReply = ()=>{
        handleCloseDialog()
    }
    const handleCloseDialog = ()=>{
        setVisible(false)
        setReply("")
        setDetail({})
    }
    const handleChangePage = (event,value)=>{
        setPage(value)
    }
    const getList=()=>{
        let data = []
        for(let i=0;i<6;i++){
            data.push(
                {avatar:`https://mui.com/static/images/avatar/${i+1}.jpg`,author:"Anita",title:"Forum Post Title #"+(i+1),content:"Forum Summarised Content",likes:23,comments:12,createTime:"20/04/22"}
            )
        }
        setListSource(data)
        setMoreList(
            [
                {title:"Forum Post #2"},
                {title:"Forum Post #3"},
            ]
        )
        setPage(1)
    }
    const handleLike = (e,item)=>{
        e.stopPropagation()
        console.log("handleLike",item)
    }
    const handleComment = (e,item)=>{
        e.stopPropagation()
        console.log("handleComment",item)
        setVisible(true)
        setDetail(Object.assign({},item))
        
    }
    const handleToDetail = (item)=>{
        console.log("handleToDetail",item)
        navigate("/forumDetail",{state:{title:item.title}})
    }
    useEffect(()=>{
        getList()
    },[])
    useEffect(()=>{
        let data = listSource.slice(pageSize*(page-1),pageSize*page)
        setRenderList(data)
        document.querySelector('html').scrollTop = 0

    },[page])

    return (
        <div className="self_container">
            <Grid container spacing={0}>
                <Grid item xs={9.5}  className="self_list_box">
                    <List style={{padding:0,flex:1}}>
                        {
                            renderList.map((item,index)=>(
                                <ListItem className="self_list_item" key={index} onClick={()=>handleToDetail(item)}>
                                    <div className="self_list_item_l">
                                        <img src={item.avatar}/>
                                        <span>Posted by: {item.author}</span>
                                        <span>{item.createTime}</span>
                                    </div>
                                    <div className="self_list_item_r">
                                        <div>
                                            <div className="self_list_item_title">
                                                {item.title}
                                            </div>
                                            <div className="self_list_item_content">
                                                {item.content}
                                            </div>
                                        </div>
                                        <div className="self_list_item_handle">
                                            <div onClick={(e)=>handleLike(e,item)}>
                                                <svg t="1652360980939" class="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2622" width="24" height="24"><path d="M478.277632 264.88832C659.364864-28.16 1028.096 88.004608 1028.096 404.086784c0 167.119872-96.451584 299.108352-253.950976 398.988288-53.8112 34.1248-111.1808 62.082048-168.53504 84.415488-20.087808 7.82336-38.781952 14.39744-55.63392 19.781632-10.307584 3.293184-17.855488 5.49376-22.193152 6.651904a45.341696 45.341696 0 0 1-24.087552-0.196608c-4.31104-1.227776-11.83232-3.54816-22.112256-7.001088-16.818176-5.648384-35.478528-12.50304-55.53152-20.606976-57.255936-23.138304-114.526208-51.75296-168.23808-86.290432C100.463616 698.655744 4.096 567.63392 4.096 404.086784 4.096 88.11008 368.360448-26.631168 553.612288 264.40704l-75.334656 0.48128z" p-id="2623"></path></svg>
                                                <span className={"self_list_item_num"}>{item.likes}</span>
                                            </div>
                                            <div onClick={(e)=>handleComment(e,item)}>
                                                <svg t="1652361125313" class="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3794" width="24" height="24"><path d="M827.713294 1024c-26.319481-17.956282-49.933221-33.944751-73.546961-49.933221-48.211386-33.206822-95.930819-67.151573-144.880135-99.128513-9.347105-6.149411-23.121787-8.3632-34.928657-8.609176-131.597406-0.737929-263.194811 0-394.792217-0.737929-89.781408-0.491953-166.03411-68.135479-178.578909-156.687005-0.983906-7.133317-0.737929-14.758588-0.737929-22.137881 0-169.231804 0.491953-338.709584-0.245976-507.941388-0.491953-91.01129 71.087197-164.066298 157.178957-176.119145 12.544799-1.721835 25.335575-2.459765 37.880375-2.459765 216.951237 0 433.656498-0.491953 650.607735 0.245976 88.797502 0.245976 166.280086 70.349267 177.349027 158.40884 0.983906 7.379294 0.491953 14.758588 0.491953 22.137881 0 168.493875-0.737929 336.987749 0.245976 505.481624 0.737929 91.995196-71.087197 165.296181-157.178957 177.103051-12.544799 1.721835-25.089599 2.459765-39.110257 3.689647C827.713294 917.73817 827.713294 969.14725 827.713294 1024zM354.700563 433.656498c0.245976-43.291857-35.174634-79.20442-78.466491-79.450396-42.307951-0.245976-78.220514 35.174634-78.712467 77.974538-0.737929 42.799904 35.42061 79.450396 78.466491 79.450396C318.542024 511.877012 354.454587 476.210425 354.700563 433.656498zM590.837964 433.902474c0.245976-43.291857-34.928657-79.20442-78.220514-79.696373-42.307951-0.245976-78.220514 34.928657-78.958443 77.974538-0.737929 42.799904 35.174634 79.450396 78.466491 79.696373C554.433448 511.877012 590.591988 476.210425 590.837964 433.902474zM826.975365 432.918568c0-43.291857-36.15854-79.20442-78.958443-78.712467-42.553927 0.245976-77.974538 36.15854-77.974538 78.712467 0 43.04588 36.404516 79.20442 79.20442 78.712467C791.800731 511.139082 826.975365 475.718472 826.975365 432.918568z" p-id="3795"></path></svg>
                                                <span className={"self_list_item_num"}>{item.comments}</span>
                                            </div>
                                        </div>
                                    </div>
                                </ListItem>
                            ))
                        }
                        
                    </List>
                    <Pagination count={Math.ceil(listSource.length/pageSize)} page={page} onChange={handleChangePage}/>
                </Grid>
                <Grid item xs={2.5} className="self_container_r">
                    <div>
                        <div className="self_red_title">Most Popular Posts</div>
                        <List className="more_list" style={{padding:0}}>
                                {moreList.map((item,index)=>(
                                    <ListItem key={index} className="more_item">
                                        {item.title}
                                        <svg t="1652361509270" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4703" width="30" height="30"><path d="M621.254 877.254l320-320c24.994-24.992 24.994-65.516 0-90.51l-320-320c-24.994-24.992-65.516-24.992-90.51 0-24.994 24.994-24.994 65.516 0 90.51L741.49 448 128 448c-35.346 0-64 28.654-64 64s28.654 64 64 64l613.49 0L530.744 786.746C518.248 799.242 512 815.622 512 832s6.248 32.758 18.744 45.254C555.738 902.248 596.26 902.248 621.254 877.254z" p-id="4704"></path></svg>
                                    </ListItem>
                                ))}
                        </List>
                    </div>
                    <div className="self_container_r_d">
                        <div className="self_red_title">Your Forum History</div>
                        <div>
                            <p>14 Posts</p>
                            <p>78 Comments</p>
                            <p>45 likes</p>
                        </div>
                    </div>
                </Grid>
            </Grid>

            <ReplyDialog detail={detail}  visible={visible} setVisible={handleCloseDialog} reply={reply} setReply={setReply} handleReply={handleReply}/>
        </div>
    );
}

export default ForumPage