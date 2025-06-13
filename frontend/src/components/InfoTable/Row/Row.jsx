import getAddress from "../../../api/getAddress"
import AddressImp from "../../../classes/Address"
import formatAddressPart from "../../../utils/formatAddressPart"
import classes from "./Row.module.css"
import { useEffect, useState } from "react"

const Row = ({ address, updateAddress, headerTitles, isHeader }) => {
  const [displayValues, setDisplayValues] = useState({
    region: "",
    district: "",
    populated_locality: "",
    street: "",
    house: "",
  })

  useEffect(() => {
    if (address) {
      setDisplayValues({
        region: formatAddressPart(address.region),
        district: formatAddressPart(address.district),
        populated_locality: formatAddressPart(address.populatedLocality),
        street: formatAddressPart(address.street),
        house: formatAddressPart(address.house),
      })
    }
  }, [address])

  const handleChange = (type, value) => {
    setDisplayValues((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const handleBlur = async (type, value) => {
    if (!address) return

    const addressType = type.toUpperCase()
    address.setAddressType(addressType, value)

    if (type === "region") {
      console.log("SEEND", value)

      const region = await getAddress(address?.region?.value)
      console.log("RECEIVE REGION - ", region)
    }
    setDisplayValues({
      region: formatAddressPart(address.region),
      district: formatAddressPart(address.district),
      populated_locality: formatAddressPart(address.populatedLocality),
      street: formatAddressPart(address.street),
      house: formatAddressPart(address.house),
    })

    const updatedAddress = new AddressImp(
      address.region,
      address.district,
      address.populatedLocality,
      address.street,
      address.house
    )
    updateAddress(updatedAddress)
  }

  const displayAddress = [
    { type: "region" },
    { type: "district" },
    { type: "populated_locality" },
    { type: "street" },
    { type: "house" },
  ].map(({ type }, index) => (
    <input
      type="text"
      value={displayValues[type] || ""}
      key={index}
      onChange={(e) => handleChange(type, e.target.value)}
      onBlur={(e) => handleBlur(type, e.target.value)}
      className={classes.rowBlock}
    />
  ))

  const displayHeader = headerTitles?.map((value, index) => (
    <div key={index} className={classes.rowBlock}>
      {value}
    </div>
  ))

  return (
    <div className={`${classes.row} ${isHeader ? classes.header : ``}`}>
      {isHeader ? displayHeader : displayAddress}
    </div>
  )
}

export default Row
