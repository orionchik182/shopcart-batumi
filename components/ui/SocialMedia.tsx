import { Facebook, Github, Linkedin, Slack, Youtube } from "lucide-react";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

import { cn } from "@/lib/utils";
import Link from "next/link";

const socialLink = [
  {
    title: "YouTube",
    href: "htts://www.youtube.com",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "Github",
    href: "https://www.youtube.com",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.youtube.com",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.youtube.com",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Slack",
    href: "https://www.youtube.com",
    icon: <Slack className="w-5 h-5" />,
  },
];

interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const SocialMedia = ({className, iconClassName, tooltipClassName}: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink?.map((item) => (
          <Tooltip key={item?.title}>
            <TooltipTrigger asChild>
              <Link href={item?.href} target="_blank" rel="noopener noreferrer" className={cn("p-2 border rounded-full hover:text-shop_light_green hover:border-shop_light_green hoverEffect", iconClassName)}>{item?.icon}</Link>
            </TooltipTrigger>
            <TooltipContent className={cn("bg-white text-shop_darkColor font-semibold border border-shop_light_green", tooltipClassName)}>{item?.title}</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;
