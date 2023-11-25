import prisma from "@/database/prisma.config";
import { loginSchema } from "@/validator/authSchema";
import { CustomErrorReporter } from "@/validator/customErrorRepoter";
import { User } from "@prisma/client";
import vine, { errors } from "@vinejs/vine";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    vine.errorReporter = () => new CustomErrorReporter();
    const validator = vine.compile(loginSchema);
    const validData = await validator.validate(body);

    // * Check if email is exist or not
    const user: User | null = await prisma.user.findUnique({
      where: { email: validData.email },
    });
    if (!user) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "No account found with this email!",
        },
      });
    }

    const isPasswordMatch: boolean = bcrypt.compareSync(
      validData.password,
      user.password!
    );
    console.log("server error", isPasswordMatch);

    if (!isPasswordMatch) {
      return NextResponse.json({
        status: 400,
        errors: {
          email: "Invalid credentials!!",
        },
      });
    }

    return NextResponse.json({
      status: 200,
      message: "You logged in successfully",
    });
  } catch (err) {
    if (err instanceof errors.E_VALIDATION_ERROR) {
      return NextResponse.json({
        status: 400,
        errors: err.messages,
      });
    }
    return NextResponse.json({
      status: 500,
      errors: {
        message: "Internal Server Error !",
      },
    });
  }
}
