import District from "../../models/District"
import House from "../../models/House"
import Locality from "../../models/Locality"
import Region from "../../models/Region"
import Street from "../../models/Street"
import { AddressPart } from "../../types/Address"
import { findIntersection } from "../../utils/utils"

async function findHouses(
  region: AddressPart | undefined,
  district: AddressPart | undefined,
  locality: AddressPart | undefined,
  street: AddressPart | undefined
) {
  const regions = region && (await Region.find(region))
  const districts = district && (await District.find(district))
  const localities = locality && (await Locality.find(locality))
  const streets = street && (await Street.find(street))

  if (!regions && !districts && !localities && !streets) return await House.find({})

  const setOfIds = [
    regions &&
      (await House.find({ regionID: { $in: regions.map((region) => region.id) } })).map(
        (house) => house.id
      ),
    districts &&
      (await House.find({ districtID: { $in: districts.map((district) => district.id) } })).map(
        (house) => house.id
      ),
    localities &&
      (await House.find({ localityID: { $in: localities.map((locality) => locality.id) } })).map(
        (house) => house.id
      ),
    streets &&
      (await House.find({ streetID: { $in: streets.map((street) => street.id) } })).map(
        (house) => house.id
      ),
  ]
    .filter((set) => typeof set !== "undefined")
    .filter((set) => set.length > 0)

  if (setOfIds.length === 0) return []

  let interSet = findIntersection(setOfIds)
  if (interSet.length === 0) return []

  const houses = await Promise.all(interSet.map(async (id) => await House.findOne({ _id: id })))

  return houses
}

export default findHouses
