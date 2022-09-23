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
  const {userProfile,addUser} =useAuthStore();
  const user = false;
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
        {user ?(
          <div> Logged In</div>
        ) : (
          <GoogleLogin 
          onSuccess={(response) => createOrGetUser(response,user)}
          onError ={()=> console.log('Error')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
