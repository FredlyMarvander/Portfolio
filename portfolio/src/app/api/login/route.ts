import { OwnerModel } from "@/db/models/OwnerModel";
import { errHandler } from "@/helpers/errHandler";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.email) {
      throw { message: "Email is required", status: 400 };
    }

    if (!data.password) {
      throw { message: "Password is required", status: 400 };
    }

    const newData = await OwnerModel.login(data);

    return Response.json({
      access_token: newData.access_token,
    });
  } catch (error) {
    return errHandler(error);
  }
}
