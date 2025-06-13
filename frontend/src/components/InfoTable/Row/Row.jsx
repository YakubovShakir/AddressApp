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
  const [regionData, setRegionData] = useState(null)
  const [districtData, setDistrictData] = useState(null)
  const [streetData, setStreetData] = useState(null)
  const [localityData, setLocalityData] = useState(null)
  const [visibleDataType, setVisibleDataType] = useState(false)

  useEffect(() => {
    if (address) {
      setDisplayValues({
        region: formatAddressPart(address.region),
        district: formatAddressPart(address.district),
        populated_locality: formatAddressPart(address.populatedLocality),
        street: formatAddressPart(address.street),
        house: formatAddressPart(address.house),
      })
      if (address?.region?.value) {
        getAddress(address?.region?.value).then((data) => {
          setRegionData(data)
        })
      }
    }
  }, [address])

  useEffect(() => {
    if (regionData) {
      const district = regionData?.districts.find(
        ({ value }) => value === address.district?.value
      )
      const locality = district?.populatedLocalities?.find(
        ({ value }) => value === address?.populatedLocality?.value
      )
      const street = locality?.streets.find(
        ({ value }) => value === address?.street?.value
      )

      setDistrictData(district)
      setLocalityData(locality)
      setStreetData(street)
    }
  }, [regionData])

  const getDistrictsFromRegion = () => {
    if (regionData) {
      return regionData?.districts?.map((district) =>
        formatAddressPart(district)
      )
    }
  }

  const getLocalitiesFromDistrict = () => {
    return districtData?.populatedLocalities?.map((locality) =>
      formatAddressPart(locality)
    )
  }

  const getStreetsFromLocality = () => {
    return localityData?.streets?.map((street) => formatAddressPart(street))
  }

  const getHousesFromStreet = () => {
    return streetData?.houses?.map((house) => formatAddressPart(house))
  }
  const possibleOptions = {
    district: getDistrictsFromRegion(),
    populated_locality: getLocalitiesFromDistrict(),
    street: getStreetsFromLocality(),
    house: getHousesFromStreet(),
  }

  const handleFocus = (type) => {
    setVisibleDataType(type)
  }
  const handleChange = (type, value) => {
    setDisplayValues((prev) => ({
      ...prev,
      [type]: value,
    }))
  }

  const handleBlur = async (type, value) => {
    setTimeout(() => setVisibleDataType(null), 20_000)
    if (!address) return

    const addressType = type.toUpperCase()
    address.setAddressType(addressType, value)

    if (
      type === "region" &&
      address?.region?.keyword &&
      address?.region?.value
    ) {
      const region = await getAddress(address?.region?.value)
      if (region) {
        setRegionData(region)
      }
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
    <div key={index} className={classes.cellContainer}>
      <div className={classes.inputWrapper}>
        <input
          type="text"
          value={displayValues[type] || ""}
          onChange={(e) => handleChange(type, e.target.value)}
          onBlur={(e) => handleBlur(type, e.target.value)}
          onFocus={() => handleFocus(type)}
          className={classes.rowInput}
          placeholder={type.replace("_", " ")}
        />
        {type !== "region" &&
          visibleDataType === type &&
          possibleOptions[type] && (
            <div className={classes.dropdownMenu}>
              {possibleOptions[type]?.map((option, i) => (
                <div
                  key={i}
                  className={classes.dropdownItem}
                  onClick={() => {
                    handleChange(type, option)
                    setVisibleDataType(null)
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {option}
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  ))

  const displayHeader = headerTitles?.map((value, index) => (
    <div key={index} className={classes.headerCell}>
      {value}
    </div>
  ))

  return (
    <div className={`${classes.row} ${isHeader ? classes.header : ""}`}>
      {isHeader ? displayHeader : displayAddress}
    </div>
  )
}

export default Row
