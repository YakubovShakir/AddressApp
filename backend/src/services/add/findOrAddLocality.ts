import Locality from "../../models/Locality"
import { AddressPart } from "../../types/Address"

async function findOrAddLocality(
  regionID: string | undefined,
  districtID: string | undefined,
  part: AddressPart
): Promise<string | undefined> {
  try {
    const baseQuery = {
      keyword: part.keyword,
      value: part.value,
    }

    const exactMatch = await Locality.findOne({
      ...baseQuery,
      ...(regionID && { regionID }),
      ...(districtID && { districtID }),
    })

    if (exactMatch) return exactMatch.id

    const possibleQueries = []

    if (districtID) {
      possibleQueries.push({ ...baseQuery, districtID })
    }
    if (regionID) {
      possibleQueries.push({
        ...baseQuery,
        regionID,
        districtID: { $exists: false },
      })
    }

    for (const query of possibleQueries) {
      const foundLocality = await Locality.findOne(query)
      if (foundLocality) {
        const updates: Record<string, any> = {}
        if (districtID && !foundLocality.districtID) updates.districtID = districtID
        if (regionID && !foundLocality.regionID) updates.regionID = regionID

        if (Object.keys(updates).length > 0) {
          await Locality.updateOne({ _id: foundLocality._id }, { $set: updates })
        }
        return foundLocality.id
      }
    }

    const newLocality = await Locality.create({
      ...part,
      ...(regionID && { regionID }),
      ...(districtID && { districtID }),
    })

    return newLocality.id
  } catch (e) {
    console.error("Error in findOrAddLocality -", e)
  }
}

export default findOrAddLocality
