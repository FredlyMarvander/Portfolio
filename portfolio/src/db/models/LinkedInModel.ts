import { database } from "../config/mongodb";

export class LinkedInModel {
  static collection() {
    return database.collection("linkedin");
  }

  static getAllLinkedInPosts() {
    return this.collection().find().toArray();
  }
}
