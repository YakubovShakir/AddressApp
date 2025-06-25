import District from "../../models/District"
import { AddressPart } from "../../types/Address"

async function findOrAddDistrict(
  regionID: string | undefined,
  part: AddressPart
): Promise<string | undefined> {
  try {
    const baseQuery = {
      keyword: part.keyword,
      value: part.value,
    }

    const exactMatch = await District.findOne({
      ...baseQuery,
      ...(regionID && { regionID }),
    })

    if (exactMatch) return exactMatch.id

    if (regionID) {
      const districtWithoutRegion = await District.findOne({
        ...baseQuery,
        regionID: { $exists: false },
      })

      if (districtWithoutRegion) {
        await District.updateOne({ _id: districtWithoutRegion.id }, { $set: { regionID } })
        return districtWithoutRegion.id
      }
    }

    const newDistrict = await District.create({
      ...part,
      ...(regionID && { regionID }),
    })

    return newDistrict.id
  } catch (e) {
    console.error("Error in findOrAddDistrict -", e)
  }
}

export default findOrAddDistrict
