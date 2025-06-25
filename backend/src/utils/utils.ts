import { AddressObject } from "../types/Address"

export const REGION_KEYWORDS = ["республика", "респ", "рес", "край", "область", "обл", "гфз", "фт"]
export const DISTRICT_KEYWORDS = [
  "округ",
  "окр",
  "мрн",
  "мо",
  "городской",
  "городское",
  "сельское",
  "внутригородской",
  "внутригородская",
  "город",
  "г",
  "гор",
  "городского",
  "пгт",
  "гп",
]
export const LOCALITY_KEYWORDS = [
  "населенный",
  "нас",
  "пункт",
  "нп",
  "дачный",
  "поселок",
  "поселение",
  "пос",
  "дп",
  "дп",
  "сп",
  "сельский",
  "рп",
  "кп",
  "п",
  "район",
  "рн",
]
export const STREET_KEYWORDS = ["ул", "улица"]
export const HOUSE_KEYWORDS = ["дом", "д"]

export function isAddressPart(keyword: string): boolean {
  const isRegion = REGION_KEYWORDS.includes(keyword)
  const isDistrict = DISTRICT_KEYWORDS.includes(keyword)
  const isLocality = LOCALITY_KEYWORDS.includes(keyword)
  const isStreet = STREET_KEYWORDS.includes(keyword)
  const isHouse = HOUSE_KEYWORDS.includes(keyword)

  return isRegion || isDistrict || isLocality || isStreet || isHouse
}

export function findIntersection(setOfIDs: any[][]) {
  let interSet = setOfIDs[0]
  setOfIDs.forEach((set) => {
    interSet.filter((id: any) => set.includes(id))
  })

  return interSet
}
export function getAddressFromQuery(body: any): AddressObject {
  return {
    region:
      body?.region?.keyword && body?.region?.value
        ? {
            keyword: body.region.keyword.toLowerCase(),
            value: body.region.value.toLowerCase(),
          }
        : undefined,
    district:
      body?.district?.keyword && body?.district?.value
        ? {
            keyword: body.district.keyword.toLowerCase(),
            value: body.district.value.toLowerCase(),
          }
        : undefined,
    locality:
      body?.locality?.keyword && body?.locality?.value
        ? {
            keyword: body.locality.keyword.toLowerCase(),
            value: body.locality.value.toLowerCase(),
          }
        : undefined,
    street:
      body?.street?.keyword && body?.street?.value
        ? {
            keyword: body.street.keyword.toLowerCase(),
            value: body.street.value.toLowerCase(),
          }
        : undefined,
    house:
      body?.house?.keyword && body?.house?.value
        ? {
            keyword: body.house.keyword.toLowerCase(),
            value: Number(body.house.value),
          }
        : undefined,
  }
}
