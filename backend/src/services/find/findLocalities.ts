import District from "../../models/District"
import House from "../../models/House"
import Locality from "../../models/Locality"
import Region from "../../models/Region"
import Street from "../../models/Street"
import { AddressPart } from "../../types/Address"
import { findIntersection } from "../../utils/utils"

async function findLocalities(
  region: AddressPart | undefined,
  district: AddressPart | undefined,
  street: AddressPart | undefined,
  house: AddressPart | undefined
) {
  const regions = region && (await Region.find(region))
  const districts = district && (await District.find(district))
  const streets = street && (await Street.find(street))
  const houses = house && (await House.find(house))

  if (!regions && !districts && !streets && !houses) return await Locality.find({})
  const setOfIds = [
    regions &&
      (await Locality.find({ regionID: { $in: regions.map((region) => region.id) } })).map(
        (locality) => locality.id
      ),
    districts &&
      (await Locality.find({ districtID: { $in: districts.map((district) => district.id) } })).map(
        (locality) => locality.id
      ),
    streets?.map((street) => street?.localityID).filter((el) => typeof el === "string"),
    houses?.map((house) => house?.localityID).filter((el) => typeof el === "string"),
  ]
    .filter((set) => typeof set !== "undefined")
    .filter((set) => set.length > 0)

  if (setOfIds.length === 0) return []
  let interSet = findIntersection(setOfIds)
  if (interSet.length === 0) return []

  const localities = await Promise.all(
    interSet.map(async (id) => await Locality.findOne({ _id: id }))
  )

  return localities
}

export default findLocalities
