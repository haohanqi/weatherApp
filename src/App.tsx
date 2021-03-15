import { useState } from "react";
import "./App.css";
import styled from "styled-components";
import { Header, WeatherData } from "./components/header";
import { Weather } from "./components/weather";
import { Typography, Spin } from "antd";

function App() {
  const [data, setData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <Container>
      <Header
        isLoading={loading}
        setLoading={setLoading}
        setError={setError}
        setData={setData}
      />
      {error ? (
        <Typography.Text type="danger" style={{ marginTop: "2rem" }}>
          Error Happens
        </Typography.Text>
      ) : null}
      {loading ? (
        <Spin style={{ marginTop: "2rem" }} />
      ) : (
        <Weather data={data} error={error} />
      )}
    </Container>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
`;
