import { Clock, Mail, MailCheckIcon, MailIcon, MapPin, Phone } from "lucide-react";
import React from "react";
import ContactItem from "./ContactItem";

export interface ContactItemData {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    subtitle: "Georgia, Batumi",
    icon: (
      <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    subtitle: "+995 579 02 41 20",
    icon: (
      <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    subtitle: "Mon - Sat: 10:00 AM - 7:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    subtitle: "Serg.batumi2022@gmail.com",
    icon: (
      <MailCheckIcon className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid pl-15 md:pl-0 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 lg:gap-8 border-b pr-1">
      {data?.map((item, index) => (
        <ContactItem key={index} item={item} />
      ))}
    </div>
  );
};

export default FooterTop;
