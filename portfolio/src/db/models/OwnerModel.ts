import { Owner } from "@/type";
import { database } from "../config/mongodb";
import { comparePassword, hashPassword } from "@/helpers/bcrypt";
import { signToken, verifyWithJose } from "@/helpers/jwt";

export class OwnerModel {
  static collection() {
    return database.collection("owners");
  }

  static async register(ownerData: Owner) {
    const existingOwner = await this.collection().findOne({
      email: ownerData.email,
    });

    if (existingOwner) {
      throw { message: "Email already exists", status: 400 };
    }

    const result = await this.collection().insertOne({
      email: ownerData.email,
      password: hashPassword(ownerData.password),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return {
      ...ownerData,
    };
  }

  static async login(ownerData: Owner) {
    const owner = await this.collection().findOne({
      email: ownerData.email,
    });

    if (!owner) {
      throw { message: "Invalid email", status: 400 };
    }

    const comparePass = comparePassword(ownerData.password, owner.password);

    if (!comparePass) {
      throw { message: "Invalid password", status: 400 };
    }

    const token = signToken({ id: owner._id });

    return {
      access_token: token,
    };
  }
}
