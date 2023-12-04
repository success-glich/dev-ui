import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/database/prisma.config";
import { rmSync } from "fs";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { join } from "path";

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized network call",
      });
    }
    const post: { image: string; id: number } | null =
      await prisma.post.findUnique({
        where: {
          id: Number(params.id),
        },
        select: {
          image: true,
          id: true,
        },
      });

    if (!post) {
      return NextResponse.json({ status: 400, message: "Post not found" });
    }

    // * Delete the old image
    const relativeUploadDir = "/uploads";
    const dir = join(process.cwd(), "public", relativeUploadDir);

    const path: string = dir + `/${post?.image}`;
    rmSync(path, { force: true });

    // * delete that record from db
    await prisma.post.delete({
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({
      status: 200,
      message: "Post Deleted successfully!",
    });
  } catch (err) {
    console.log("Delete Post Error: ", err);
    return NextResponse.json({ status: 400, message: "something went wrong" });
  }
}
