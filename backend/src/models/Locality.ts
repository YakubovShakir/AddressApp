import { LOCALITY_KEYWORDS } from "../utils/utils"
import mongoose, { Schema } from "mongoose"

const schema = new Schema({
  regionID: { type: String },
  districtID: { type: String },
  keyword: { type: String, enum: LOCALITY_KEYWORDS },
  value: { type: String },
})

const Locality = mongoose.model("Localities", schema)

export default Locality
