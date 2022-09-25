import React, { useState, useEffect } from "react";
import { MdFavorite } from "react-icons/md";
import useAuthStore from '../store/authStore';

interface IProps{
    handleLike:()=> void;
    handleDislike:()=>void;
    likes:any[];
}
const LikeButton = ({handleLike, handleDislike,likes}:IProps) => {
  const [alreadyLiked, setlike] = useState(false);
  const {userProfile}:any = useAuthStore();
  //判断之前有没有点过赞
  let filerLikes = likes?.filter((item)=>item._ref === userProfile?._id) //返回user or 没有
  useEffect(()=>{
    if (filerLikes?.length>0){setlike(true)}else {setlike(false)}
  },[likes,filerLikes]);

  return (
    <div className="gap-6">
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (<div className="bg-primary rounded-full p-2 md:p-4" onClick={handleDislike}>
            <MdFavorite className="text-lg md:text-2xl " ></MdFavorite>
        </div>) : (<div className="bg-black rounded-full p-2 md:p-4"onClick={handleLike}>
            <MdFavorite className="text-lg md:text-2xl text-white" ></MdFavorite>
        </div>)}
        <p className="text-md font-semibold ">{likes?.length || 0}</p>
      </div>
    </div>
  );
};

export default LikeButton;
