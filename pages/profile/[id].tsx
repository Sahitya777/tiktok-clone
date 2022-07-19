import React,{useEffect} from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { GoVerified } from "react-icons/go";
import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { BASE_URL } from "../../utils";
import {IUser,Video} from '../../types'


const Profile=()=>{
    return(
        <div>Profile</div>
    )
}

export const getServerSideProps=async ({params:{id}}:{
    params:{id:string}
})=>{
    const res=await axios.get(`${BASE_URL}/proifle/${id}`)
}

export default Profile;