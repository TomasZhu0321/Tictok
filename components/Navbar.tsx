import React from "react";
import Logo from "../utils/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleLogin,googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const {userProfile,removeUser,addUser} =useAuthStore();

  return (

    <div className="w-full flex justify-between items-center border-black border-b-2 py-2 px-4">
      <Link href="/">
        <div className="w-[70px] h-[80px] md:w-[90px] md:h-[110px]">
          <Image
            src={Logo}
            className="pointer-cursor"
            alt="logo"
            layout="responsive"
          ></Image>
        </div>
      </Link>
      <div> SEARCH</div>
      <div>
        {userProfile ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button className="border-2 border-black px-2 md:px-4 text-md font-semibold flex items-center gap-2">
                <IoMdAdd className="text-xl" />{` `}
                <span className="hidden md:block">Upload</span>
              </button>
            </Link>{userProfile.image &&(
              <Link href="/">
              <>
                <Image
                  width={28}
                  height={20}
                  className="rounded-full cursor-pointer"
                  src={userProfile.image}
                  alt="profile photo"

                />
              </>
            </Link>
            )}
            <button type='button' className="px-2 cursor-pointer" onClick={()=>{
              googleLogout();
              removeUser();
            }}><AiOutlineLogout color='black' fontSize={25}></AiOutlineLogout></button></div>
        ) : (
          <GoogleLogin 
          onSuccess={(response) => createOrGetUser(response, addUser)}
          onError ={()=> console.log('Error')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
