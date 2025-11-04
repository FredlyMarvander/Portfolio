import { About } from "@/type";
import { database } from "../config/mongodb";
import { ObjectId } from "mongodb";

export class AboutModel {
  static collection() {
    return database.collection("abouts");
  }

  static getAbout() {
    return this.collection().find().toArray();
  }

  static async updateAbout(aboutData: About) {
    const { id, openToWork, sentence } = aboutData;

    const newId = new ObjectId(id);

    const existData = await this.collection().findOne({
      _id: newId,
    });

    if (!existData) {
      throw { message: "Data doesn't exist", status: 404 };
    }

    const data = await this.collection().updateOne(
      {
        _id: newId,
      },
      {
        $set: {
          openToWork,
          sentence,
        },
      }
    );

    return data;
  }
}
