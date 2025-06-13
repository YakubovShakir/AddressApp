import { Schema } from "mongoose"
import { PopulatedLocalityObject, PopulatedLocalitySchema } from "./PopulatedLocalitySchema"
import { AddressObject } from "../../types/Address"

export interface DistrictObject extends AddressObject {
  populatedLocalities: PopulatedLocalityObject[]
}

export const DistrictSchema = new Schema<DistrictObject>({
  type: {
    type: String,
    required: true,
    enum: ["DISTRICT"],
  },
  keyword: { type: String, required: true },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  populatedLocalities: [{ type: PopulatedLocalitySchema, required: true, default: [] }],
})
