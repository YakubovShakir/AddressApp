import District from "../../models/District"
import House from "../../models/House"
import Locality from "../../models/Locality"
import Region from "../../models/Region"
import Street from "../../models/Street"
import { AddressPart } from "../../types/Address"
import { findIntersection } from "../..//utils/utils"

async function findDistricts(
  region: AddressPart | undefined,
  locality: AddressPart | undefined,
  street: AddressPart | undefined,
  house: AddressPart | undefined
) {
  const localities = locality && (await Locality.find(locality))
  const streets = street && (await Street.find(street))
  const houses = house && (await House.find(house))
  if (!region && !localities && !streets && !houses) return await District.find({})

  const setOfIds = [
    region &&
      (await District.find({ regionID: (await Region.findOne(region))?.id })).map(
        (district) => district.id
      ),
    localities?.map((locality) => locality?.districtID).filter((el) => typeof el === "string"),
    streets?.map((street) => street?.districtID).filter((el) => typeof el === "string"),
    houses?.map((house) => house?.districtID).filter((el) => typeof el === "string"),
  ]
    .filter((set) => typeof set !== "undefined")
    .filter((set) => set.length > 0)
  if (setOfIds.length === 0) return []

  let interSet = findIntersection(setOfIds)
  if (interSet.length === 0) return []
  const districts = await Promise.all(
    interSet.map(async (id) => await District.findOne({ _id: id }))
  )
  return districts
}

export default findDistricts
