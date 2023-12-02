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

export default async function Profile() {
  const session: CustomSession | null = await getServerSession(authOptions);
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
        </div>
      </div>
    </div>
  );
}
