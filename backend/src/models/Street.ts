import { STREET_KEYWORDS } from "../utils/utils"
import mongoose, { Schema } from "mongoose"

const schema = new Schema({
  regionID: { type: String },
  districtID: { type: String },
  localityID: { type: String },
  keyword: { type: String, enum: STREET_KEYWORDS },
  value: { type: String },
})

const Street = mongoose.model("Street", schema)

export default Street
