import React from "react";
import { footerList1, footerList2, footerList3 } from "../utils/constants";

const Footer = () => {
  const List = ({ list,mt }: { list: string[],mt:boolean}) => (
    <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
      {list.map((item) => (
        <p
          key={item}
          className="text-gray-300 text-sm hover:underline cursor-pointer"
        >
          {item}
        </p>
      ))}
    </div>
  );

  return (
    <div className="mt-6 hidden xl:block">
      <List list={footerList1} mt={false}></List>
      <List list={footerList2} mt></List>
      <List list={footerList3} mt></List>
    </div>
  );
};

export default Footer;
