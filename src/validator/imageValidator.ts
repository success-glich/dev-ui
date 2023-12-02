import { bytesToMb } from "@/lib/utils";

export function imageValidator(
  name: string | undefined,
  size: number | undefined
): string | null {
  let flag: string | null = null;

  if (name) {
    const imgExtent = name.split(".")[1];
    const imageExtTypes: Array<string> = ["svg", "png", "jpg", "jpeg", "gif"];
    if (!imageExtTypes.includes(imgExtent)) {
      flag = "Image must be .png, .jpeg, .jpg, ,.svg or .gif";
    } else {
      flag = null;
    }
  } else if (size) {
    const fileInMb = bytesToMb(size);
    if (fileInMb > 2) {
      flag = "Image size must be less than 2MB";
    } else {
      flag = null;
    }
  }
  return flag;
}
