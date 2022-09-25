import { NextPage } from "next";
import React, { useState, useEffect, useRef } from "react";
import { Video } from "../types";
import Image from "next/image";
import Link from "next/link";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BsPlay, BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";

interface IProps {
  post: Video;
}
const VideoCard: NextPage<IProps> = ({ post }) => {
  const [isHover, setHover] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setVideMute] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);  //similar to document.getElementByid;
  const onVideoPres = ()=>{
    if(playing){
      videoRef?.current?.pause();
      setPlaying(false);
    }else{
      videoRef?.current?.play(); 
      setPlaying(true);
    }
  }
  useEffect(()=>{
    if(videoRef?.current){
      videoRef.current.muted = !muted;
    }
  },[muted])
  return (
    <div className="flex flex-col border-b-2 border-gray-200 pb-6">
      <div>
        <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
          <div className="md:w-16 md:h-16 w-10 h-10">
            <Link href={`/profile/${post.postedBy._id}`}>
              <>
                <Image
                  width={62}
                  height={62}
                  className="rounded-full"
                  src={post.postedBy.image}
                  alt="profile photo"
                  layout="responsive"
                />
              </>
            </Link>
          </div>
          <div>
            <Link href={`/profile/${post.postedBy._id}`}>
              <div className="flex items-center gap-2 ">
                <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                  {post.postedBy.userName}{" "}
                  <GoVerified className="text-blue-400 text-md" />
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="lg:ml-20 flex gap-4 relative">
          <div
            onMouseEnter={() => {
              setHover(true);
            }}
            onMouseLeave={() => {
              setHover(false);
            }}
            className="rounded-3xl"
          >
            <Link href={`/detail/${post._id}`}>
              <video
                loop
                ref={videoRef}
                className="lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530px] w-[200px] rounded-2xl cursor-pointer bg-gray-100"
               >
                <source src={post.video.asset.url}></source>
               </video>
            </Link>
            {isHover && (
              <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 lg:justify-between w-[100px] md:w-[50px] lg:w-[600px] p-3'>
                {playing ? (
                  <button onClick={onVideoPres} className="rounded-full bg-slate-100 p-1">
                    <BsFillPauseFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button  onClick={onVideoPres} className="rounded-full bg-slate-100 p-1">
                    <BsFillPlayFill className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}

                {muted ? (
                  <button onClick={() => setVideMute(false)} className="rounded-full bg-slate-100 p-1">
                    <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
                  </button>
                ) : (
                  <button onClick={() => setVideMute(true)} className="rounded-full bg-slate-100 p-1">
                    <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
