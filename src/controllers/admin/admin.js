import { adminModel } from "../../../DB/models/admin.model.js";
import { generateToken } from "../../utils/Token.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import { formatDOB } from "../../utils/formaDate.js";
import { hashpassword } from "../../utils/hashpassword.js";
import { sendconfirmEmail } from "../../utils/sendEmail.js";

export const CreateAdminInstructor = asyncHandler(async (req, res, next) => {
  const { FullName, email, password, phone, Date_of_Birth, gender, role } =
    req.body;

  //chk name
  const chkName = await adminModel.findOne({ FullName: FullName });
  if (chkName) {
    return next(new Error("FullName is Already Exist", { cause: 400 }));
  }

  const chkemail = await adminModel.findOne({ email: email });
  if (chkemail) {
    return next(new Error("Email is Already Exist", { cause: 400 }));
  }

  const chkphone = await adminModel.findOne({ phone: phone });
  if (chkphone) {
    return next(new Error("Phone is Already Exist", { cause: 400 }));
  }

  const passhashed = await hashpassword({
    password: password,
    saltRound: process.env.salt_Round,
  });

  const user = {
    FullName: FullName,
    email: email,
    password: passhashed,
    phone: phone,
    Date_of_Birth: Date_of_Birth,
    gender: gender,
    role: role,
    isconfrimed: false,
  };

  const result = await adminModel.create(user);
  if (!result) {
    return next(
      new Error("Error Can create admin or Instrctor", { cause: 500 })
    );
  }
  const link = `${req.protocol}://${req.headers.host}/Api/admin/confirmEmail`;
  const confirmEmail = await sendconfirmEmail(result, link);
  if (!confirmEmail) {
    return next(new Error("Email not send successFully", { cause: 400 }));
  }
  return res.status(201).json({
    message: "Created Successfully Check your Inbox",
    user: {
      FullName: result.FullName,
      Email: result.email,
      role: result.role,
    },
  });
});

export const logout = asyncHandler((req, res, next) => {});
export const login = asyncHandler((req, res, next) => {});
