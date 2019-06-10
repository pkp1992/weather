import React, { Component, Fragment } from "react";
import styled from "styled-components";
import Info from "./components/Info";
import Form from "./components/Form";
import Weather from "./components/Weather";
import moment from "moment";

const API_KEY = "7a71ec93e73a52450354e2c5c84e19e7";

const Container = styled.div`
  width: 50%;
  margin: 20% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 25px;
  h2 {
    margin: 10px;
  }
  p {
    margin: 10px;
  }
  form {
    display: flex;
    align-items: center;
    @media (max-width: 550px) {
      flex-direction: column;
    }
  }
  input {
    margin: 0px 5px;
    padding: 10px;
    outline: none;
    font-family: "Amatic SC";
    font-size: 20px;
    ::placeholder {
      font-family: "Amatic SC";
      font-size: 20px;
    }
  }
  button {
    font-size: 25px;
    padding: 5px;
    border-radius: 5px;
    font-family: "Amatic SC";
    @media (max-width: 550px) {
      margin-top: 10px;
    }
  }
`;

class App extends Component {
  state = {
    temp: undefined,
    country: undefined,
    sunrise: undefined,
    pressure: undefined,
    error: undefined
  };
  gettingWeather = async e => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const api_city = transliterate(city);
    const api_url = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${api_city}&appid=${API_KEY}&units=metric`,
      { method: "GET" }
    );
    
    const data = await api_url.json();
    console.log();
    if (city && api_url.status !== 404) {
      this.setState({
        temp: parseInt(data.main.temp),
        city: city,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: moment(data.sys.sunset).format("LTS"),
        error: undefined
      });
      console.log(data);
    } else {
      this.setState({
        temp: undefined,
        country: undefined,
        sunrise: undefined,
        pressure: undefined,
        error: "Введите город"
      });
    }
  };
  render() {
    console.log(this.state);
    const { error } = this.state;

    return (
      <Container>
        <Info />
          <Form weatherMethod={this.gettingWeather} />
          {error || (
            <Weather
              temp={this.state.temp}
              city={this.state.city}
              country={this.state.country}
              pressure={this.state.pressure}
              sunset={this.state.sunset}
              error={this.state.sunset}
            />
          )}
      </Container>
    );
  }
}

export default App;

const transliterate = (function() {
  var rus = "щ   ш  ч  ц  ю  я  ё  ж  ъ  ы  э  а б в г д е з и й к л м н о п р с т у ф х ь".split(
      / +/g
    ),
    eng = "sh sh ch ts yu ya yo zh `` y' e` a b v g d e z i j k l m n o p r s t u f h `".split(
      / +/g
    );
  return function(text, engToRus) {
    var x;
    for (x = 0; x < rus.length; x++) {
      text = text
        .split(engToRus ? eng[x] : rus[x])
        .join(engToRus ? rus[x] : eng[x]);
      text = text
        .split(engToRus ? eng[x].toUpperCase() : rus[x].toUpperCase())
        .join(engToRus ? rus[x].toUpperCase() : eng[x].toUpperCase());
    }
    return text;
  };
})();

var txt = "Съешь ещё этих мягких французских булок, да выпей же чаю!";
// alert(transliterate("Ханой"));
// alert(transliterate(transliterate(txt), true));

///// //// lesson 19