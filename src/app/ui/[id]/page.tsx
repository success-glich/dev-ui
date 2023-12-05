import React from "react";
import { headers } from "next/headers";
import NavBar from "@/components/NavBar";
import PostCard from "@/components/PostCard";
import Image from "next/image";
import { formatDate } from "@/lib/utils";

export async function getPost(id: number) {
  const res = await fetch(`${process.env.APP_URL}/api/ui/${id}`, {
    headers: headers(),
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}
export default async function page({ params }: { params: { id: number } }) {
  const post = await getPost(params.id);
  return (
    <div className="">
      <NavBar />
      <div className="container h-screen  grid place-items-center ">
        <div className="flex ">
          {/* <PostCard post={post} />
           */}
          <div className="">
            <Image
              alt="post"
              src={`http://localhost:3000/uploads/${post.image}`}
              width={"50"}
              height={"100"}
              className="w-full h-[500px] object-fill rounded-md scale-y-125"
              unoptimized
            />
          </div>
          <div className="p-2 flex justify-center">
            <div className="p-5">
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <div className="flex justify-between">
                <h1>
                  <span className=" text-xl font-bold">{post.user.name}</span>
                </h1>
                <p>{formatDate(post.created_at)}</p>
              </div>
              <h1 className="text-l">{post.description}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
