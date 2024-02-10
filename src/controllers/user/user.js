import userModel from "../../../DB/models/user.model.js";
import { generateToken, storeRefreshToken } from "../../utils/Token.js";
import { asyncHandler } from "../../utils/errorHandling.js";
import bcrypt from "bcrypt";

export const add_stu = asyncHandler(async (req, res, next) => {
  let {
    Full_Name,
    National_Id,
    Student_Code,
    Semester,
    Level,
    Academic_Year,
    Date_of_Birth,
    PhoneNumber,
    gender,
    department,
  } = req.body;

  National_Id = parseInt(National_Id);
  Student_Code = parseInt(Student_Code);

  // التحقق من نجاح التحويل
  if (isNaN(National_Id) || isNaN(Student_Code)) {
    return next(new Error("Invalid National_Id or Student_Code"), {
      cause: 400,
    });
  }

  //chkeck National_Id
  const chkNational_Id = await userModel.findOne({ National_Id: National_Id });
  if (chkNational_Id) {
    return next(
      new Error("student National_Id is Already Exist", { cause: 400 })
    );
  }

  const chkStudent_Code = await userModel.findOne({
    Student_Code: Student_Code,
  });
  // check Student_Code
  if (chkStudent_Code) {
    return next(new Error("Student Code is Already Exist"), { cause: 400 });
  }

  const chkName = await userModel.findOne({
    Full_Name: Full_Name,
  });
  // check Student_Code
  if (chkName) {
    return next(new Error("Student Name is Already Exist"), { cause: 400 });
  }

  const student = {
    Full_Name,
    National_Id,
    Student_Code,
    Semester,
    Level,
    Academic_Year,
    Date_of_Birth,
    PhoneNumber,
    gender,
    role: "user",
  };
  //if department exist
  if (department) {
    student.department = department;
  }

  const result = await userModel.create(student);
  if (!result) {
    return next(new Error("Error Try Again later"), { cause: 400 });
  }
  return res.status(200).json({
    message: "student created successfully",
    student: {
      Full_Name: result.Full_Name,
      Student_Code: result.Student_Code,
    },
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { Student_Code, password } = req.body;
  //check Student_Code
  const user = await userModel.findOne({ Student_Code: Student_Code });
  if (!user) {
    return next(new Error("Invalid Student Code or password"), { cause: 400 });
  }

  if (user.password) {
    const chkpassword = await bcrypt.compare(password, user.password);
    if (!chkpassword) {
      return next(new Error("Invalid Student Code or password"), {
        cause: 400,
      });
    }
  } else {
    if (password != user.National_Id) {
      return next(new Error("Invalid Student Code or password"), {
        cause: 400,
      });
    }
  }
  //generate accessToken
  const accessToken = await generateToken({
    payload: { userId: user._id, role: user.role },
    signature: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: process.env.accessExpireIn,
  });

  //generate refreshToken
  const refreshToken = await generateToken({
    payload: { userId: user._id, role: user.role },
    signature: process.env.REFRESH_TOKEN_SECRET,
    expiresIn: process.env.REFRESH_ExpireIn,
  });

  const success = await storeRefreshToken(refreshToken, user._id, next);
  if (!success) {
    return next(new Error("Failed to store refresh token"), { cause: 500 });
  }
  return res.status(200).json({
    message: "done login",
    accessToken: accessToken,
    refreshToken: refreshToken,
    role: user.role,
  });
});

export const Getuser = asyncHandler(async (req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(
      new Error("Invalid User Data please Try Again", { cause: 500 })
    );
  }

  const result = {
    Full_Name: user.Full_Name,
    National_Id: user.National_Id,
    Student_Code: user.Student_Code,
    Semester: user.Semester,
    Level: user.Level,
    Academic_Year: user.Academic_Year,
    Date_of_Birth: user.Date_of_Birth,
    PhoneNumber: user.PhoneNumber,
    gender: user.gender,
    department: user.department,
  };
  return res.status(200).json({ message: "Done", result });
});
export const updateStudent = asyncHandler(async (req, res, next) => {
  const {
    Full_Name,
    National_Id,
    Student_Code,
    Semester,
    Level,
    Academic_Year,
    Date_of_Birth,
    PhoneNumber,
    gender,
    department,
    restpassword,
  } = req.body;
  const { userId } = req.query;
  console.log(userId);
  const user = await userModel.findById({ _id: userId });
  if (!user) {
    return next(new Error("user Not found", { cause: 404 }));
  }

  //check full name
  if (Full_Name) {
    const name = await userModel.findOne({ Full_Name: Full_Name });
    if (name) {
      return next(new Error("user Name is already exist", { cause: 400 }));
    }
    user.Full_Name = Full_Name;
  }

  //check  national id
  if (National_Id) {
    const chkNational_Id = await userModel.findOne({
      National_Id: National_Id,
    });
    if (chkNational_Id) {
      return next(new Error("National id is already exist", { cause: 400 }));
    }
    user.National_Id = National_Id;
  }

  if (Student_Code) {
    const chkStudent_Code = await userModel.findOne({
      Student_Code: Student_Code,
    });
    if (chkStudent_Code) {
      return next(new Error("Student code is already exist", { cause: 400 }));
    }
    user.Student_Code = Student_Code;
  }

  if (PhoneNumber) {
    const chkphone = await userModel.findOne({
      PhoneNumber: PhoneNumber,
    });
    if (chkphone) {
      return next(new Error("phone number is already exist", { cause: 400 }));
    }
    user.PhoneNumber = PhoneNumber;
  }
  if (restpassword) {
    user.password = National_Id || user.National_Id;
    delete user.password;
  }
  user.Semester = Semester || user.Semester;
  user.Level = Level || user.Level;
  user.Academic_Year = Academic_Year || user.Academic_Year;
  user.gender = gender || user.gender;
  user.Date_of_Birth = Date_of_Birth || user.Date_of_Birth;
  user.department = department || user.department;

  const result = await user.save();
  if (!result) {
    return next(new Error("Error In update user information", { cause: 500 }));
  }
  res.status(200).json({
    message: "Student information updated successfully",
    result: result,
  });
});

export const deleteStudent = asyncHandler(async (req, res, next) => {
  const { userId } = req.query;
  const user = await userModel
    .findByIdAndDelete({ _id: userId }, {}, { new: true })
    .select("_id Full_Name Student_Code gender");
  console.log(user);
  if (!user) {
    return next("user Id not found", { cause: 404 });
  }
  res.json({ message: "user Delete successfully", user: user });
});

export const logout = asyncHandler(async (req, res, next) => {});
