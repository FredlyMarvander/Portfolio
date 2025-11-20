import { OwnerModel } from "@/db/models/OwnerModel";
import { errHandler } from "@/helpers/errHandler";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const cookieStore = await cookies();

    if (!data.email) {
      throw { message: "Email is required", status: 400 };
    }

    if (!data.password) {
      throw { message: "Password is required", status: 400 };
    }

    const newData = await OwnerModel.login(data);
    cookieStore.set({
      name: "Authorization",
      value: `Bearer ${newData.access_token}`,
    });

    return Response.json({
      access_token: newData.access_token,
    });
  } catch (error) {
    return errHandler(error);
  }
}
