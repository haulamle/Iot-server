import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const getAccesstoken = async (payload: {
  _id: Types.ObjectId;
  username: string;
  role: number;
}) => {
  const token = jwt.sign(payload, process.env.SECRET_KEY as string, {
    // expiresIn: "1d",
  });
  return token;
};
