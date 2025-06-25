import getAddress from "../../../api/getAddress"
import AddressImp, { TYPED_KEYWORDS } from "../../../classes/Address"
import formatAddressPart from "../../../utils/formatAddressPart"
import classes from "./Row.module.css"
import { useEffect, useState } from "react"

const Row = ({ address, updateAddress, headerTitles, isHeader }) => {
  const [displayValues, setDisplayValues] = useState({
    region: "",
    district: "",
    locality: "",
    street: "",
    house: "",
  })

  const [visiblePossibleOptions, setVisiblePossibleOptions] = useState(null)
  const [possibleOptions, setPossibleOptions] = useState(null)

  const [errors, setErrors] = useState({
    region: false,
    district: false,
    locality: false,
    street: false,
    house: false,
  })
  const [errorMessages, setErrorMessages] = useState({
    region: "",
    district: "",
    locality: "",
    street: "",
    house: "",
  }) 

  useEffect(() => {
    if (address) {
      setDisplayValues({
        region: formatAddressPart(address.region),
        district: formatAddressPart(address.district),
        locality: formatAddressPart(address.locality),
        street: formatAddressPart(address.street),
        house: formatAddressPart(address.house),
      })
    }
  }, [address])

  useEffect(() => {
    if (visiblePossibleOptions) {
      getAddress(
        {
          region: address?.region,
          district: address?.district,
          locality: address?.locality,
          street: address?.street,
          house: address?.house,
        },
        visiblePossibleOptions
      ).then((options) => {
        setPossibleOptions(options)
      })
    }
  }, [visiblePossibleOptions])

  const handleFocus = (type) => {
    setVisiblePossibleOptions(type)
  }
  const handleChange = (type, value) => {
  if (errors[type]) {
    setErrors(prev => ({ ...prev, [type]: false }));
    setErrorMessages(prev => ({ ...prev, [type]: "" }));
  }
  
  setDisplayValues((prev) => ({
    ...prev,
    [type]: value,
  }));
};

   const handleBlur = async (type, value) => {
  setTimeout(() => setVisiblePossibleOptions(null), 200);
  
  if (!address) return;

  setErrors(prev => ({ ...prev, [type]: false }));
  setErrorMessages(prev => ({ ...prev, [type]: "" }));

  if (!value.trim()) {
    return;
  }

  const addressType = type.toUpperCase();
  const { result, isValid } = address.setAddressType(addressType, value);

  if (!isValid) {
    setErrors(prev => ({ ...prev, [type]: true }));
    setErrorMessages(prev => ({
      ...prev,
      [type]: `Некорректный формат.`
    }));
    return;
  }

  setDisplayValues({
    region: formatAddressPart(address.region),
    district: formatAddressPart(address.district),
    locality: formatAddressPart(address.locality),
    street: formatAddressPart(address.street),
    house: formatAddressPart(address.house),
  });

  const updatedAddress = new AddressImp(
    address.region,
    address.district,
    address.locality,
    address.street,
    address.house
  );
  updateAddress(updatedAddress);
};

  const getInputClassName = (type) => {
    return `${classes.rowInput} ${errors[type] ? classes.errorInput : ''}`
  }

   const displayAddress = [
    { type: "region" },
    { type: "district" },
    { type: "locality" },
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
          className={getInputClassName(type)}
          placeholder={type.replace("_", " ")}
        />
        {errors[type] && displayValues[type] && (
          <div className={classes.errorTooltip}>
            {errorMessages[type]}
          </div>
        )}
        {visiblePossibleOptions === type && possibleOptions && !displayValues[type] && (
          <div className={classes.dropdownMenu}>
            {possibleOptions?.map((option, i) => (
              <div
                key={i}
                className={classes.dropdownItem}
                onClick={() => {
                  handleChange(type, option?.keyword + " " + option?.value)
                  setVisiblePossibleOptions(null)
                }}
                onMouseDown={(e) => e.preventDefault()}
              >
                {formatAddressPart({value: option?.value, keyword: option?.keyword, type})}
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
