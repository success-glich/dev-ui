import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import NavBar from "@/components/NavBar";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <NavBar />

      <Button>Add Post</Button>
    </div>
  );
}
