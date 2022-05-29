import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import ReplyBox from "./ReplyBox";

import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

function ReplyDialog(props) {
    const { detail = {},visible = false, setVisible = () => { }, reply, setReply, handleReply,user={} } = props;
    console.log(detail)

    return (
        <Dialog
            open={visible}

        >
            <div onClick={() => setVisible(false)} style={{ margin: 10 }}>
                <svg t="1652450190115" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1431" width="24" height="24"><path d="M512 466.944l233.472-233.472a31.744 31.744 0 0 1 45.056 45.056L557.056 512l233.472 233.472a31.744 31.744 0 0 1-45.056 45.056L512 557.056l-233.472 233.472a31.744 31.744 0 0 1-45.056-45.056L466.944 512 233.472 278.528a31.744 31.744 0 0 1 45.056-45.056z" fill="#5A5A68" p-id="1432"></path></svg>
            </div>
            <DialogContent>
                <div className="replyDialog_detail">
                {detail?.user?.avatar&&<img src={detail?.user?.avatar} className="detail_avatar"/> }
                {!detail?.user?.avatar&&<Avatar className="detail_avatar" sx={{ bgcolor: deepOrange[500] }}>{detail?.user?.username?.[0]}</Avatar>}
                    <div style={{ flex: 1 }}>
                        <div>
                            <div>{detail?.user?.username}</div>
                            <div>{detail?.content}</div>
                        </div>
                    </div>
                </div>
                <div className="replyDialog_line"></div>
                <ReplyBox user={user} reply={reply} setReply={setReply} handleReply={handleReply} />
            </DialogContent>
        </Dialog>
    )
}

export default ReplyDialog