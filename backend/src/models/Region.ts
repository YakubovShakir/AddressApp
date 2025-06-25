import { REGION_KEYWORDS } from "../utils/utils"
import mongoose, { Schema, Document } from "mongoose"

const schema = new Schema({
  keyword: { type: String, enum: REGION_KEYWORDS },
  value: { type: String },
})

const Region = mongoose.model("Region", schema)

export default Region
