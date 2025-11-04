import { AboutModel } from "@/db/models/AboutModel";
import { errHandler } from "@/helpers/errHandler";
import { About } from "@/type";

export async function GET(req: Request) {
  try {
    const data = await AboutModel.getAbout();
    return Response.json(data);
  } catch (error) {
    return errHandler(error);
  }
}

export async function PUT(req: Request) {
  try {
    const receive: About = await req.json();
    console.log(receive);
    if (receive.openToWork === null) {
      throw { message: "OpenToWork is required", status: 400 };
    }

    if (!receive.sentence) {
      throw { message: "Sentence is required", status: 400 };
    }

    const data = await AboutModel.updateAbout(receive);

    return Response.json(data);
  } catch (error) {
    return errHandler(error);
  }
}
