import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      Hello world!!
      <Button>Add Post</Button>
      <div> {JSON.stringify(session)}</div>
    </div>
  );
}
