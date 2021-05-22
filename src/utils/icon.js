import React from "react";
import PropTypes from "prop-types";

const Icon = (props) => (
  <svg width="22" height="22" viewBox="0 0 1024 1024">
    <path d={props.icon}></path>
  </svg>
);

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
