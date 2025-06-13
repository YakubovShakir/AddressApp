import classes from "./SectionBlock.module.css"

const SectionBlock = ({ width, height, children }) => {
  return (
    <div
      style={{ width: width + "%", height: height + "%" }}
      className={classes.sectionBlock}
    >
      {children}
    </div>
  )
}

export default SectionBlock
