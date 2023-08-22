import React, { useState } from 'react'
import Image from 'next/image'
import { GoSignOut } from 'react-icons/go';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import WritePost from '@/components/WritePost';
import { getDocs,collection } from 'firebase/firestore'
import { db } from '@/settings/firebase.setting';
import PostDisplay from '@/components/PostDisplay';
import { cdnImages } from '@/assets/demo_cdn_images';
import { rangeOfRandNums } from '@/assets/range-of-rand-nums';


export default function () {
    const {data:session} = useSession();
    const [posts,setPosts] = useState([]);
    const router = useRouter();

    console.log(session);

    React.useEffect(() => {
        if (!session) {
            router.push('/auth/signup')
        }
    },[]);

    //get posts from firestore
    const getPosts = async () => {
        const res = await getDocs(collection(db, 'posts'));
        res.docs.forEach(doc => posts.push({
            id:doc.id,
            data:doc.data()
        }))
    }
    getPosts();

  return (
    <>
        <main 
        className="h-screen relative flex flex-col items-center justify-center pt-20 bg-scroll bg-gray-200">
            <nav className="w-full h-19 flex flex-row justify-between items-center fixed top-0 left-0 right-0 bg-white shadow-md p-2">
                <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-gray-200" >
                    <Image 
                    className='w-auto]'
                    width={40}
                    height={40} 
                    src='/facepal_logo.png'
                    alt="facepal logo" />
                </div>

                <GoSignOut 
                className='text-gray-800'
                onClick={signOut}/>

                <Image 
                className="rounded-full" 
                width={48} 
                height={48}
                src={session ? session?.user.image : '/facepal_logo.png'} 
                alt="profile photo" />
            </nav>
            <div className="w-full sm:w-[600px] h-full overflow-y-scroll px-4 no-scrollbar">
            {/*feeds holder*/}

                <WritePost />

                {/* previous posts holder */}
                <div className="flex flex-col gap-2">

                    {
                        posts.map(post => (
                            <div id={post.id}>
                                <PostDisplay 
                                timePosted={post.data.postedAt}
                                body={post.data.body}
                                postImage={cdnImages[rangeOfRandNums(0,cdnImages.length)]}/>
                            </div>
                        ))
                    }

                </div>
            </div>
        </main>
    </>
  )
}
