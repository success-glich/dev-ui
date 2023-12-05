import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NavBar from "@/components/NavBar";
import { headers } from "next/headers";
import { get } from "http";
import PostCard from "@/components/PostCard";

// * fetch user's post
export async function getAllPosts() {
  const res = await fetch(`${process.env.APP_URL}/api/ui`, {
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}

export default async function Home() {
  // const session = await getServerSession(authOptions);
  const data = await getAllPosts();
  console.log("The data is", data);
  // console.log(session);
  return (
    <div>
      <NavBar />

      <div className="container">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-5xl font-bold">UI Home</h1>
          <p className="text-3xl">
            Find worlds Best UI/Ux from amazing developers.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:items-center sm:place-content-center lg:grid-cols-2">
            {data !== undefined && data?.length > 0 ? (
              <>
                {data.map((item: PostType) => (
                  <PostCard post={item} key={item.id} />
                ))}
              </>
            ) : (
              <div>NO posts yet</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
