import { Project } from "@/type";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export class ProjectModel {
  static collection() {
    return database.collection("projects");
  }

  static getAll() {
    return this.collection().find().toArray();
  }

  static async create(projectData: Project) {
    return this.collection().insertOne({
      ...projectData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static async update(projectData: Project) {
    const { _id, title, description, skills, link, image } = projectData;

    const newId = new ObjectId(_id);

    const existData = await this.collection().findOne({
      _id: newId,
    });

    if (!existData) {
      throw { message: "Project Doesn't Exist", status: 404 };
    }

    return this.collection().updateOne(
      {
        _id: newId,
      },
      {
        $set: {
          title,
          description,
          skills,
          link,
          image,
        },
      }
    );
  }

  static async delete(id: string) {
    return this.collection().deleteOne({ _id: new ObjectId(id) });
  }
}
