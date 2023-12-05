"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function PostCard({ post }: { post: PostType }) {
  return (
    <div className="text-left p-2">
      <div className="w-[500px] h-min-[500px] shadow-md rounded-md hover:shadow-lg hover:-translate-y-5 transition-all">
        <div className="p-5 flex justify-between flex-col ">
          <div className="p-5 flex justify-between items-center ">
            <div>
              <h1 className="text-2xl font-bold">{post.user.name}</h1>
              <p>{formatDate(post.created_at)}</p>
            </div>
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
            <Link href={`/ui/${post.id}`}>
              <h1 className="text-3xl font-bold">{post.title}</h1>
              <h1 className="text-xl">{post.description.slice(0, 20)}...</h1>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
