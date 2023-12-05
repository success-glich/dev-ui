import prisma from "@/database/prisma.config";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const query = url?.searchParams.get("query");
    const post = await prisma.post.findMany({
      where: {
        title: {
          contains: query ?? "",
        },
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
    console.log("Error at search controller", err);
    return NextResponse.json({ status: 400, message: "Server Error!" });
  }
}
