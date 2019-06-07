import React, { Component } from "react";

const Weather = props => (
  <div>
    {props.city && (
      <div>
        <p>
          Местопложение: {props.city}, {props.country}
        </p>
        <p>Температура: {props.temp} &#8451;</p>
        <p>Давление: {props.pressure}</p>
        <p>Заход солнца: {props.sunset}</p>
      </div>
    )}
  </div>
);

export default Weather;
