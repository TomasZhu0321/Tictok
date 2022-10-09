import React,{useState,useEffect} from "react";
import Logo from "../utils/logo.png";
import Link from "next/link";
import Image from "next/image";
import Router, { useRouter } from "next/router";
import { GoogleLogin,googleLogout } from "@react-oauth/google";
import { AiOutlineLogout } from "react-icons/ai";
import { BiSearch } from "react-icons/bi";
import { IoMdAdd } from "react-icons/io";
import { createOrGetUser } from "../utils";
import useAuthStore from "../store/authStore";


const Navbar = () => {
  const {userProfile,removeUser,addUser} =useAuthStore();
  const [searchValue,setSearchValue] = useState('');
  const router = useRouter();
  const handleSearch=(e:{preventDefault:()=>void})=>{
    e.preventDefault();
    if(searchValue){
      router.push(`/search/${searchValue}`);
    }}
    //debounce function
    let searchTime:any ;
    const debounceFuntion = (query: any) =>{
      clearTimeout(searchTime);
      if (!query) return setSearchValue('');
      searchTime = setTimeout(()=>{setSearchValue(query)},2000);
    }


  console.log('===>',searchValue);
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
      <div className="relative hidden md:block"> 
      <form 
        onSubmit={handleSearch} 
        className='absolute md:static top-10 -left-20 bg-white  '>
        <input type="text"  onChange={e=>debounceFuntion(e.target.value)} placeholder="Search accounts and videos" className="bg-primary p-3 md:text-md font-medium border-gray-100 border-2 focus:outline-none focus:border-2 focus:border-black w-[300px] rounded-2xl md:w-[350px] md:top-0"></input>
        <button className="absolute md:right-5 top-4 right-6 border-l-2 border-black pl-4" onClick={handleSearch}>
          <BiSearch className="text-2xl"/>
        </button>
      </form>
      </div>
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
