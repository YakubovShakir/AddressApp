import { Schema } from "mongoose"
import { AddressObject } from "../../types/Address"
import { StreetObject, StreetSchema } from "./StreetSchema"

export interface PopulatedLocalityObject extends AddressObject {
  streets: StreetObject[]
}

export const PopulatedLocalitySchema = new Schema<PopulatedLocalityObject>({
  type: {
    type: String,
    required: true,
    enum: ["POPULATED_LOCALITY"],
  },
  keyword: { type: String, required: true },
  value: {
    type: Schema.Types.Mixed,
    required: true,
  },
  streets: [{ type: StreetSchema, required: true, default: [] }],
})
