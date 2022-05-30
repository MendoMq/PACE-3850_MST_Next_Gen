import { Grid, Icon, List, ListItem, Pagination, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';


import "../App.css";
import ReplyDialog from "../components/ReplyDialog";
// import Forum from "../Media/Forum.png"
import axios from '../utils/axios'
import moment from 'moment'
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import LoadingBox from "../components/LoadingBox";
import BlogAForumDialog from "../components/BlogAForumDialog";

function ForumPage(props) {
    const navigate = useNavigate();
    const { hasLogin } = props
    const [listSource, setListSource] = useState([])
    const [total, setTotal] = useState([])
    const [moreList, setMoreList] = useState([])
    const [page, setPage] = useState(1)
    const [user, setUser] = useState({})
    const [userDetail, setUserDetail] = useState({})
    const pageSize = 5

    const [visible, setVisible] = useState(false);//dialog
    const [reply, setReply] = useState("")
    const [detail, setDetail] = useState({})


    const [visibleForum, setVisibleForum] = useState(false)
    const [detailForum, setDetailForum] = useState({})
    const [type, setType] = useState("")

    // loading
    const [moreLoading, setMoreLoading] = useState(false)
    const [loading, setLoading] = useState(false)

    const postReply = (data) => {
        return axios.put("/comment/reply", data)
    }
    const handleReply = () => {
        const params = {
            content: reply,
            userId: user._id,
            fid: detail._id,
            replyId: detail._id,
            replyUserId: detail.user?._id
        }

        postReply(params)
            .then(res => {
                handleCloseDialog()
                getList()
            })
    }
    const handleCloseDialog = () => {
        setVisible(false)
        setReply("")
        setDetail({})
    }

    const getList = (tpage) => {
        setLoading(true)
        setMoreLoading(true)
        axios.post("/forum/get", { page: tpage || page, pageSize })
            .then(res => {
                const { data = [], total: rtotal } = res
                setListSource(data)
                setTotal(rtotal)
            })
            .finally(() => {
                setLoading(false)
            })


        axios.post("/forum/gethot", { page, pageSize })
            .then(res => {
                setMoreList(res)
            })
            .finally(() => {
                setMoreLoading(false)
            })
    }
    const handleChangePage = (event, value) => {
        setPage(value)
        getList(value)
    }
    const handleLike = (e, item) => {
        e.stopPropagation()
        console.log("handleLike", item)
        axios.post("/forum/like", {
            id: item._id,
            userId: user._id
        })
            .then(res => {
                getList()
                getPosts()
            })
    }
    const handleComment = (e, item) => {
        e.stopPropagation()
        console.log("handleComment", item)
        setVisible(true)
        setDetail(Object.assign({}, item))

    }
    const handleToDetail = (item) => {
        console.log("handleToDetail", item)
        navigate("/forumDetail", { state: { id: item._id } })
    }
    const handleOpen = (key, row) => {
        setType(key)
        setDetailForum(row || {})
        setVisibleForum(true)
    }

    const handleClose = () => {
        setType("")
        setDetailForum({})
        setVisibleForum(false)
    }
    const handleSubmit = (type, data) => {
        const params = {
            ...data,
            userId: user._id
        }
        console.log(type, params)
        if (!type) return;
        let promise = null
        if (type === "add") promise = axios.put("/forum/add", params)
        if (type === "edit") promise = axios.post("/forum/edit", params)
        if (type === "delete") promise = axios.delete(`forum/delete/${params._id}`)
        promise.then(res => {
            handleClose()
            getList();
            getPosts()
        })

    }
    const getPosts = () => {
        try {
            let user = JSON.parse(localStorage.getItem("user") || "{}")
            if (!user?._id) return false;
            axios.get(`/forum/posts/${user._id}`)
                .then(res => {
                    setUserDetail(res)
                })
        } catch {

        }

    }
    useEffect(() => {
        getList()
        getPosts()
        try {
            setUser(JSON.parse(localStorage.getItem("user") || "{}"))
        } catch {

        }
    }, [])

    return (
        <div className="self_container">
            <Grid container spacing={0}>
                <Grid item xs={9.5} className="self_list_box">
                    <LoadingBox loading={loading} empty={!listSource.length}>
                        <List style={{ padding: 0, flex: 1 }}>
                            {
                                listSource.map((item, index) => (
                                    <ListItem className="self_list_item" key={index} onClick={() => handleToDetail(item)}>
                                        <div className="self_list_item_l">
                                            {item.user?.avatar && <img src={item.user?.avatar} />}
                                            {!item.user?.avatar && <Avatar sx={{ bgcolor: deepOrange[500] }}>{item.user?.username?.[0]}</Avatar>}
                                            <span>Posted by: {item.user?.username}</span>
                                            <span>{moment(item.createTime).format("DD/MM/YYYY")}</span>
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
                                            {
                                                user?.role === "admin" ? <div className="self_list_item_handle">
                                                    <div onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleOpen('edit', item)
                                                    }}>
                                                        <svg t="1653815717239" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1955" width="24" height="24"><path d="M791.582118 463.269647c-5.150118-8.914824-14.546824-15.179294-25.750588-15.179294-11.173647 0-20.540235 6.234353-25.720471 15.058824-2.680471-0.692706-4.336941-0.060235-4.336941 4.487529l0 293.044706c0 21.534118-17.980235 39.062588-40.026353 39.062588L235.580235 799.744c-22.046118 0-40.026353-17.528471-40.026353-39.062588 0 0 0-507.934118 0-527.480471 0-21.564235 17.950118-39.062588 40.026353-39.062588L595.727059 194.138353c2.288941 0 3.463529-0.451765 4.156235-1.144471 1.957647 0.391529 3.794824 1.144471 5.842824 1.144471 16.564706 0 30.027294-13.131294 30.027294-29.304471 0-16.173176-13.462588-29.304471-30.027294-29.304471-2.409412 0-4.517647 0.813176-6.806588 1.325176C598.196706 136.041412 597.142588 135.529412 595.727059 135.529412L215.582118 135.529412C171.429647 135.529412 135.529412 170.586353 135.529412 213.684706l0 566.543059c0 43.098353 35.900235 78.155294 80.052706 78.155294l500.224 0c44.152471 0 80.022588-35.056941 80.022588-78.155294L795.828706 467.636706C795.828706 465.106824 794.142118 463.841882 791.582118 463.269647zM848.203294 144.986353c-12.438588-10.691765-31.412706-9.517176-42.375529 2.620235L342.949647 660.720941c-10.962824 12.137412-9.758118 30.659765 2.680471 41.351529 12.438588 10.691765 31.412706 9.517176 42.375529-2.620235l462.908235-513.084235C861.816471 174.230588 860.641882 155.678118 848.203294 144.986353z" p-id="1956" fill="#2c2c2c"></path></svg>
                                                    </div>
                                                    <div onClick={(e) => {
                                                        e.stopPropagation()
                                                        handleOpen('delete', item)

                                                    }} style={{ marginTop: 8 }}>
                                                        <svg t="1653816021045" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3166" width="24" height="24"><path d="M608 768c-17.696 0-32-14.304-32-32L576 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C640 753.696 625.696 768 608 768z" p-id="3167" fill="#e02b20"></path><path d="M416 768c-17.696 0-32-14.304-32-32L384 384c0-17.696 14.304-32 32-32s32 14.304 32 32l0 352C448 753.696 433.696 768 416 768z" p-id="3168" fill="#e02b20"></path><path d="M928 224l-160 0L768 160c0-52.928-42.72-96-95.264-96L352 64C299.072 64 256 107.072 256 160l0 64L96 224C78.304 224 64 238.304 64 256s14.304 32 32 32l832 0c17.696 0 32-14.304 32-32S945.696 224 928 224zM320 160c0-17.632 14.368-32 32-32l320.736 0C690.272 128 704 142.048 704 160l0 64L320 224 320 160z" p-id="3169" fill="#e02b20"></path><path d="M736.128 960 288.064 960c-52.928 0-96-43.072-96-96L192.064 383.52c0-17.664 14.336-32 32-32s32 14.336 32 32L256.064 864c0 17.664 14.368 32 32 32l448.064 0c17.664 0 32-14.336 32-32L768.128 384.832c0-17.664 14.304-32 32-32s32 14.336 32 32L832.128 864C832.128 916.928 789.056 960 736.128 960z" p-id="3170" fill="#e02b20"></path></svg>
                                                    </div>
                                                </div>
                                                    : null
                                            }
                                            {
                                                user?.role !== "admin" ? <div className="self_list_item_handle">
                                                    <div onClick={(e) => handleLike(e, item)}>
                                                        {
                                                            !item.likes?.find?.(fitem => fitem.userId == user._id) &&
                                                            <svg t="1652360980939" className="icon" viewBox="0 0 1028 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2622" width="24" height="24"><path d="M478.277632 264.88832C659.364864-28.16 1028.096 88.004608 1028.096 404.086784c0 167.119872-96.451584 299.108352-253.950976 398.988288-53.8112 34.1248-111.1808 62.082048-168.53504 84.415488-20.087808 7.82336-38.781952 14.39744-55.63392 19.781632-10.307584 3.293184-17.855488 5.49376-22.193152 6.651904a45.341696 45.341696 0 0 1-24.087552-0.196608c-4.31104-1.227776-11.83232-3.54816-22.112256-7.001088-16.818176-5.648384-35.478528-12.50304-55.53152-20.606976-57.255936-23.138304-114.526208-51.75296-168.23808-86.290432C100.463616 698.655744 4.096 567.63392 4.096 404.086784 4.096 88.11008 368.360448-26.631168 553.612288 264.40704l-75.334656 0.48128z" p-id="2623"></path></svg>
                                                        }
                                                        {
                                                            item.likes?.find?.(fitem => fitem.userId == user._id) &&
                                                            <svg t="1653751427812" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1960" width="24" height="24"><path d="M736 128c-65.952 0-128.576 25.024-176.384 70.464-4.576 4.32-28.672 28.736-47.328 47.68L464.96 199.04C417.12 153.216 354.272 128 288 128c-141.152 0-256 114.848-256 256 0 82.432 41.184 144.288 76.48 182.496l316.896 320.128C450.464 911.68 478.304 928 512 928c33.696 0 61.568-16.32 86.752-41.504l316.736-320 2.208-2.464C955.904 516.384 992 471.392 992 384 992 242.848 877.152 128 736 128z" p-id="1961" fill="#e02b20"></path></svg>
                                                        }
                                                        <span className={"self_list_item_num"}>{item.likes && item.likes.length}</span>
                                                    </div>
                                                    <div onClick={(e) => handleComment(e, item)}>
                                                        <svg t="1652361125313" className="icon" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3794" width="24" height="24"><path d="M827.713294 1024c-26.319481-17.956282-49.933221-33.944751-73.546961-49.933221-48.211386-33.206822-95.930819-67.151573-144.880135-99.128513-9.347105-6.149411-23.121787-8.3632-34.928657-8.609176-131.597406-0.737929-263.194811 0-394.792217-0.737929-89.781408-0.491953-166.03411-68.135479-178.578909-156.687005-0.983906-7.133317-0.737929-14.758588-0.737929-22.137881 0-169.231804 0.491953-338.709584-0.245976-507.941388-0.491953-91.01129 71.087197-164.066298 157.178957-176.119145 12.544799-1.721835 25.335575-2.459765 37.880375-2.459765 216.951237 0 433.656498-0.491953 650.607735 0.245976 88.797502 0.245976 166.280086 70.349267 177.349027 158.40884 0.983906 7.379294 0.491953 14.758588 0.491953 22.137881 0 168.493875-0.737929 336.987749 0.245976 505.481624 0.737929 91.995196-71.087197 165.296181-157.178957 177.103051-12.544799 1.721835-25.089599 2.459765-39.110257 3.689647C827.713294 917.73817 827.713294 969.14725 827.713294 1024zM354.700563 433.656498c0.245976-43.291857-35.174634-79.20442-78.466491-79.450396-42.307951-0.245976-78.220514 35.174634-78.712467 77.974538-0.737929 42.799904 35.42061 79.450396 78.466491 79.450396C318.542024 511.877012 354.454587 476.210425 354.700563 433.656498zM590.837964 433.902474c0.245976-43.291857-34.928657-79.20442-78.220514-79.696373-42.307951-0.245976-78.220514 34.928657-78.958443 77.974538-0.737929 42.799904 35.174634 79.450396 78.466491 79.696373C554.433448 511.877012 590.591988 476.210425 590.837964 433.902474zM826.975365 432.918568c0-43.291857-36.15854-79.20442-78.958443-78.712467-42.553927 0.245976-77.974538 36.15854-77.974538 78.712467 0 43.04588 36.404516 79.20442 79.20442 78.712467C791.800731 511.139082 826.975365 475.718472 826.975365 432.918568z" p-id="3795"></path></svg>
                                                        <span className={"self_list_item_num"}>{item.replys && item.replys.length}</span>
                                                    </div>
                                                </div>
                                                    : null
                                            }
                                        </div>
                                    </ListItem>
                                ))
                            }

                        </List>
                    </LoadingBox>
                    <div>
                        {listSource.length ? <Pagination style={{ margin: "10px 0" }} count={Math.ceil(total / pageSize)} page={page} onChange={handleChangePage} /> : null}
                        {user?.role === "admin" ? <Button variant="contained" color="primary" style={{ margin: 8 }} className="Blog_bt" onClick={() => handleOpen('add')}>Add</Button> : null}
                    </div>

                </Grid>
                <Grid item xs={2.5} className="self_container_r">
                    <div>
                        <div className="self_red_title">Most Popular Posts</div>
                        <LoadingBox loading={moreLoading} empty={!moreList.length}>
                            <List className="more_list" style={{ padding: 0 }}>
                                {moreList.map((item, index) => (
                                    <ListItem key={index} className="more_item" onClick={() => handleToDetail(item)}>
                                        <span style={{ marginRight: 6 }}>{item.title}</span>
                                        <svg t="1652361509270" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4703" width="28" height="28"><path d="M621.254 877.254l320-320c24.994-24.992 24.994-65.516 0-90.51l-320-320c-24.994-24.992-65.516-24.992-90.51 0-24.994 24.994-24.994 65.516 0 90.51L741.49 448 128 448c-35.346 0-64 28.654-64 64s28.654 64 64 64l613.49 0L530.744 786.746C518.248 799.242 512 815.622 512 832s6.248 32.758 18.744 45.254C555.738 902.248 596.26 902.248 621.254 877.254z" p-id="4704"></path></svg>
                                    </ListItem>
                                ))}
                            </List>
                        </LoadingBox>
                    </div>
                    <div className="self_container_r_d">
                        {
                            !hasLogin &&
                            <div className="self_red_title">Please Login to see your Forum history</div>
                        }
                        {
                            hasLogin &&
                            <div>
                                <p>{userDetail.posts} Posts</p>
                                <p>{userDetail.comments} Comments</p>
                                <p>{userDetail.likes} likes</p>
                            </div>
                        }
                    </div>
                </Grid>
            </Grid>

            <ReplyDialog user={user} detail={detail} visible={visible} setVisible={handleCloseDialog} reply={reply} setReply={setReply} handleReply={handleReply} />

            <BlogAForumDialog detail={detailForum} type={type} visible={visibleForum} submit={handleSubmit} setVisible={handleClose} />
        </div>
    );
}

export default ForumPage