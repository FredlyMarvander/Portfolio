import { Skill } from "@/type";
import { database } from "../config/mongodb";

export class SkillModel {
  static collection() {
    return database.collection("skills");
  }

  static getAllSkills() {
    return this.collection().find().toArray();
  }
}
