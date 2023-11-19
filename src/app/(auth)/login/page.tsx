"use client";
import AuthNav from "@/components/AuthNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState } from "react";

function Login() {
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const submit = () => {
    console.log("authState", authState);
  };
  return (
    <div className="h-screen ">
      <AuthNav />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-2 ">
        <div className="hidden lg:block">
          <Image
            src="/images/design.svg"
            width="100"
            height={100}
            alt="auth side img"
            className="h-screen w-full"
          />
        </div>
        <div className="flex justify-center items-center mt-48  lg:mt-0 ">
          <div className="px-10 lg:px-32 w-full ">
            <h1 className="text-5xl font-bold">DevUI</h1>
            <p>Welcome Back! explore the world best UI's.</p>
            {/* <p>Explore the worlds best design for your next project.</p> */}
            <div className="mt-4">
              <Label htmlFor="email">Email:</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your Email:"
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your Password:"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
            </div>

            <div className="mt-4">
              <Button className="w-full" onClick={submit}>
                Login
              </Button>
            </div>
            <div className="mt-2 text-center">
              <strong className="font-bold">Don't have an account ?</strong>
              <Link href="/register" className="ml-2 text-orange-400">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
