"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

export default function UserPostCard({ post }: { post: PostType }) {
  return (
    <div className="text-left p-2">
      <div className="w-[500px] h-[500px] shadow-md rounded-md">
        <div className="p-5 flex justify-between flex-col ">
          <div className="p-5 flex justify-between items-center ">
            <div>
              <h1 className="text-2xl font-bold">{post.user.name}</h1>
              <p>{formatDate(post.created_at)}</p>
            </div>

            <Button variant={"destructive"}>Del</Button>
          </div>
          <Image
            alt="post"
            src={`http://localhost:3000/uploads/${post.image}`}
            width={"50"}
            height={"50"}
            className="w-full h-[300p
                x] object-fill"
            unoptimized
          />
          <div className="p-5">
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <h1 className="text-xl">{post.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
