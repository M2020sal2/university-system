import SemesterModel from "../../../DB/models/semster.model.js";
import { asyncHandler } from "../../utils/errorHandling.js";

export const addsemster = asyncHandler(async (req, res, next) => {
  const { name, level, Academic_Year, term, MinAvailableHours } = req.body;
  console.log({ name, level, Academic_Year, term, MinAvailableHours });
  const chkname = await SemesterModel.findOne({ name: name });
  if (chkname) {
    return next(new Error("Semster name is already Exist", { cause: 400 }));
  }

  const semster = {
    name: name,
    level,
    Academic_Year,
    term,
    MinAvailableHours,
  };
  const result = await SemesterModel.create(semster);
  if (!result) {
    return next(new Error("ERROR Server try later", { cause: 500 }));
  }
  return res
    .status(201)
    .json({ message: "semster created successfully", result: { result } });
});
