/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';

export default function BusySpinner(props) {
  let element = <div />;
  if (props.busy) {
    element = (
      <div className="spinner">
        <div className="overlay" />
        <img className="icon" alt="loading" src="../assets/heart.png" />
      </div>
    );
  }
  return element;
}

BusySpinner.propTypes = {
  busy: PropTypes.bool,
};
