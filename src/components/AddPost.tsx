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

export default function AddPost() {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const toggleSheet = () => setSheetOpen(!sheetOpen);
  const [posts, setPosts] = useState({
    title: "",
    description: "",
  });
  const [image, setImage] = useState<File | null>();
  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setImage(file);
  };
  const submit = () => {
    console.log("the post states", posts);
    console.log("the file", image);
  };
  return (
    <div>
      <Sheet open={sheetOpen}>
        <SheetTrigger>
          <Button onClick={toggleSheet}>Add Post</Button>
        </SheetTrigger>
        <SheetContent showCloseBtn={false}>
          <SheetHeader>
            <SheetTitle>Add your amazing work</SheetTitle>
            <SheetDescription>
              Display your amazing UI/UX Work to the world.
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 ">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              onChange={(e) => {
                setPosts({ ...posts, title: e.target.value });
              }}
            />
          </div>

          <div className="mt-4 ">
            <Label htmlFor="desc">Description</Label>
            <Textarea
              id="desc"
              placeholder="Enter your Description..."
              onChange={(e) => {
                setPosts({ ...posts, description: e.target.value });
              }}
            />
            {/* <Input type="text" id="title" onChange={(e) => {}} /> */}
          </div>
          <div className="mt-4 ">
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              id="image"
              name="image"
              onChange={onFileChange}
            />
          </div>
          <SheetFooter>
            <div className="mt-4 flex gap-2 justify-items-start w-full ">
              <Button variant="default" onClick={submit}>
                Submit
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
