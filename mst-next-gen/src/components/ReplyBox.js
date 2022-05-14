import { Button, Input } from "@mui/material";
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
function ReplyBox(props) {
    const {reply="",setReply=()=>{},handleReply=()=>{},className=""} = props;
    return (
        <div className={className +" detail_reply"}>
            <div>
                <img src="https://mui.com/static/images/avatar/1.jpg" className="detail_avatar" />
                <Input
                    value={reply}
                    onChange={e => setReply(e.target.value)}
                    fullWidth placeholder="input your reply" className="detail_input" />
            </div>
            <ThemeProvider theme={theme}>
                <Button variant="contained" color="primary" style={{ fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }}
                    className={reply ? "" : "detail_disbtn"}
                    onClick={() => reply ? handleReply() : {}}
                >Reply</Button>
            </ThemeProvider>
        </div>
    )
}

export default ReplyBox