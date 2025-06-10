export type AddressObjectType =
  | "REGION"
  | "DISTRICT"
  | "POPULATED_LOCALITY"
  | "STREET"
  | "HOUSE"

export type TypedKeywords = {
  [key in AddressObjectType]: string[]
}

type AddressObject = {
  type: AddressObjectType
  keyword: string
  value: string
}
