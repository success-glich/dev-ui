"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function EditPost({ post }: { post: PostType }) {
  const router = useRouter();
  const { toast } = useToast();
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const toggleSheet = () => setSheetOpen(!sheetOpen);
  const [posts, setPosts] = useState({
    title: post?.title,
    description: post?.description,
  });
  const [image, setImage] = useState<File | null>();
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<postErrorType>({});
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file);
  };
  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", posts.title);
    formData.append("description", posts.description);

    {
      image && formData.append("image", image);
    }

    axios
      .put(`/api/user/ui/${post.id}`, formData)
      .then((res) => {
        const response = res.data;
        setLoading(false);
        if (response.status === 201) {
          setSheetOpen(false);
          toast({
            title: "Post updated successfully!",
            description: response.message,
            className: "bg-green-400",
          });
          router.refresh();
        } else if (response.status === 400) {
          // alert("Post not created");
          toast({
            title: "Post was not updated!",
            description: response?.message,
            className: "bg-red-400",
          });
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("The Post error is", err);
      });
  };
  return (
    <div>
      <Sheet open={sheetOpen}>
        <SheetTrigger>
          <Button variant="secondary" onClick={toggleSheet}>
            Edit
          </Button>
        </SheetTrigger>
        <SheetContent showCloseBtn={false}>
          <SheetHeader>
            <SheetTitle>Edit your amazing work</SheetTitle>
            <SheetDescription>
              Display your amazing UI/UX Work to the world.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 ">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={posts.title}
              onChange={(e) => {
                setPosts({ ...posts, title: e.target.value });
              }}
            />
            <span className="text-red-500 font-bold text-sm">
              {errors?.title}
            </span>
          </div>

          <div className="mt-4 ">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="Enter your Description..."
              value={posts.description}
              onChange={(e) => {
                setPosts({ ...posts, description: e.target.value });
              }}
            />
            {/* <Input type="text" id="title" onChange={(e) => {}} /> */}
            <span className="text-red-500 font-bold text-sm">
              {errors?.description}
            </span>
          </div>
          <div className="mt-4 ">
            <Image
              src={"http://localhost:3000/uploads/" + post?.image}
              alt="post"
              width={200}
              height={200}
            />
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={onFileChange}
            />
            <span className="text-red-500 font-bold text-sm">
              {errors?.image}
            </span>
          </div>
          <SheetFooter>
            <div className="mt-4 flex gap-2 justify-items-start w-full ">
              <Button variant="default" onClick={submit} disabled={loading}>
                {loading ? "Processing..." : "Submit"}
              </Button>
              <Button variant="destructive" onClick={toggleSheet}>
                Close
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
