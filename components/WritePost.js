import { useState } from 'react';
import Image from 'next/image'
import { useSession } from 'next-auth/react';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import { Button,TextField } from '@mui/material';
import { db } from '@/settings/firebase.setting';
import { collection,addDoc } from 'firebase/firestore'
import { async } from '@firebase/util';

export default function WritePost() {
    const {data:session} = useSession();
    const [formInput,setFormInput] = useState('');

    //create post to firestore 
    const handleCreatePost = async () => {
        await addDoc(collection(db,'posts'),{
            body:formInput,
            author:session.user.email,
            postedAt:new Date().getTime(),

        })
        .then(() => alert('Your post was published'))
        .catch(error => console.error(error))
    }
    
    return (
        <form className="flex flex-col border border-gray-100 bg-white rounded-md shadow-md p-3 mb-4 gap-4">
            <div className='flex flex-row justify-between items-center gap-4'>
                <Image 
                className="rounded-full" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />

                <div className='flex flex-col gap-2'>
                    {/* <textarea 
                    className='w-full p-3 focus:outline-0 bg-gray-200 rounded-full'
                    placeholder='Write a post'
                    rows={1}
                    value={formInput}
                    onChange={(text) => setFormInput(text)}/> */}
                    <TextField 
                    multiline={true}
                    className='w-full'
                    value={formInput}
                    onChange={(text) => setFormInput(text.target.value)}/>

                    <Button 
                    variant='outlined'
                    className=''
                    onClick={handleCreatePost}>Post</Button>
                </div>
            </div>
            <hr style={{color:'black'}}/>

            <div className='flex flex-row justify-around  gap-4'>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <VideoCameraFrontIcon sx={{ color: 'red' }} />
                    Live video
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <PhotoLibraryIcon sx={{ color: 'green' }} />
                    Photo/video
                </button>
                <button className='w-full p-2 hover:bg-gray-200 text-gray-500 rounded'>
                    <SentimentVerySatisfiedIcon sx={{ color: 'yellow' }} />
                    Feelig/activity
                </button>
            </div>
        </form>
    )
}