import React from "react";
import { NextPage } from "next";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin,googleLogout } from "@react-oauth/google";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import Discover from "./Discover";
import SuggestedAccounts from "./SuggestedAccounts";
import Footer from "./Footer";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const userProfile = false;
  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold rounded";
  return (
    <div>
      <div
        className="block m-2 mt-4 ml-3 text-xl hover:cursor-pointer"
        onClick={() => {
          setShowSidebar((prev) => !prev);
        }}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="flex flex-col justify-start w-[6rem] xl:w-400 mb-10 border-r-2 xl:border-0 border-gray-300 p-3">
          <div className="border-gray-200 xl:border-b-2 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For you</span>
              </div>
            </Link>
          </div>
          
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
