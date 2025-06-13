import { useEffect, useState } from "react"

import classes from "./App.module.css"

import Title from "./Components/Title/Title"
import FilePicker from "./components/FilePicker/FilePicker"
import SectionBlock from "./components/SectionBlock/SectionBlock"
import InfoTable from "./components/InfoTable/InfoTable"
import readFileInState from "./utils/readFileInState"

function App() {
  const [file, setFile] = useState(null)
  const [rawAddressses, setRawAddresses] = useState(null)

  useEffect(() => {
    if (file) readFileInState(file, setRawAddresses)
  }, [file])

  return (
    <>
      <div className={classes.header}>
        <Title>
          Валидация
          <br /> или <br />
          исправление адресов
        </Title>

        <SectionBlock width={40}>
          <FilePicker file={file} setter={setFile} />
        </SectionBlock>
      </div>

      <div className={classes.content}>
        <SectionBlock width={80}>
          {rawAddressses && <InfoTable rawAddresses={rawAddressses} />}
        </SectionBlock>
      </div>
    </>
  )
}

export default App
