import { OwnerModel } from "@/db/models/OwnerModel";
import { errHandler } from "@/helpers/errHandler";
import { Owner } from "@/type";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Simulate user registration logic

    if (!data.email) {
      return Response.json({ message: "Email is required" }, { status: 400 });
    }

    if (!data.password) {
      return Response.json(
        { message: "Password is required" },
        { status: 400 }
      );
    }

    const newData = await OwnerModel.register(data);

    return Response.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    return errHandler(error);
  }
}
