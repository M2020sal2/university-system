import { adminModel } from "../../../DB/models/admin.model.js";
import CourseModel from "../../../DB/models/course.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const addCourse = asyncHandler(async (req, res, next) => {
  const {
    course_name,
    Prerequisites,
    credit_hour,
    instructorId,
    OpenForRegistration,
    desc,
  } = req.body;

  const course = {};

  // Check if the course name already exists
  const chkcourse = await CourseModel.findOne({ course_name: course_name });
  if (chkcourse) {
    return next(new Error("Course name already exists", { status: 400 }));
  } else {
    course.course_name = course_name;
  }

  // Assign prerequisites if provided
  if (Prerequisites && Prerequisites.length > 0) {
    for (const courseId of Prerequisites) {
      const course = await CourseModel.findById(courseId);
      if (!course) {
        return next(new Error("Invalid courseId", { status: 404 }));
      }
    }
    course.Prerequisites = Prerequisites;
  }

  // Check if instructorId is provided and valid

  if (instructorId) {
    const instructor = await adminModel.findById(instructorId);
    if (!instructor || instructor.role !== "instructor") {
      return next(new Error("Invalid instructorId", { status: 404 }));
    }
    course.instructorId = instructorId;
  }

  // Assign OpenForRegistration and description if provided
  if (OpenForRegistration !== undefined) {
    course.OpenForRegistration = OpenForRegistration;
  }

  if (desc) {
    course.desc = desc;
  }

  // Assign credit hour
  course.credit_hour = credit_hour;

  // Create the course
  const result = await CourseModel.create(course);
  return res
    .status(201)
    .json({ message: "Course created successfully", course: result });
});

export const updatecourse = asyncHandler(async (req, res, next) => {
  const { courseId } = req.query;
  const {
    course_name,
    Prerequisites,
    credit_hour,
    instructorId,
    OpenForRegistration,
    desc,
  } = req.body;

  const course = {};
  const findcourse = await CourseModel.findById(courseId);
  if (!findcourse) {
    return next(new Error("Invalid courseId", { cause: 404 }));
  }

  if (course_name) {
    const chkcourse = await CourseModel.findOne({ course_name });
    if (chkcourse && chkcourse._id.toString() != courseId) {
      return next(new Error("course Name Is Already Exist ", { cause: 400 }));
    } else {
      course.course_name = course_name;
    }
  }

  if (Prerequisites) {
    for (const key of Prerequisites) {
      const chkId = await CourseModel.findById(key);
      if (!chkId) {
        return next(new Error("Invalid Prerequisites Ids"));
      }
    }
  }
});
