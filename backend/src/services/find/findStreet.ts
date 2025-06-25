import District from "../../models/District"
import House from "../../models/House"
import Locality from "../../models/Locality"
import Region from "../../models/Region"
import Street from "../../models/Street"
import { AddressPart } from "../../types/Address"
import { findIntersection } from "../../utils/utils"

async function findStreets(
  region: AddressPart | undefined,
  district: AddressPart | undefined,
  locality: AddressPart | undefined,
  house: AddressPart | undefined
) {
  const regions = region && (await Region.find(region))
  const districts = district && (await District.find(district))
  const localities = locality && (await Locality.find(locality))
  const houses = house && (await House.find(house))

  if (!regions && !districts && !localities && !houses) return await Street.find({})

  const setOfIds = [
    regions &&
      (await Street.find({ regionID: { $in: regions.map((region) => region.id) } })).map(
        (street) => street.id
      ),
    districts &&
      (await Street.find({ districtID: { $in: districts.map((district) => district.id) } })).map(
        (street) => street.id
      ),
    localities &&
      (await Street.find({ localityID: { $in: localities.map((locality) => locality.id) } })).map(
        (street) => street.id
      ),
    houses?.map((house) => house?.streetID).filter((el) => typeof el === "string"),
  ]
    .filter((set) => typeof set !== "undefined")
    .filter((set) => set.length > 0)

  if (setOfIds.length === 0) return []

  let interSet = findIntersection(setOfIds)
  if (interSet.length === 0) return []

  const streets = await Promise.all(interSet.map(async (id) => await Street.findOne({ _id: id })))

  return streets
}

export default findStreets
