import styled from "styled-components";
import { Input } from "antd";

interface city {
  lat_long: string;
  location_type: string;
  title: string;
  woeid: number;
}

export interface WeatherData {
  consolidated_weather?: ConsolidatedWeather[] | null;
  time: string;
  sun_rise: string;
  sun_set: string;
  timezone_name: string;
  parent: Parent;
  sources?: Sources[] | null;
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
  timezone: string;
}
export interface ConsolidatedWeather {
  id: number;
  weather_state_name: string;
  weather_state_abbr: string;
  wind_direction_compass: string;
  created: string;
  applicable_date: string;
  min_temp: number;
  max_temp: number;
  the_temp: number;
  wind_speed: number;
  wind_direction: number;
  air_pressure: number;
  humidity: number;
  visibility: number;
  predictability: number;
}

interface Parent {
  title: string;
  location_type: string;
  woeid: number;
  latt_long: string;
}

interface Sources {
  title: string;
  slug: string;
  url: string;
  crawl_rate: number;
}

interface headerProps {
  isLoading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setData: React.Dispatch<React.SetStateAction<WeatherData[]>>;
}

export const Header = ({
  isLoading,
  setLoading,
  setError,
  setData,
}: headerProps) => {
  const search = (city: string) => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_WEATHER_API_ROOT}/search/?query=${city}`)
      .then(async (response) => {
        if (response.ok) {
          let data = await response.json();
          return data;
        }

        if (response.status === 404 || response.status === 401) {
          setLoading(false);
          return Promise.reject("Error Happens");
        }
      })
      .then((data) => {
        let requests: [Promise<Response>] = data.map((item: city | null) =>
          fetch(`${process.env.REACT_APP_WEATHER_API_ROOT}/${item?.woeid}`)
        );
        Promise.all(requests)
          .then(async (reponses) => {
            for (let response of reponses) {
              if (response.status === 404 || response.status === 401) {
                setLoading(false);
                return Promise.reject("Error Happens");
              }
            }

            let weathers = await Promise.all(reponses.map((r) => r.json()));
            return weathers;
          })
          .then((weathers) => {
            setLoading(false);
            setData(weathers);
          });
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  return (
    <>
      <WeatherHeaderContainer>
        <h1>Weather App</h1>
        <h2>Hi ! I am HanQi</h2>
      </WeatherHeaderContainer>

      <InputContainer>
        <Input.Search
          placeholder="Find Your City's Weather"
          enterButton="Search"
          size="large"
          loading={isLoading}
          onSearch={(value) => {
            search(value);
          }}
        />
      </InputContainer>
    </>
  );
};

// Style
const WeatherHeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  height: 60px;
  width: 100%;
  padding: 2rem;
  background-color: #fafafa;
  margin-bottom: 2rem;
`;
const InputContainer = styled.div`
  width: 50%;
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;
