
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBox(props){
    console.log(props)
    return (
        <>
        <CircularProgress color="inherit" />
        {props.children}
        </>
    )
}