import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingBox(props) {
    return (
        <div className='loadingWrap'>
            {props.loading && <div className='LoadingBox'>
                <CircularProgress color="inherit" />
                {props.loadingText || "loading..."}
            </div>}
            {
                (!props.loading && props.empty) ?
                    <div>
                        {props.emptyText || "No Data"}
                    </div>
                    :
                    props.children
            }
        </div>
    )
}