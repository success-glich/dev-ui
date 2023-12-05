"use client";
import NavBar from "@/components/NavBar";
import PostCard from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import axios from "axios";
import React, { useState } from "react";
export default function Explore() {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    setPosts([]);
    setNotFound(false);
    if (search.length) {
      setLoading(true);
      axios
        .get(`/api/ui/search?query =${search}`)
        .then((res) => {
          const response = res.data;
          console.log(response);
          if (response.status === 200) {
            if (response.data?.length > 0) {
              setPosts(response.data);
            } else {
              setNotFound(true);
            }
          }
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("explore page error:", err);
        });
    }
  };
  return (
    <div>
      <NavBar />
      <div className="container">
        <div className="flex justify-center items-center flex-col mt-10">
          <form onSubmit={submit}>
            <Input
              type="text"
              placeholder="Search"
              className="w-full lg:w-[700px] h-10 rounded-lg text-2xl"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          {loading && (
            <h1 className="text-2xl text-orange-200 font-bold">Loading..</h1>
          )}
          {notFound && (
            <h1 className="text-2xl text-red-400 font-bold">No record Found</h1>
          )}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5">
            {posts.length > 0 &&
              posts.map((item) => <PostCard key={item.id} post={item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
