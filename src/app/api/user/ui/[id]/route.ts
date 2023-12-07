import {
  CustomSession,
  authOptions,
} from "@/app/api/auth/[...nextauth]/authOptions";
import prisma from "@/database/prisma.config";
import { generateRandomName } from "@/lib/utils";
import { CustomErrorReporter } from "@/validator/customErrorRepoter";
import { imageValidator } from "@/validator/imageValidator";
import { postSchema } from "@/validator/postSchema";
import vine, { errors } from "@vinejs/vine";
import { realpath, rmSync } from "fs";
import { unlink, writeFile } from "fs/promises";
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

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: number } }
) {
  let filename;
  const relativeUploadDir = "/uploads";
  const uploadDir = join(process.cwd(), "public", relativeUploadDir);
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({
        status: 401,
        message: "Unauthorized network call!",
      });
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(params.id),
      },
    });
    if (!existingPost) {
      return NextResponse.json({
        where: {
          id: Number(params.id),
        },
      });
    }
    const formData = await request.formData();

    let file = formData.get("image") as File | null;

    if (file) {
      await unlink(uploadDir + `/${existingPost.image}`);
      //upload file

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

      const uniqueName = Date.now() + "_" + generateRandomName(1, 9999);
      const imgExt = file?.name.split(".").pop();
      filename = uniqueName + "." + imgExt;
      await writeFile(`${uploadDir}/${filename}`, buffer);
    } else {
      filename = existingPost.image;
    }
    const body = {
      title: formData.get("title"),
      description: formData.get("description"),
      image: file?.name ?? filename,
      user_id: session?.user?.id,
    };

    // * Vine Js

    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(postSchema);
    const validData = await validator.validate(body);

    const updatePost = await prisma.post.update({
      data: {
        title: validData.title,
        description: validData.description,
        user_id: Number(validData.user_id),
        image: filename,
      },
      where: {
        id: Number(params.id),
      },
    });
    return NextResponse.json({
      status: 201,
      post: updatePost,
      message: "Post updated successfully!",
    });
  } catch (err) {
    if (filename) {
      unlink(`${uploadDir}/${filename}`);
    }

    if (err instanceof errors.E_VALIDATION_ERROR) {
      console.log(err);
      return NextResponse.json({ status: 400, errors: err.messages });
    }
    console.error("Update Post Error: ", err);
    return NextResponse.json({
      status: 400,
      message: "Something went wrong",
    });
  }
}
