import { useEffect, useState } from "react"
import classes from "./InfoTable.module.css"
import Row from "./Row/Row"
import AddressImp from "../../classes/Address"
import ActionButton from "../ActionButton/ActionButton" 
import formatAddressPart from "../../utils/formatAddressPart"
import downloadCSV from "../../utils/downloadCSV"
import addAddress from "../../api/addAddress"

const InfoTable = ({ rawAddresses }) => {
  const [addresses, setAddresses] = useState(
    rawAddresses.map((addr) => AddressImp.parse(addr))
  )

  const titles = ["Регион", "Город / Округ", "Населенный пункт", "Улица", "Дом"]

  useEffect(() => {
    setAddresses(rawAddresses.map((addr) => AddressImp.parse(addr)))
  }, [rawAddresses])

  const updateAddress = (index, updatedAddress) => {
    setAddresses((prev) => {
      const newAddresses = [...prev]
      newAddresses[index] = updatedAddress
      return newAddresses
    })
  }

  const handleDownload = () => {
    const rows = []

    rows.push(titles.join(";"))

    addresses.forEach((address) => {
      const row = [
        formatAddressPart(address.region),
        formatAddressPart(address.district),
        formatAddressPart(address.locality),
        formatAddressPart(address.street),
        formatAddressPart(address.house),
      ]
      rows.push(row.join(";"))
    })

    downloadCSV(rows.join("\n"), "Addresses")
  }
  const handleSave = async () => {
    let region, district, locality, street, house
    for (let address of addresses) {
      region = address?.region
      district = address?.district
      locality = address?.locality
      street = address?.street
      house = address?.house
    
      await addAddress(region, district, locality, street, house)
      
    }
  }
  return (
    <div className={classes.infoTable}>
      <div className={classes.actionsContainer}>
        <ActionButton onClick={handleSave}>Загрузить в базу</ActionButton>
        <ActionButton onClick={handleDownload}>Cкачать CSV</ActionButton>
      </div>
      <div className={classes.tableContainer}>
        <Row headerTitles={titles} isHeader />

        {addresses?.map((address, index) => (
          <Row
            key={index}
            address={address}
            updateAddress={(updated) => updateAddress(index, updated)}
          />
        ))}
      </div>
    </div>
  )
}

export default InfoTable
