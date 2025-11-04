import { ObjectId } from "mongodb";

const jwt = require("jsonwebtoken");
import * as jose from "jose";
const JWT_SECRET = process.env.JWT_SECRET;

const signToken = (payload: { id: ObjectId }) => {
  return jwt.sign(payload, JWT_SECRET);
};

const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};

const verifyWithJose = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify<{ id: string }>(token, secret);
    return payload;
  } catch (error) {
    console.error("Error verifying token with JOSE:", error);
    throw { message: "Invalid token", status: 401 };
  }
};

export { signToken, verifyToken, verifyWithJose };
