import NavBar from "@/components/NavBar";
import React from "react";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "../api/auth/[...nextauth]/authOptions";
import { Button } from "@/components/ui/button";
import SignoutBtn from "@/components/SignoutBtn";
import AddPost from "@/components/AddPost";
//due to private route
import { headers } from "next/headers";
import UserPostCard from "@/components/UserPostCard";

// * fetch user's post
export async function getUserUIs() {
  const res = await fetch(`${process.env.APP_URL}/api/user/ui`, {
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}

export default async function Profile() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const posts = await getUserUIs();

  return (
    <div>
      <NavBar />
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="text-3xl"> Hello, {session?.user?.name}</h1>
          {/* <Button variant="destructive">Sign Out</Button> */}

          <div className="mt-5 flex justify-center items-center ">
            <AddPost user_id={session?.user?.id!} />

            <SignoutBtn />
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {posts?.map((post: PostType) => (
                <UserPostCard key={post.id} post={post} />
              ))}

              {posts?.length === 0 && <div>No posts yet</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
