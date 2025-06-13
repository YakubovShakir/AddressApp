import Addresses, { AddressDocument } from "../models/Addresses"
import { RegionObject } from "../models/schemas/RegionSchema"
import { AddressObject } from "../types/Address"
import { DistrictObject } from "../models/schemas/DistrictSchema"
import { PopulatedLocalityObject } from "../models/schemas/PopulatedLocalitySchema"
import { StreetObject } from "../models/schemas/StreetSchema"

export async function findAddress(
  regionName: string,
  districtName: string,
  localityName: string,
  streetName: string,
  houseName: string
): Promise<AddressDocument | null> {
  const document = await findAddressDocument(regionName)
  if (!document) return null

  const district = findDistrict(document.region, districtName)
  if (!district) return null

  const locality = findPopulatedLocality(district, localityName)
  if (!locality) return null

  const street = findStreet(locality, streetName)
  if (!street) return null

  const house = findHouse(street, houseName)
  if (!house) return null
  return document
}

export async function findAddressDocument(regionName: string): Promise<AddressDocument | null> {
  const document = await Addresses.findOne({ "region.value": regionName })
  return document
}

export function findDistrict(
  region: RegionObject,
  districtName: string
): DistrictObject | undefined {
  for (let district of region.districts) {
    if (district.value === districtName) return district
  }
}

export function findPopulatedLocality(
  district: DistrictObject,
  localityName: string
): PopulatedLocalityObject | undefined {
  for (let locality of district.populatedLocalities) {
    if (locality.value === localityName) return locality
  }
}

export function findStreet(
  populatedLocality: PopulatedLocalityObject,
  streetName: string
): StreetObject | undefined {
  for (let street of populatedLocality.streets) {
    if (street.value === streetName) return street
  }
}

export function findHouse(street: StreetObject, houseName: string): AddressObject | undefined {
  for (let house of street.houses) {
    if (house.value === houseName) return street
  }
}
