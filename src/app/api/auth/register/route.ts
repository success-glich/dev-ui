import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { registerSchema } from "@/validator/authSchema";
import { CustomErrorReporter } from "@/validator/customErrorRepoter";
import bcrypt from "bcryptjs";
import prisma from "@/database/prisma.config";
import { User } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    vine.errorReporter = () => new CustomErrorReporter();

    const validator = vine.compile(registerSchema);
    const validatedData = await validator.validate(data);

    // * Check if email is already exist
    const user: User | null = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    if (user) {
      return NextResponse.json({
        status: 400,
        error: {
          email: "Email already exist!!",
        },
      });
    }

    // * Generate salt
    const salt = bcrypt.genSaltSync(10);
    validatedData.password = bcrypt.hashSync(validatedData.password, salt);

    // * To Create User
    await prisma.user.create({ data: validatedData });

    return NextResponse.json({
      status: 201,
      message: "Account created successfully!!",
      data: validatedData,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      console.log(error.messages);
      return NextResponse.json({ status: 400, error: error.messages });
    }
  }

  return NextResponse.json({ status: 200, msg: "All Good" });
}
