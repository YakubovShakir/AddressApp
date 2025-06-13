const reader = new FileReader()

function readFileInState(file: Blob, setState: React.Dispatch<any>) {
  reader.onload = () => {
    const data = reader.result as string
    setState(data.split("\n"))
  }
  reader.readAsText(file)
}

export default readFileInState
