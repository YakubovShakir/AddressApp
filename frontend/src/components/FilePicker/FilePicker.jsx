import { useEffect, useRef, useState } from "react"
import classes from "./FilePicker.module.css"

const FilePicker = ({ file, setter }) => {
  const fileInputRef = useRef(null)
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setter(file)
  }



  return (
    <div className={classes.filePicker}>
      <div className={classes.inputWrapper}>
        <input
          type="file"
          id="fileInput"
          className={classes.fileInput}
          onChange={handleFileChange}
          accept="text/*"
          ref={fileInputRef}
        />
        <label htmlFor="fileInput" className={classes.fileLabel}>
          {file ? file.name : "Выберите или перетащите файл"}
        </label>
      </div>
   
    </div>
  )
}

export default FilePicker
