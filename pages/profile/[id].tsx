import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";

import VideoCard from "../../components/VideoCard";
import NoResults from "../../components/NoResults";
import { Video, IUser } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}
const Profile = ({ data }: IProps) => {
  const { user, userVideos, userLikedVideos } = data;
  const[showUserVideos,setShowUserVideos] = useState(true);
  const [videosList,setVideoList] = useState<Video[]>([]);

  const videos = showUserVideos ? 'border-b-2 border-black':'text-gray-400';
  const liked = !showUserVideos ? 'border-b-2 border-black':'text-gray-400';
  
  useEffect(()=>{
    if (showUserVideos){
      setVideoList(userVideos);
    }
    else{
      setVideoList(userLikedVideos);
    }
  },[showUserVideos,userLikedVideos,userVideos])
  return (
    <div className="w-full">
      <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
        {/* user image */}
        <div className="w-15 h-15 md:w-20 md:h-20">
          <Image
            src={user.image}
            width={120}
            height={120}
            className="rounded-full"
            alt="user profile"
            layout="responsive"
          ></Image>
        </div>
        {/* user name */}
        <div className="flex flex-col justify-center">
          <p className="gap-1 items-center justify-center tracking-wider text-2xl font-bold text-primary uppercase">
            {user.userName}
          </p>
        </div>
        <div className=" text-blue-400 flex flex-col -ml-4 justify-center">
            <GoVerified />
          </div>
      </div>

      <div>
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-300 bg-white w-full">
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`} onClick={()=>{setShowUserVideos(true)}}>Videos </p>
          <p className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`} onClick={()=>{setShowUserVideos(false)}}>Liked </p>
        </div>

      <div className="flex gap-6 flex-wrap md:justify-start">
          {videosList.length >0 ? (videosList.map((post:Video,idx:number)=>(<VideoCard post={post} key={idx}/>))):<NoResults text={`No ${showUserVideos?'':'Liked'} Videos Yet`}/>}
      </div>

      </div>
    </div>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: { data: res.data },
  };
};
export default Profile;
