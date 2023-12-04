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
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "./ui/use-toast";

export default function PostDeleteBtn({ id }: { id: number }) {
  const router = useRouter();
  const { toast } = useToast();
  const deletePost = () => {
    axios
      .delete(`/api/user/ui/${id}`)
      .then((res) => {
        const response = res.data;
        if (response.status === 200) {
          toast({
            title: "Success",
            description: response.message,
            className: "bg-green-400",
          });
          router.refresh();
        }
      })
      .catch((err) => {
        console.log("Error while deleting post:", err);
      });
  };
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Del</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              If this post deleted then you can't recover it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500" onClick={deletePost}>
              Yes, delete it
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
