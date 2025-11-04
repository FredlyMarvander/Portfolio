import { ProjectModel } from "@/db/models/ProjectModel";
import { errHandler } from "@/helpers/errHandler";

export async function GET(request: Request) {
  try {
    return Response.json(await ProjectModel.getAll());
  } catch (error) {
    return errHandler(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);

    if (!data.title) {
      throw { message: "Title is Required", status: 400 };
    }

    if (!data.description) {
      throw { message: "Description is Required", status: 400 };
    }

    if (data.skills.length === 0) {
      throw { message: "Skill is Required", status: 400 };
    }

    if (!data.link) {
      throw { message: "Link is Required", status: 400 };
    }

    if (!data.image) {
      throw { message: "Image is Required", status: 400 };
    }

    await ProjectModel.create(data);

    return Response.json(
      { message: "Project Created Successfully" },
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
      throw { message: "ID is Required", status: 400 };
    }

    if (!data.title) {
      throw { message: "Title is Required", status: 400 };
    }

    if (!data.description) {
      throw { message: "Description is Required", status: 400 };
    }

    if (data.skills.length === 0) {
      throw { message: "Skill is Required", status: 400 };
    }

    if (!data.link) {
      throw { message: "Link is Required", status: 400 };
    }

    if (!data.image) {
      throw { message: "Image is Required", status: 400 };
    }

    console.log("masuk update");

    await ProjectModel.update(data);

    return Response.json(
      { message: "Project Updated Successfully" },
      { status: 201 }
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

    const result = await ProjectModel.delete(id);
    return Response.json(
      { message: "Project deleted successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return errHandler(error);
  }
}
