import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "@/lib/appwrite";
import { cookies } from "next/headers";
import { AUTH_COOKIE_NAME } from "@/constants/server";

export const POST = async (req: NextRequest) => {
  try {
    const { account } = await createSessionClient();
    await account.deleteSession("current");
    const response = NextResponse.json({
      message: "User logged out",
    });
    response.cookies.delete(AUTH_COOKIE_NAME);
    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error?.message || "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
};
