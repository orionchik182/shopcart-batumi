import React from "react";
import { Title } from "./text";
import { getLatestBlogs } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";
import { Calendar } from "lucide-react";
import dayjs from "dayjs";

const LatestBlog = async () => {
  const blogs = await getLatestBlogs();
  return (
    <div className="mb-10 lg:mb-20">
      <Title>LatestBlog</Title>
      <div className="mt-5 grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-5 lg:grid-cols-4">
        {blogs?.map((blog) => (
          <div key={blog?._id} className="rounded-lg overflow-hidden">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="blogImage"
                  width={500}
                  height={500}
                  className="max-h-80 w-full object-cover"
                />
              </Link>
            )}
            <div className="bg-shop_light_bg p-5">
              <div className="flex items-center gap-5 text-xs">
                <div className="group relative flex cursor-pointer items-center">
                  {blog?.blogcategories?.map((item, i) => (
                    <p
                      key={i}
                      className="text-shop_dark_green font-semibold tracking-wider"
                    >
                      {item?.title}
                    </p>
                  ))}
                  <span className="bg-shop_lightColor/30 group-hover:bg-shop_dark_green hoverEffect absolute -bottom-1.5 left-0 inline-block h-[2px] w-full hover:cursor-pointer" />
                </div>
                <p className="text-shop_lightColor group hover:text-shop_dark_green hoverEffect relative flex items-center gap-1 hover:cursor-pointer">
                  <Calendar size={15} />{" "}
                  {dayjs(blog.publishedAt).format("MMMM D, YYYY")}
                  <span className="absolute left-0 -bottom-1.5 bg-shop_lightColor/30 inline-block w-full h-[2px] group-hover:bg-shop_dark_green hoverEffect"></span>
                </p>
              </div>
              <Link href={`/blog/${blog?.slug?.current}`} className="text-base font-semibold tracking-wide mt-5 line-clamp-2 hover:text-shop_dark_green hoverEffect">{blog?.title}</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestBlog;
