import { RegionObject } from "../models/schemas/RegionSchema"
import { AddressObject } from "../types/Address"
import { DistrictObject } from "../models/schemas/DistrictSchema"
import { PopulatedLocalityObject } from "../models/schemas/PopulatedLocalitySchema"
import { StreetObject } from "../models/schemas/StreetSchema"

export function createRegion(
  { keyword, value }: AddressObject,
  district: AddressObject,
  populatedLocality: AddressObject,
  street: AddressObject,
  house: AddressObject
): RegionObject {
  return {
    type: "REGION",
    keyword,
    value,
    districts: [createDistrict(district, populatedLocality, street, house)],
  }
}

export function createDistrict(
  { keyword, value }: AddressObject,
  populatedLocality: AddressObject,
  street: AddressObject,
  house: AddressObject
): DistrictObject {
  return {
    type: "DISTRICT",
    keyword,
    value,
    populatedLocalities: [createLocality(populatedLocality, street, house)],
  }
}
export function createLocality(
  { keyword, value }: AddressObject,
  street: AddressObject,
  house: AddressObject
): PopulatedLocalityObject {
  return {
    type: "POPULATED_LOCALITY",
    keyword,
    value,
    streets: [createStreet(street, house)],
  }
}
export function createStreet(
  { keyword, value }: AddressObject,
  house: AddressObject
): StreetObject {
  return {
    type: "STREET",
    keyword,
    value,
    houses: [createHouse(house)],
  }
}
export function createHouse({ keyword, value }: AddressObject): AddressObject {
  return {
    type: "HOUSE",
    keyword,
    value,
  }
}
