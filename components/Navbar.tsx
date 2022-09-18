import React from "react";
import Logo from "../utils/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoogleLogin,GoogleLogout } from "react-google-login";
import {AiOutlineLogout} from 'react-icons/ai';
import { BiSearch } from "react-icons/bi";
import {IoMdAdd} from 'react-icons/io';

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-2 border-black py-2 px-4">
      <Link href="/">
        <div className="w-[70px] h-[80px] md:w-[90px] md:h-[100px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
