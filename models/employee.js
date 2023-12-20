import mongoose, { Schema } from "mongoose";

const employeeSchema = new Schema({
  publicId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
  },
  department: {
    type: String,
  },
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeeSchema);

export default Employee;
