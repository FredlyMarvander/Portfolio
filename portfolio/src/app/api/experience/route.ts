import { ExperienceModel } from "@/db/models/ExperienceModel";
import { errHandler } from "@/helpers/errHandler";
import { Experience } from "@/type";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  try {
    const data: Experience = await ExperienceModel.getAll();
    return Response.json(data);
  } catch (error) {
    return errHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.title) {
      throw { message: "Title is required", status: 400 };
    }

    if (!data.company) {
      throw { message: "Company is required", status: 400 };
    }

    if (!data.description) {
      throw { message: "Description is required", status: 400 };
    }

    if (!data.startDate) {
      throw { message: "StartDate is required", status: 400 };
    }

    if (!data.endDate) {
      throw { message: "EndDate is required", status: 400 };
    }

    if (!data.image) {
      throw { message: "Image is required", status: 400 };
    }

    const newData = await ExperienceModel.create(data);

    return Response.json(
      { message: "Experience Added Successfully" },
      { status: 201 }
    );
  } catch (error) {
    return errHandler(error);
  }
}

export async function PUT(request: Request) {
  try {
    const data = await request.json();

    if (!data._id) {
      throw { message: "Id is required", status: 400 };
    }

    if (!data.title) {
      throw { message: "Title is required", status: 400 };
    }

    if (!data.company) {
      throw { message: "Company is required", status: 400 };
    }

    if (!data.description) {
      throw { message: "Description is required", status: 400 };
    }

    if (!data.startDate) {
      throw { message: "StartDate is required", status: 400 };
    }

    if (!data.endDate) {
      throw { message: "EndDate is required", status: 400 };
    }

    if (!data.image) {
      throw { message: "Image is required", status: 400 };
    }

    await ExperienceModel.update(data);

    return Response.json(
      { message: "Experience Update Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errHandler(error);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return Response.json({ message: "ID is required" }, { status: 400 });
    }

    const result = await ExperienceModel.delete(new ObjectId(id));
    return Response.json(
      { message: "Experience deleted successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return errHandler(error);
  }
}
