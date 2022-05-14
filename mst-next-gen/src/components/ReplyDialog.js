import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ReplyBox from "./ReplyBox";



function ReplyDialog(props) {
    const { detail = {}, visible = false, setVisible = () => { }, reply, setReply, handleReply } = props;
    detail.avatar=`https://mui.com/static/images/avatar/1.jpg`
    detail.author = "author"
    detail.content = "content content content content"

    return (
        <Dialog
            open={visible}

        >
            <div onClick={() => setVisible(false)} style={{ margin: 10 }}>
                <svg t="1652450190115" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1431" width="24" height="24"><path d="M512 466.944l233.472-233.472a31.744 31.744 0 0 1 45.056 45.056L557.056 512l233.472 233.472a31.744 31.744 0 0 1-45.056 45.056L512 557.056l-233.472 233.472a31.744 31.744 0 0 1-45.056-45.056L466.944 512 233.472 278.528a31.744 31.744 0 0 1 45.056-45.056z" fill="#5A5A68" p-id="1432"></path></svg>
            </div>
            <DialogContent>
                <div className="replyDialog_detail">
                    <img src={detail.avatar} className="detail_avatar" />
                    <div style={{ flex: 1 }}>
                        <div>
                            <div>{detail.author}</div>
                            <div>{detail.content}</div>
                        </div>
                    </div>
                </div>
                <div className="replyDialog_line"></div>
                <ReplyBox reply={reply} setReply={setReply} handleReply={handleReply} />
            </DialogContent>
        </Dialog>
    )
}

export default ReplyDialog