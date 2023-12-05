import prisma from "@/database/prisma.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ status: 200, data: post });
  } catch (err) {
    console.log("Error in getPost", err);
    return NextResponse.json({ status: 400, message: "Error to get post!" });
  }
}
