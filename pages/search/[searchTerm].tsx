import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { GoVerified } from "react-icons/go";
import Link from "next/link";
import axios from "axios";

import NoResults from "../../components/NoResults";
import VideoCard from "../../components/VideoCard";
import useAuthStore from "../../store/authStore";
import { BASE_URL } from "../../utils";
import { IUser, Video } from "../../types";


const Search = ({ videos }: { videos: Video[] }) => {
  const { allUsers } = useAuthStore();
  const [isAccounts, setIsAccounts] = useState(false);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const Videos = !isAccounts ? "border-b-2 border-black" : "text-gray-400";
  const searchedAccounts = allUsers.filter((user: IUser) =>
  user.userName.toLowerCase().includes(searchTerm.toLowerCase())
);
  
  return (
    <div className="w-full">
      <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-300 bg-white w-full">
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
          onClick={() => {
            setIsAccounts(true);
          }}
        >
          Accounts{" "}
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer mt-2 ${Videos}`}
          onClick={() => {
            setIsAccounts(false);
          }}
        >
          Videos{" "}
        </p>
      </div>

      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts.length > 0 ? (
            searchedAccounts.map((user: IUser, idx: number) => (

              <Link href={`/profile/${user._id}`} key={idx}>
                <div className="flex items-start gap-3 ">
                  <div className="w-8 h-8">
                    <Image
                      src={user.image}
                      width={50}
                      height={50}
                      className="rounded-full cursor-pointer"
                      alt="user profile"
                    ></Image>
                  </div>

                  <div className=" xl:block">
                    <p className="gap-1 items-center text-md font-bold text-primary lowercase">
                      {user.userName}
                    </p>
                  </div>
                  <div className=" xl:block text-blue-400">
                    <GoVerified />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos.length ? (
            videos.map((video: Video, idx) => (
              <VideoCard post={video} key={idx} />
            ))
          ) : (
            <NoResults text={`No video results for ${searchTerm}`} />
          )}
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const res = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: { videos: res.data },
  };
};

export default Search;
