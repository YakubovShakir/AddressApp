import { AddressObject } from "../types/Address"

function formatAddressPart(part: AddressObject) {
  const cond = part.keyword && part.value

  const keyFirst =
    part.type === "STREET" ||
    part.type === "POPULATED_LOCALITY" ||
    part.type === "HOUSE"

  const formated = cond
    ? keyFirst
      ? `${part.keyword} ${part.value}`
      : `${part.value} ${part.keyword}`
    : part.value || ""

  return formated
}

export default formatAddressPart
