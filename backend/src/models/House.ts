import { HOUSE_KEYWORDS } from "../utils/utils"
import mongoose, { Schema } from "mongoose"

const schema = new Schema({
  regionID: { type: String },
  districtID: { type: String },
  localityID: { type: String },
  streetID: { type: String },
  keyword: { type: String, enum: HOUSE_KEYWORDS },
  value: { type: String },
})

const House = mongoose.model("House", schema)

export default House
