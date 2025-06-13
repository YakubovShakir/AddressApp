import { Schema } from "mongoose"
import { AddressObject } from "../../types/Address"
import { DistrictObject, DistrictSchema } from "./DistrictSchema"

export interface RegionObject extends AddressObject {
  districts: DistrictObject[]
}
export const RegionSchema = new Schema<RegionObject>({
  type: {
    type: String,
    required: true,
    enum: ["REGION"],
  },
  keyword: { type: String, required: true },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  districts: [{ type: DistrictSchema, required: true, default: [] }],
})
