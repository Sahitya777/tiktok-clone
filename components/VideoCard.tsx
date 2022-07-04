import React from 'react'
import {Video} from '../types'
import {NextPage} from 'next'
interface Iprops{
    post:Video;
}
const VideoCard:NextPage<Iprops> = ({post}) => {
  return (
    <div>VideoCard</div>
  )
}

export default VideoCard