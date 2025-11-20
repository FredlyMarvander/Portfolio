import { NextRequest, NextResponse } from "next/server";
import { verifyWithJose } from "./helpers/jwt";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  try {
    const cookieStore = await cookies();

    const authorization = cookieStore.get("Authorization");
    if (!authorization) {
      throw { message: "Unauthorized", status: "401" };
    }

    const [type, token] = authorization.value.split(" ");
    if (type !== "Bearer") {
      throw { message: "Invalid token type", status: "401" };
    }

    if (!token) {
      throw { message: "Token not provided", status: "401" };
    }

    const decoded = await verifyWithJose(token);

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", decoded.id);

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } catch (error: unknown) {
    return Response.json(
      {
        message:
          (error as { message: string }).message || "Internal Server Error",
      },
      { status: (error as { status: number }).status || 500 }
    );
  }
}
export const config = {
  matcher: ["/owner"],
};
