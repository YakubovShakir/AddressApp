import { TypedKeywords, AddressObjectType, AddressObject } from "../types/Address"

const TYPED_KEYWORDS: TypedKeywords = {
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
  region: AddressObject | undefined // наименование субъекта ;
  district: AddressObject | undefined // наименование муниципального района или округа
  populatedLocality: AddressObject | undefined // населенный пункт
  street: AddressObject | undefined // улица
  house: AddressObject | undefined // дом
}

class AddressImp implements Address {
  public region: AddressObject | undefined
  public district: AddressObject | undefined
  public populatedLocality: AddressObject | undefined
  public street: AddressObject | undefined
  public house: AddressObject | undefined

  constructor(
    region?: AddressObject,
    district?: AddressObject,
    populatedLocality?: AddressObject,
    street?: AddressObject,
    house?: AddressObject
  ) {
    this.region = region
    this.district = district
    this.populatedLocality = populatedLocality
    this.street = street
    this.house = house
  }

  public static parse(rawAddress: string): AddressImp {
    const filtered: string[] = this.splitAndFilterAddress(rawAddress)
    let region, district, populatedLocality, street, house

    for (let part of filtered) {
      const parsed = this.parsePart(part)

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
          house = parsed
          break
      }
    }
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

      let keyword = splited.find((str) => keywords.includes(str))
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
