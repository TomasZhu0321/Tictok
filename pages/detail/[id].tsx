import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeUp, HiVolumeOff } from "react-icons/hi";
import { BASE_URL } from "../../utils/index";

import useAuthStore from "../../store/authStore";
import { Video } from "../../types";
import axios from "axios";

interface IProps {
  postDetails: Video;
}
const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState(postDetails);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [muted, setVideMute] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef?.current?.play();
      setIsPlaying(true);
    }
  };
  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.muted = !muted;
    }
  }, [muted]);
  const router = useRouter();
  return (
    <>
      <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
        <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
          <div className="opacity-90 absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
            <p
              className="cursor-pointer"
              onClick={() => {
                router.back();
              }}
            >
              <MdOutlineCancel className="text-white text-[35px] hover:opacity-90" />
            </p>
          </div>
          <div className="relative">
            <div className="lg:h-[100vh] h-[60vh]">
              <video
                loop
                ref={videoRef}
                onClick={onVideoClick}
                src={post.video.asset.url}
                className=" h-full cursor-pointer"
              ></video>
            </div>
            {/* play functionality */}
            <div className="absolute top-[45%] left-[40%]  cursor-pointer">
              {!isPlaying && (
                <button onClick={onVideoClick}>
                  <BsFillPlayFill className="text-white text-6xl lg:text-8xl" />
                </button>
              )}
            </div>
          </div>
          {/* mute functionality */}
          <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
            {muted ? (
              <button
                onClick={() => setVideMute(false)}
                className="rounded-full bg-slate-100 p-1"
              >
                <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
              </button>
            ) : (
              <button
                onClick={() => setVideMute(true)}
                className="rounded-full bg-slate-100 p-1"
              >
                <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
              </button>
            )}
          </div>
        </div>
        {/* personal info */}
        <div className="relative w-[1000px] md:w-[900px] lg:w-[700px]">
          <div className="lg:mt-20 mt-10">
            <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded ">
              <div className="ml-4 md:w-20 md:h-20 w-16 h-10">
                <Link href="/">
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
                <Link href="/">
                  <div className="mt-3 flex flex-col items-center gap-2 ">
                    <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                      {post.postedBy.userName}{" "}
                      <GoVerified className="text-blue-400 text-md" />
                    </p>
                  </div>
                </Link>
              </div>
            </div>
            <p className="px-10 text-lg text-gray-600">{post.caption}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/post/${id}`);
  return {
    props: { postDetails: data },
  };
};
export default Detail;
