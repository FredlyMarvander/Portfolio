import { ObjectId } from "mongodb";
import { database } from "../config/mongodb";
import { Experience } from "@/type";

export class ExperienceModel {
  static collection() {
    return database.collection("experiences");
  }

  static async getAll() {
    return this.collection().find().toArray();
  }

  static async create(experienceData: Experience) {
    const result = await this.collection().insertOne({
      ...experienceData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return result;
  }

  static async update(experienceData: Experience) {
    const { _id, title, company, description, startDate, endDate, image } =
      experienceData;
    const newId = new ObjectId(_id);
    const data = await this.collection().findOne({
      _id: newId,
    });

    if (!data) {
      throw { message: "Experience doesn't exist", status: 404 };
    }

    const dataUpdate = await this.collection().updateOne(
      {
        _id: newId,
      },
      {
        $set: {
          title,
          company,
          description,
          startDate,
          endDate,
          image,
        },
      }
    );

    return dataUpdate;
  }

  static async delete(id: ObjectId) {
    const newId = new ObjectId(id);

    const data = await this.collection().findOne({ _id: newId });

    if (!data) {
      throw { message: "Experience doesn't exist", status: 404 };
    }

    const result = await this.collection().deleteOne({ _id: newId });
    return result;
  }
}
