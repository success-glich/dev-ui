import prisma from "@/database/prisma.config";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    return NextResponse.json({ status: 200, data: posts });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 400, message: "Server Error" });
  }
}
