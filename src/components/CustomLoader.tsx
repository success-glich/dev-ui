import Image from "next/image";
import React from "react";

export default function CustomLoader() {
  return (
    <div className=" w-full flex justify-center items-center">
      <Image
        alt="Loading image"
        src="/images/loading.svg"
        width={400}
        height={400}
      />
      <h1 className="text-2xl font-bold">Loading please wait....</h1>
    </div>
  );
}
