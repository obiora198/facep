import React from 'react'
import Image from 'next/image'
import { GoSignOut } from 'react-icons/go';
import { useSession,signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
// import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';



export default function () {
    const {data:session} = useSession();
    const router = useRouter();

    console.log(session);

    React.useEffect(() => {
        if (!session) {
            router.push('/auth/signup')
        }
    },[])

  return (
    <>
        <main 
        className="h-screen relative flex flex-col items-center justify-center pt-20 bg-scroll bg-gradient-to-b from-indigo-500 via-sky-500 to-pink-500">
            <nav className="w-full h-19 flex flex-row justify-between items-center fixed top-0 left-0 right-0 bg-indigo-800 p-3">
                <div className="flex items-center w-[48px] h-[48px] rounded-full bg-white" >
                    <Image 
                    width={40} 
                    height={40} 
                    src='/facepal_logo.png' 
                    alt="facepal logo" />
                </div>
                <Image 
                className="rounded-full" 
                width={48} 
                height={48}
                src={session?.user.image} 
                alt="profile photo" />
            </nav>
            <div className="w-full sm:w-[600px] h-full overflow-y-scroll p-3">
            {/*feeds holder*/}

                <form className="flex flex-col border border-gray-100 bg-white rounded-md p-3 mb-4 gap-4">
                    <div className='flex flex-row justify-between items-center gap-4'>
                        <Image 
                        className="rounded-full" 
                        width={48} 
                        height={48}
                        src={session?.user.image} 
                        alt="profile photo" />

                        <textarea 
                        className='w-full p-3 focus:outline-0 bg-gray-300 rounded-full'
                        placeholder='Write a post'
                        rows={1}/>
                    </div>
                    <hr style={{color:'black'}}/>

                    <div>
                        
                    </div>
                    
                </form>

                {/* previous posts holder */}

                <div className="flex flex-col gap-2 gap-3">
                
                    <div className="border border-gray-100 bg-white rounded-md p-3 mb-4">
                        <ul className="flex flex justify-between">
                            <li className="flex flex-row gap-1 items-center">
                                <Image className="rounded-full" src="/imgs/opeyemi.png" width={40} height={40} alt="profile photo"/>                                
                                <small className="text-gray-700">yaradua</small>
                            </li>
                            <li>
                                <small className="text-gray-700">24 minutes ago</small>
                            </li>
                        </ul>
                        
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, tenetur. Natus provident id quae delectus ab. Asperiores, veritatis!</p>

                        <ul className="flex flex-row justify-between mt-2">
                            <li className="text-sm text-gray-500">
                                <span>5</span>
                                <span>comments</span>
                            </li>
                            <li className="text-sm text-gray-500">
                                <span>5</span>
                                <span>likes</span>
                            </li>
                            <li className="text-sm text-gray-500 ">
                                <span>5</span>
                                <span>hearts</span>
                            </li>
                            <li className="text-sm text-gray-500 ">
                                <span>5</span>
                                <span>wows</span>
                            </li>
                        </ul>
                    </div>     
                    {/* end of single post */}

                </div>
            </div>
        </main>
    </>
  )
}
