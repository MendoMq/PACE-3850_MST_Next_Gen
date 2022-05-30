import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from '../utils/axios'

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
function BlogAForumDialog(props) {
    const { detail = {}, visible = false, setVisible = () => { }, submit = () => { }, type } = props;
    const [form, setForm] = useState({})
    const [errors, setErrors] = useState({ title: false, content: false })
    const handleChange = (key, value) => {
        setErrors({ ...errors, [key]: !value })
        setForm({ ...form, [key]: value })
        console.log(form)
    }
    useEffect(() => {
        setForm(detail)
    }, [props])
    return (
        <Dialog
            open={visible}
            className="Dialog_wrap"
        >
            <div style={{ margin: 10, textAlign: "center", display: "flex", justifyContent: "center" }}>
                <h3>{type?.toUpperCase?.()}</h3>
            </div>
            <DialogContent

            >
                {type === "delete" && <p style={{ fontSize: 20, fontWeight: "bold" }}>Confirm deletion of this item？</p>}
                {type !== "delete" &&
                    <Box
                        component="form"
                        sx={{
                            display: 'flex', flexWrap: 'wrap', flexDirection: "column"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className="Dialog_form">
                            <TextField
                                required
                                value={form.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                error={errors.title}
                                label="Title"
                                style={{ margin: 10 }}
                            />
                            <TextField
                                required
                                value={form.content}
                                onChange={(e) => handleChange('content', e.target.value)}
                                error={errors.content}
                                label="Content"
                                style={{ margin: 10 }}
                            />
                        </div>

                    </Box>
                }
                <div className="Dialog_Buttons">

                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary" style={{ maxWidth: '150px', maxHeight: '60px', minWidth: '120px', minHeight: '50px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif", backgroundColor: "#000" }} onClick={() => setVisible(false)} >Cancel</Button>
                        <Button variant="contained" color="primary" style={{ maxWidth: '150px', maxHeight: '60px', minWidth: '120px', minHeight: '50px', fontSize: '16px', fontFamily: "'Abel', Helvetica, Arial, Lucida, sans-serif" }} onClick={() => submit(type, form)}>{type === "delete" ? "Confirm" : "Submit"}</Button>
                    </ThemeProvider>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default BlogAForumDialog