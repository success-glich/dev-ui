import prisma from "@/database/prisma.config";
import { NextResponse, NextRequest } from "next/server";
import {
  CustomSession,
  authOptions,
} from "../../auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import vine, { Vine, errors } from "@vinejs/vine";
import { CustomErrorReporter } from "@/validator/customErrorRepoter";
import { postSchema } from "@/validator/postSchema";
import { imageValidator } from "@/validator/imageValidator";
import { join } from "path";
import { generateRandomName } from "@/lib/utils";
import { writeFile } from "fs/promises";

export async function GET(request: NextRequest) {
  // const session
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ status: 401, message: "unauthorized" });
    }

    const posts = await prisma.post.findMany({
      orderBy: {
        id: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
      where: {
        user_id: Number(session.user?.id),
      },
    });
    return NextResponse.json({ status: 200, data: posts }, { status: 200 });
  } catch (err) {
    return NextResponse.json({
      status: 400,
      errors: {
        message: "Internal Server Error !",
      },
    });
  }
}

export async function POST(req: NextRequest) {
  // const posts = await prisma.post.findMany();

  try {
    // const session: CustomSession | null = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ status: 401, message: "unauthorized" });
    // }
    const formData = await req.formData();
    console.log(formData.get("user_id"));
    const file = formData.get("image") as File | null;
    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: file?.name,
      user_id: formData.get("user_id"),
    };

    // * Vine Validation logic
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const validData = await validator.validate(body);

    // * Image Validation business logic
    const isImageNotValid: string | null = imageValidator(
      file?.name,
      file?.size
    );
    if (isImageNotValid) {
      return NextResponse.json({
        status: 400,
        errors: {
          image: isImageNotValid,
        },
      });
    }
    // * Upload Image
    const buffer = Buffer.from(await file!.arrayBuffer());
    const relativeUploadDir = "/uploads";
    const uploadDir = join(process.cwd(), "public", relativeUploadDir);
    const uniqueName = Date.now() + "_" + generateRandomName(1, 9999);
    const imgExt = file?.name.split(".").pop();
    const filename = uniqueName + "." + imgExt;
    await writeFile(`${uploadDir}/${filename}`, buffer);

    const newPost = await prisma.post.create({
      data: {
        title: validData.title,
        description: validData.description,
        user_id: Number(validData.user_id),
        image: filename,
      },
    });
    return NextResponse.json({
      status: 201,
      post: newPost,
      message: "Post created successfully!",
    });
  } catch (err) {
    if (err instanceof errors.E_VALIDATION_ERROR) {
      console.log(err);
      return NextResponse.json({ status: 400, errors: err.messages });
    }
    return NextResponse.json({ status: 400, error: err });
  }
}
