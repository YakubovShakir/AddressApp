import classes from './ActionButton.module.css';

const ActionButton = ({ children, onClick }) => {
  return (
    <button className={classes.actionButton} onClick={onClick}>
      {children}
    </button>
  );
};

export default ActionButton;