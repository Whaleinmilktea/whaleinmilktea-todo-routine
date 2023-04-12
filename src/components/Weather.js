import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";
import wDescEngToKor from "../data/wDescEngToKor";

const WeatherWrapper = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  height: 100%;
  margin-top: 50px;
`;

const WeatherBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 300px;
  background-color: #f7fbfc;
  border-radius: 5px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const SearchForm = styled.form``;

const LocaleSearch = styled.input`
  display: block;
  color: #141e61;
  ::placeholder {
    color: #eeeeee;
  }
  border: none;
  border-bottom: 2px solid #769fcd;
  background-color: transparent;
  outline: none;

  &:focus {
    outline: none;
  }
`;

const WeatherLocale = styled.h2`
  margin: 10px 0 10px 0;
  color: #769fcd;
`;

const WeatherDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 55%;
`;

const WeatherDetail = styled.div`
  color: #6b778d;
  font-size: 0.9rem;
  font-weight: 400;
  width: 100%;
  margin: 5px 0 5px 0;
`;

const Weather = () => {
  const [selectCity, setSelectCity] = useState("");
  const [searchCity, setSearchCity] = useState("seoul");
  const [weatherData, setWeatherData] = useState({});

  function convertKelvinToCelsius(temp) {
    if (temp === undefined || temp === null) {
      return null;
    }
    return (temp - 273.15).toFixed(2);
  }

  // * 비동기적으로 날씨데이터를 가져오는 함수
  useEffect(() => {
    if (searchCity === "") {
      return;
    }
    const fetchWeatherData = async () => {
      const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
      const CITY_NAME = searchCity;
      const API_URL = `http://api.openweathermap.org/data/2.5/weather?q=${CITY_NAME}&appid=${API_KEY}`;

      try {
        const res = await axios.get(API_URL);
        const convertedData = {
          // 켈빈온도에서 섭씨온도로 변환
          ...res.data,
          main: {
            ...res.data.main,
            temp_min: convertKelvinToCelsius(res.data.main.temp_min),
            temp_max: convertKelvinToCelsius(res.data.main.temp_max),
            feels_like: convertKelvinToCelsius(res.data.main.feels_like),
          },
        };
        setWeatherData(convertedData); // 변경된 날씨를 담아낼 상태변경함수
        console.log(convertedData);
      } catch (err) {
        console.log(err);
        alert("예기치 못한 오류가 발생했습니다.");
      }
    };
    fetchWeatherData();
  }, [searchCity]);

  // * 한글로 변환된 날씨 설명을 가져오기 위한 코드
  const weatherId = wDescEngToKor(weatherData.weather?.[0]?.id);

  console.log(weatherData.weather?.[0]?.id);

  // * form 태그의 submit 이벤트 핸들러 === 지역을 입력받아 api 요청을 보내는 함수
  function handleSelectCity(e) {
    e.preventDefault();
    if (selectCity !== "") {
      setSearchCity(selectCity.toLowerCase());
    }
  }

  // * input 태그의 change 이벤트 핸들러 === 지역을 입력받아 상태변경함수에 담아낼 함수
  function handleLocaleChange(e) {
    setSelectCity(e.target.value);
    LocaleSearch.value = "";
  }

  return (
    <>
      <WeatherWrapper>
        <WeatherBox>
          <SearchForm onSubmit={handleSelectCity}>
            <LocaleSearch
              type="text"
              onChange={handleLocaleChange}
              placeholder="Enter City Name"
              required
            />
          </SearchForm>
          <WeatherLocale>
            Weather in {`${searchCity.toUpperCase()}`}
          </WeatherLocale>
          <WeatherDetailWrapper>
          <WeatherDetail>
              날씨 개요 : {`${weatherId}`}
            </WeatherDetail>
            <WeatherDetail>
              최고 기온 : {`${weatherData.main?.temp_max}`} ℃
            </WeatherDetail>
            <WeatherDetail>
              최저 기온 : {`${weatherData.main?.temp_min}`} ℃
            </WeatherDetail>
            <WeatherDetail>
              체감 온도 : {`${weatherData.main?.feels_like}`} ℃
            </WeatherDetail>
            <WeatherDetail>
              풍속 : {`${weatherData.wind?.speed} m/s`}
            </WeatherDetail>
          </WeatherDetailWrapper>
        </WeatherBox>
      </WeatherWrapper>
    </>
  );
};

export default Weather;
