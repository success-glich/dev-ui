"use client";

import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SignoutBtn() {
  const logout = () => {
    signOut({ callbackUrl: "/login", redirect: true });
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          {" "}
          <Button variant={"destructive"}>Sign Out</Button>{" "}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              After you will be logout from this app and you have to login again
              to access your profile page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={logout}>
              Yes, Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
