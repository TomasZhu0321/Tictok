import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const {topic} = router.query;
  const activeTopicStyle =
    "xl:border-2 hover:bg-gray-500 rounded-full justify-center items-center px-3 py-2 cursor-pointer flex gap-3 text-white bg-black";
  const topicStyle =
    "xl:border-2 hover:bg-black hover:text-white rounded-full justify-center items-center px-3 py-2 cursor-pointer flex gap-3";
  return (
    <div className="pb-6">
      <p className="text-gray-400 font-semibold m-3 mt-4 hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((items) => (
          <Link href={`/?topic=${items.name}`} key={items.name}>
            <div
              className={topic === items.name ? activeTopicStyle : topicStyle}
            >
              <span className="font-bold text-2xl xl:text-md">
                {items.icon}
              </span>
              <span className="hidden font-medium text-md xl:block capitalize">
                {items.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
