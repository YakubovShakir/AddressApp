import District from "../../models/District"
import House from "../../models/House"
import Locality from "../../models/Locality"
import Region from "../../models/Region"
import Street from "../../models/Street"
import { AddressPart } from "../../types/Address"
import { findIntersection } from "../../utils/utils"

async function findRegions(
  district: AddressPart | undefined,
  locality: AddressPart | undefined,
  street: AddressPart | undefined,
  house: AddressPart | undefined
) {
  const districts = district && (await District.find(district))
  const localities = locality && (await Locality.find(locality))
  const streets = street && (await Street.find(street))
  const houses = house && (await House.find(house))

  if (!districts && !localities && !streets && !houses) return await Region.find({})

  const setOfIds = [
    districts?.map((district) => district?.regionID).filter((el) => typeof el === "string"),
    localities?.map((locality) => locality?.regionID).filter((el) => typeof el === "string"),
    streets?.map((street) => street?.regionID).filter((el) => typeof el === "string"),
    houses?.map((house) => house?.regionID).filter((el) => typeof el === "string"),
  ]
    .filter((set) => typeof set !== "undefined")
    .filter((set) => set.length > 0)

  if (setOfIds.length === 0) return []

  let interSet = findIntersection(setOfIds)
  if (interSet.length === 0) return []

  const regions = await Promise.all(interSet.map(async (id) => await Region.findOne({ _id: id })))

  return regions
}

export default findRegions
