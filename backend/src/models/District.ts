import { DISTRICT_KEYWORDS } from "../utils/utils"
import mongoose, { Schema } from "mongoose"

const model = new Schema({
  regionID: { type: String },
  keyword: { type: String, enum: DISTRICT_KEYWORDS },
  value: { type: String },
})

const District = mongoose.model("District", model)

export default District
