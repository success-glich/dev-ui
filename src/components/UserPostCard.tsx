"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import PostDeleteBtn from "./PostDeleteBtn";
import EditPost from "./EditPost";
import { useSession } from "next-auth/react";

export default function UserPostCard({ post }: { post: PostType }) {
  const { data, status } = useSession();

  return (
    <div className="text-left p-2">
      <div className="w-[500px] h-min-[500px] shadow-md rounded-md">
        <div className="p-5 flex justify-between flex-col ">
          <div className="p-5 flex justify-between items-center ">
            <div>
              <h1 className="text-2xl font-bold">{post.user.name}</h1>
              <p>{formatDate(post.created_at)}</p>
            </div>
            <div className="flex gap-2">
              {/* <Button variant={"secondary"}>Edit</Button>
              <Edit */}

              {/* {data?.user?.id && <EditPost user_id={data?.user?.id!} />} */}
              {post && <EditPost post={post} />}
              {/* <EditPost /> */}
              <PostDeleteBtn id={post.id} />
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
            <h1 className="text-3xl font-bold">{post.title}</h1>
            <h1 className="text-xl">{post.description}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
