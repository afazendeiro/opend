import React from "react";

function Button() {
  return (
    <div className="Chip-root makeStyles-chipBlue-108 Chip-clickable">
      <span onClick={props.handleClick} className="form-Chip-label">
        Sell
      </span>
    </div>
  );
}

export default Button;
