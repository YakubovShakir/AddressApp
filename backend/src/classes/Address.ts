import { TypedKeywords, AddressObjectType, AddressObject } from "../types/Address"

export const TYPED_KEYWORDS: TypedKeywords = {
  REGION: ["республика", "респ", "рес", "край", "область", "обл", "гфз", "фт"],
  DISTRICT: [
    "округ",
    "окр",
    "мрн",
    "мо",
    "городской",
    "городское",
    "сельское",
    "внутригородской",
    "внутригородская",
  ],
  POPULATED_LOCALITY: [
    "город",
    "г",
    "гор",
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
    "городского",
    "пгт",
    "рп",
    "кп",
    "гп",
    "п",
    "район",
    "рн",
  ],
  STREET: ["ул", "улица"],
  HOUSE: ["дом", "д"],
}

interface Address {
  region: AddressObject // наименование субъекта
  district: AddressObject // наименование муниципального района или округа
  populatedLocality: AddressObject // населенный пункт
  street: AddressObject // улица
  house: AddressObject // дом
}

class AddressImp implements Address {
  public region: AddressObject
  public district: AddressObject
  public populatedLocality: AddressObject
  public street: AddressObject
  public house: AddressObject

  constructor(
    region: AddressObject,
    district: AddressObject,
    populatedLocality: AddressObject,
    street: AddressObject,
    house: AddressObject
  ) {
    this.region = { ...region, type: "REGION" }
    this.district = { ...district, type: "DISTRICT" }
    this.populatedLocality = {
      ...populatedLocality,
      type: "POPULATED_LOCALITY",
    }
    this.street = { ...street, type: "STREET" }
    this.house = { ...house, type: "HOUSE" }
  }
  public checkPartType(type: AddressObjectType, value: string) {
    const keywords = TYPED_KEYWORDS[type]
    return keywords.includes(AddressImp.filterPart(value).toLowerCase())
  }

  public static isAddressObject(object: any): boolean {
    const type = object?.type
    const keyword = object?.keyword
    const value = object?.value

    if (!type || !keyword || !value) return false

    const types: AddressObjectType[] = [
      "REGION",
      "DISTRICT",
      "POPULATED_LOCALITY",
      "STREET",
      "HOUSE",
    ]
    if (!types.includes(type)) return false

    const keywords = TYPED_KEYWORDS[type as AddressObjectType]
    if (!keywords.includes(keyword.toLowerCase())) return false

    return true
  }

  public setAddressType(type: AddressObjectType, value: string) {
    let result: AddressObject

    const splited = value.split(" ")
    const keywords = TYPED_KEYWORDS[type]

    let keyword = splited.find((str) => keywords.includes(AddressImp.filterPart(str).toLowerCase()))
    if (!keyword) {
      result = {
        type,
        keyword: "",
        value: splited.join(" ").trim(),
      }
    } else {
      splited.splice(splited.indexOf(keyword), 1)
      value = splited.join(" ").trim()

      result = {
        type,
        keyword,
        value,
      }
    }

    switch (type) {
      case "REGION":
        this.region = result
        break
      case "DISTRICT":
        this.district = result
        break
      case "POPULATED_LOCALITY":
        this.populatedLocality = result
        break
      case "STREET":
        this.street = result
        break
      case "HOUSE":
        this.house = result
        break
    }
  }

  public static parse(rawAddress: string): AddressImp | undefined {
    const filtered: string[] = this.splitAndFilterAddress(rawAddress)
    let region, district, populatedLocality, street, house
    let parsed

    for (let part of filtered) {
      parsed = this.parsePart(part)

      switch (parsed?.type) {
        case "REGION":
          region = parsed
          break
        case "DISTRICT":
          district = parsed
          break
        case "POPULATED_LOCALITY":
          populatedLocality = parsed
          break
        case "STREET":
          street = parsed
          break
        case "HOUSE":
          house = { ...parsed, value: String(parsed.value) }
          break
      }
    }
    if (region && district && populatedLocality && street && house)
      return new AddressImp(region, district, populatedLocality, street, house)
  }

  private static splitAndFilterAddress(rawAddress: string): string[] {
    const splited = rawAddress.split(",")
    const filtered = splited.map((part) => this.filterPart(part))
    return filtered
  }

  private static filterPart(part: string): string {
    return part.replace(/[.\/]/g, "")
  }

  private static parsePart(part: string): AddressObject | undefined {
    const splited = part.split(" ")

    let keywords: string[]
    let value: string

    for (const type of Object.keys(TYPED_KEYWORDS) as AddressObjectType[]) {
      keywords = TYPED_KEYWORDS[type]

      let keyword = splited.find((str) => keywords.includes(str.toLowerCase()))
      if (!keyword) continue

      splited.splice(splited.indexOf(keyword), 1)
      value = splited.join(" ").trim()

      return {
        type,
        keyword,
        value,
      }
    }
  }
}

export default AddressImp
