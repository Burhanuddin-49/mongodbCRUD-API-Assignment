import mongoose, { Schema } from "mongoose";

const personalDetailsSchema = new Schema({
  publicId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
});

const PersonalDetails =
  mongoose.models.PersonalDetails ||
  mongoose.model("PersonalDetails", personalDetailsSchema);

export default PersonalDetails;
