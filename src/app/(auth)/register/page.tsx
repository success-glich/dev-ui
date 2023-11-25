"use client";
import AuthNav from "@/components/AuthNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
function Register() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<AuthErrorType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const submit = () => {
    if (authState.password !== authState.password_confirmation) {
      alert("Passwords do not match");
      return;
    }
    setLoading(true);

    axios
      .post("/api/auth/register", authState)
      .then((res) => {
        const response = res.data;
        if (response?.status === 201) {
          router.push(`/login?message=${response.message}`);
        } else if (response?.status === 400) {
          console.log("err from response status 400:", response.error);
          setErrors(response.error);
        }
      })
      .catch((err) => console.log("Error from register:", err))
      .finally(() => {
        setLoading(false);
      });
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
            <p>Explore the worlds best design for your next project.</p>
            <div className="mt-4">
              <Label className="mb-1" htmlFor="name">
                Name:
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name:"
                onChange={(e) =>
                  setAuthState({ ...authState, name: e.target.value })
                }
              />
              <span className="text-red-400 font-bold text-sm">
                {errors?.name}
              </span>
            </div>
            <div className="mt-4">
              <Label className="mb-1" htmlFor="email">
                Email:
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your Email:"
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
              <span className="text-red-400 font-bold text-sm">
                {errors?.email}
              </span>
            </div>
            <div className="mt-4">
              <Label className="mb-1" htmlFor="password">
                Password:
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your Password:"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
              <span className="text-red-400 font-bold text-sm">
                {errors?.password}
              </span>
            </div>
            <div className="mt-4">
              <Label className="mb-1" htmlFor="confirmPassword">
                Confirm Password:
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your confirmPassword:"
                onChange={(e) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>

            <div className="mt-4">
              <Button className="w-full" onClick={submit} disabled={loading}>
                {loading ? "processing..." : "Register"}
              </Button>
            </div>
            <div className="mt-2 text-center">
              <strong className="font-bold">Do you have an account ?</strong>
              <Link href="/login" className="ml-2 text-orange-400">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
