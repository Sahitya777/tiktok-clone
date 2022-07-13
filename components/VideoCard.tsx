import React, { useEffect, useRef, useState } from 'react';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { HiVolumeUp, HiVolumeOff } from 'react-icons/hi';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import { BsPlay } from 'react-icons/bs';

import { Video } from './../types';
interface Iprops{
    post:Video;
}
const VideoCard:NextPage<Iprops> = ({post}) => {
  const [isHover, setisHover] = useState(false);
  const [playing, setplaying] = useState(false);
  const [isVideoMuted, setisVideoMuted] = useState(false);
  const videoRef=useRef<HTMLVideoElement>(null);

  const onVideoPress=()=>{
    if(playing){
      videoRef?.current?.pause();
      setplaying(false);
    }
    else{
      videoRef?.current?.play();
      setplaying(true);
    }

  
  }
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);
  return (
    <div className='flex flex-col border-b-2 border-gray-200 pb-6'>
      <div>
        <div className='flex gap-3 p-2 cursor-pointer font-semibold rounded'>
          <div className='md:w-16 md:h-16 w-10 h-10'>
            <Link href="/">
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  layout="responsive"
                >

                </Image>
              </>
            </Link>
          </div>
          <div>
            <Link href="/">
              <div className='flex items-center gap-2'>
                <p className='flex items-center gap-2 md:tyext-md font-bold text-primary'>
                  {post.postedBy.userName}{`
                  `}
                  <GoVerified className='text-blue-400 text-md'/>
                </p>
                <p className='capitalize font-medium text-gray-500 hidden md:block'>{post.postedBy.userName}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='lg:ml-20 flex gap-4 relative'>
        <div
        onMouseEnter={()=>setisHover(true)}
        onMouseLeave={()=>setisHover(false)}
         className='rounded-3xl'>
          <Link href={`/detail/${post._id}`}>
            <video
            loop
            ref={videoRef}
            className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[528px] w-[200px] rounded-2xl cursor-pointer bg-gray-100'
            src={post.video.asset.url}>

            </video>
          </Link>
          {isHover &&(
              <div className='absolute bottom-6 cursor-pointer left-8 md:left-12 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] p-3'>
                {playing ?(
                  <button onClick={onVideoPress}>
                    <BsFillPauseFill className='text-black text-2xl lg:text-4xl'/>
                  </button>
                ):(
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className='text-black text-2xl lg:text-4xl'/>
                  </button>
                )}
                {isVideoMuted ?(
                  <button onClick={()=>setisVideoMuted(false)}>
                    <HiVolumeOff className='text-black text-2xl lg:text-4xl'/>
                  </button>
                ):(
                  <button onClick={()=>setisVideoMuted(true)}>
                    <HiVolumeUp className='text-black text-2xl lg:text-4xl'/>
                  </button>
                )}
              </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default VideoCard