const bcrypt = require("bcryptjs");
import UserModel from "../models/UserModel";
import { getAccesstoken } from "../utils/getAccesstoken";

const login = async (req: any, res: any) => {
  const body = req.body;
  console.log(body);
  const { username, password } = body;
  try {
    const user: any = await UserModel.findOne({ username });

    if (!user) {
      throw new Error(`Tài khoản không tồn tại`);
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      throw new Error(
        "Đăng nhập thất bại, vui lòng kiểm tra lại username/Password và thử lại"
      );
    }

    delete user._doc.password;

    res.status(200).json({
      message: "Login successfuly!!!",
      data: {
        ...user._doc,
        token: await getAccesstoken({
          _id: user._id,
          username: user.username,
          role: user.rule ?? 1,
        }),
      },
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};
const refreshToken = async (req: any, res: any) => {
  const { id } = req.query;

  try {
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }

    const token = await getAccesstoken({
      _id: id,
      username: user.username,
      role: user.rule || 1,
    });

    res.status(200).json({
      message: "Get token successfully!!!",
      data: token,
    });
  } catch (error: any) {
    res.status(404).json({
      message: error.message,
    });
  }
};

export { login, refreshToken };
