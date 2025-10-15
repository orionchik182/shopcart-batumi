import React from "react";
import { ContactItemData } from "./FooterTop";

const ContactItem = ({ item }: { item: ContactItemData }) => {
  return (
    <div className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors">
      {item?.icon}
      <div>
        <h3 className="font-semibold text-gray-900 group-hover:text-black hoverEffect">{item?.title}</h3>
        <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900 hoverEffect">{item?.subtitle}</p>
      </div>
    </div>
  );
};

export default ContactItem;
