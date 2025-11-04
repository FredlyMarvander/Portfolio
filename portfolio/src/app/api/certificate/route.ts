import { CertificateModel } from "@/db/models/CertificateModel";
import { errHandler } from "@/helpers/errHandler";
import { ObjectId } from "mongodb";

export async function GET(req: Request) {
  try {
    const data = await CertificateModel.getCertificates();

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}

export async function POST(req: Request) {
  try {
    const addData = await req.json();

    if (
      !addData.title ||
      !addData.issuer ||
      !addData.year ||
      !addData.credentialUrl ||
      !addData.month ||
      !addData.description
    ) {
      throw { message: "All fields are required", status: 400 };
    }

    const data = await CertificateModel.addCertificate(addData);

    return Response.json({ data }, { status: 201 });
  } catch (error) {
    return errHandler(error);
  }
}

export async function PUT(req: Request) {
  try {
    const updateData = await req.json();

    if (
      !updateData._id ||
      !updateData.title ||
      !updateData.issuer ||
      !updateData.year ||
      !updateData.credentialUrl ||
      !updateData.month ||
      !updateData.description
    ) {
      throw { message: "All fields are required", status: 400 };
    }

    const data = await CertificateModel.updateCertificate(updateData);

    return Response.json({ data }, { status: 200 });
  } catch (error) {
    return errHandler(error);
  }
}
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return Response.json({ message: "ID is required" }, { status: 400 });
    }

    const result = await CertificateModel.deleteCertificate(id);
    return Response.json(
      { message: "Certificate deleted successfully", data: result },
      { status: 200 }
    );
  } catch (error) {
    return errHandler(error);
  }
}
