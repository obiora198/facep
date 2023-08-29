import { CircularProgress } from "@mui/material";

export default function ActivityIndicator() {
    return (
        <div className='h-screen w-full absolute flex items-center justify-center top-0 left-0 z-50 bg-violet-400/10'>
            <CircularProgress color='secondary'/>
        </div>
    )
}