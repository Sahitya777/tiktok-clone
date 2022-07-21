import React,{useEffect,useState} from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { GoVerified } from "react-icons/go";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { BASE_URL } from "../../utils";
import {IUser,Video} from '../../types'

interface IProps{
    data:{
        user:IUser,
        userVideos:Video[],
        userLikedVideos:Video[]
    }
}

const Profile=({data}:IProps)=>{
    const {user,userVideos,userLikedVideos}=data;
    const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
    const videos = showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const liked = !showUserVideos ? 'border-b-2 border-black' : 'text-gray-400';
    const [videosList, setvideosList] = useState<Video[]>([]);

    useEffect(()=>{
        if(showUserVideos){
            setvideosList(userVideos);
        }
        else{
            setvideosList(userLikedVideos);
        }
    },[showUserVideos,userLikedVideos,userVideos])

    return(
        <div className="w-full">
            <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
                <div className='w-16 h-16 md:w-32 md:h-32'>
                    <Image
                        width={90}
                        height={90}
                        layout='responsive'
                        className='rounded-full'
                        src={user.image}
                        alt='user-profile'
                    />
                </div>  
                <div>
                <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center justify-center lowercase'>
                    <span>{user.userName.replace(/\s+/g, '')} </span>
                    <GoVerified className='text-blue-400 md:text-xl text-md' />
                </div>
                    <p className='text-sm font-medium'> {user.userName}</p>
                </div>             
            </div>
            <div>
                <div className="flex gap-10 border-b-2 border-gray-200 bg-white w-full mb-10 mt-10">
                    <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={()=>setShowUserVideos(true)}>Videos</p>
                    <p className={`text-xl font-semibold cursor-pointer ${liked} mt-2`} onClick={() => setShowUserVideos(false)}>
                        Liked
                    </p>
                </div>
                <div className="flex gap-6 flex-wrap justify-start">
                    {videosList.length > 0 ? (
                        videosList.map((post: Video, idx: number) => (
                        <VideoCard key={idx} post={post} />
                        ))
                ) : (
                    <NoResults
                    text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`}
                    />
                )}

                </div>

            </div>
        </div>
    )
}

export const getServerSideProps=async ({params:{id}}:{
    params:{id:string}
})=>{
    const res=await axios.get(`${BASE_URL}/api/proifle/${id}`)
    return{
        props:{data:res.data}
    }
}

export default Profile;