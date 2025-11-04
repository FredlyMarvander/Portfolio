import { Certificate } from "@/type";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export class CertificateModel {
  static collection() {
    return database.collection("certificates");
  }

  static getCertificates() {
    return this.collection().find().toArray();
  }

  static async addCertificate(dataCertificate: Certificate) {
    return this.collection().insertOne(dataCertificate);
  }

  static async updateCertificate(dataCertificate: Certificate) {
    const { _id, title, issuer, month, year, credentialUrl, description } =
      dataCertificate;

    const newId = new ObjectId(_id);

    const existingData = await this.collection().findOne({
      _id: newId,
    });

    if (!existingData) {
      throw { message: "Data doesn't exist", status: 404 };
    }

    return this.collection().updateOne(
      {
        _id: newId,
      },
      {
        $set: {
          title,
          issuer,
          month,
          year,
          credentialUrl,
          description,
        },
      }
    );
  }

  static async deleteCertificate(id: string) {
    const newId = new ObjectId(id);

    const data = await this.collection().findOne({ _id: newId });

    if (!data) {
      throw { message: "Certificate doesn't exist", status: 404 };
    }

    return this.collection().deleteOne({
      _id: newId,
    });
  }
}
