import { useEffect, useState } from "react";
import { Typography, Spin, Alert, message, Input, Button, Row, Col, Space } from "antd";
import { CloudOutlined, SearchOutlined, ReloadOutlined, EnvironmentOutlined } from "@ant-design/icons";
import {
  FullHeightRow,
  CenterCol,
  StyledTitle,
  StyledCard,
  Temperature,
  UpdatedText,
  CapitalizedText,
  InfoContainer,
  WeatherGrid,
  WeatherInfoBox,
  WeatherIcon,
  WeatherValue,
  WeatherLabel,
  ModernCard,
  GradientBackground,
  SearchContainer,
  WeatherHeader,
  ForecastContainer,
  ForecastCard,
  AnimatedContainer,
  WeatherHero,
  HeroContent,
  AdditionalInfo,
  PulseAnimation
} from "./index.styled";

import { WiHumidity, WiStrongWind, WiBarometer, WiDaySunny, WiCloudy, WiSunrise, WiSunset, WiThermometer } from "react-icons/wi";
import { FaTemperatureHigh, FaTemperatureLow } from "react-icons/fa";

const { Text } = Typography;

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("Bangalore"); 
  const [inputValue, setInputValue] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const fetchWeather = async (cityName) => {
    if (!cityName.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=9c3d02b41f9d04d08f53b0ad4e3e0cf8`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      if (!data || !data.weather || !data.main) {
        message.error("Invalid weather data received");
        setWeather(null);
        return;
      }
      
      // Convert sunrise and sunset from UNIX timestamp to readable format
      data.sys.sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("en-IN", {
        hour: '2-digit', minute: '2-digit'
      });
      data.sys.sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("en-IN", {
        hour: '2-digit', minute: '2-digit'
      });

      // Forecast data
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=9c3d02b41f9d04d08f53b0ad4e3e0cf8`
      );
      if (!forecastRes.ok) throw new Error("Forecast not found");
      const forecastData = await forecastRes.json();

      // Pick one forecast per day (12:00 time)
      const daily = forecastData.list.filter((f) =>
        f.dt_txt.includes("12:00:00")
      );
      setForecast(daily);
      setWeather(data);
      setCity(cityName);
      setInputValue("");
      
      message.success(`Weather data for ${cityName} loaded successfully!`);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      message.error(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchWeather(city);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const getWeatherGradient = (weatherMain) => {
    const gradients = {
      Clear: 'linear-gradient(135deg, #a0ceedff 0%, #9edefeff 100%)',
      Clouds: 'linear-gradient(135deg, #b7d0e5ff 0%, #ace2ffff 100%)',
      Rain: 'linear-gradient(135deg, #afafafff 0%, #c4c4c4ff 100%)',
      Drizzle: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)',
      Thunderstorm: 'linear-gradient(135deg, #cdced2ff 0%, #c8c7c9ff 100%)',
      Snow: 'linear-gradient(135deg, #fdfdfdff 0%, #c8c8c8ff 100%)',
      Mist: 'linear-gradient(135deg, #d7d2cc 0%, #304352 100%)',
      Fog: 'linear-gradient(135deg, #d7d2cc 0%, #bdccd7ff 100%)',
      Default: 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)'
    };
    return gradients[weatherMain] || gradients.Default;
  };

  return (
    <GradientBackground gradient={weather ? getWeatherGradient(weather.weather[0].main) : 'linear-gradient(135deg, #ffffffff 0%, #ffffffff 100%)'}>
      <FullHeightRow justify="center" align="middle">
        <ModernCard>
          <CenterCol>
            <AnimatedContainer>
              <WeatherHeader>
                <StyledTitle level={1}>
                  <CloudOutlined /> Weather Forecast
                </StyledTitle>
                <Text type="secondary" style={{ fontSize: '18px' }}>
                  Real-time weather information
                </Text>
              </WeatherHeader>

              <SearchContainer>
                <Space.Compact style={{ width: '100%' }}>
                  <Input
                    size="large"
                    placeholder="Enter city name..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onPressEnter={() => fetchWeather(inputValue)}
                    prefix={<EnvironmentOutlined />}
                    style={{ 
                      borderRadius: '12px 0 0 12px',
                      border: '3px solid #e8f4fd'
                    }}
                  />
                  <Button
                    size="large"
                    type="primary"
                    icon={<SearchOutlined />}
                    onClick={() => fetchWeather(inputValue)}
                    loading={loading}
                    style={{ 
                      borderRadius: '0 12px 12px 0',
                      background: 'linear-gradient(135deg, #1890ff 0%, #096dd9 100%)',
                      border: 'none'
                    }}
                  >
                    Search
                  </Button>
                  <Button
                    size="large"
                    icon={<ReloadOutlined spin={refreshing} />}
                    onClick={handleRefresh}
                    loading={refreshing}
                    style={{ 
                      marginLeft: 8,
                      borderRadius: '12px',
                      border: '2px solid #e8f4fd'
                    }}
                  />
                </Space.Compact>
              </SearchContainer>

              {error && (
                <Alert
                  type="error"
                  message={error}
                  showIcon
                  closable
                  style={{ 
                    marginBottom: 24,
                    borderRadius: '12px',
                    border: 'none'
                  }}
                />
              )}

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <Spin size="large" />
                  <div style={{ marginTop: 16 }}>
                    <Text type="secondary">Loading weather data...</Text>
                  </div>
                </div>
              ) : weather ? (
                <>
                  <WeatherHero>
                    <HeroContent>
                      <div>
                        <Text strong style={{ fontSize: '24px', color: '#fff' }}>
                          {weather.name}, {weather.sys.country}
                        </Text>
                        <CapitalizedText style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px' }}>
                          {weather.weather[0].description}
                        </CapitalizedText>
                      </div>
                      <PulseAnimation>
                        <Temperature level={1}>
                          {(weather.main.temp - 273.15).toFixed(1)}°C
                        </Temperature>
                      </PulseAnimation>
                    </HeroContent>
                    <div style={{ textAlign: 'right' }}>
                      <UpdatedText style={{ color: 'rgba(255,255,255,0.7)' }}>
                        Updated: {new Date(weather.dt * 1000).toLocaleTimeString('en-IN')}
                      </UpdatedText>
                    </div>
                  </WeatherHero>

                  <StyledCard>
                    <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                      <Col span={12}>
                        <WeatherInfoBox variant="primary">
                          <WeatherIcon><FaTemperatureHigh /></WeatherIcon>
                          <WeatherValue>{(weather.main.temp_max - 273.15).toFixed(1)}°C</WeatherValue>
                          <WeatherLabel>High</WeatherLabel>
                        </WeatherInfoBox>
                      </Col>
                      <Col span={12}>
                        <WeatherInfoBox variant="secondary">
                          <WeatherIcon><FaTemperatureLow /></WeatherIcon>
                          <WeatherValue>{(weather.main.temp_min - 273.15).toFixed(1)}°C</WeatherValue>
                          <WeatherLabel>Low</WeatherLabel>
                        </WeatherInfoBox>
                      </Col>
                    </Row>
                    
                    <WeatherGrid>
                      <WeatherInfoBox>
                        <WeatherIcon><WiHumidity /></WeatherIcon>
                        <WeatherValue>{weather.main.humidity}%</WeatherValue>
                        <WeatherLabel>Humidity</WeatherLabel>
                      </WeatherInfoBox>
                      
                      <WeatherInfoBox>
                        <WeatherIcon><WiStrongWind /></WeatherIcon>
                        <WeatherValue>{weather.wind.speed} m/s</WeatherValue>
                        <WeatherLabel>Wind Speed</WeatherLabel>
                      </WeatherInfoBox>
                      
                      <WeatherInfoBox>
                        <WeatherIcon><WiBarometer /></WeatherIcon>
                        <WeatherValue>{weather.main.pressure} hPa</WeatherValue>
                        <WeatherLabel>Pressure</WeatherLabel>
                      </WeatherInfoBox>
                      
                      <WeatherInfoBox>
                        <WeatherIcon><WiDaySunny /></WeatherIcon>
                        <WeatherValue>{(weather.visibility / 1000).toFixed(1)} km</WeatherValue>
                        <WeatherLabel>Visibility</WeatherLabel>
                      </WeatherInfoBox>
                      
                      <WeatherInfoBox>
                        <WeatherIcon><WiCloudy /></WeatherIcon>
                        <WeatherValue>{weather.clouds.all}%</WeatherValue>
                        <WeatherLabel>Cloudiness</WeatherLabel>
                      </WeatherInfoBox>
                      
                      <WeatherInfoBox>
                        <WeatherIcon><WiSunrise /></WeatherIcon>
                        <WeatherValue>{weather.sys.sunrise}</WeatherValue>
                        <WeatherLabel>Sunrise</WeatherLabel>
                      </WeatherInfoBox>
                      
                      <WeatherInfoBox>
                        <WeatherIcon><WiSunset /></WeatherIcon>
                        <WeatherValue>{weather.sys.sunset}</WeatherValue>
                        <WeatherLabel>Sunset</WeatherLabel>
                      </WeatherInfoBox>
                      
                      <WeatherInfoBox>
                        <WeatherIcon><WiThermometer /></WeatherIcon>
                        <WeatherValue>{(weather.main.feels_like - 273.15).toFixed(1)}°C</WeatherValue>
                        <WeatherLabel>Feels Like</WeatherLabel>
                      </WeatherInfoBox>
                    </WeatherGrid>

                    <AdditionalInfo>
                      <Text type="secondary">
                        Latitude: {weather.coord.lat} | Longitude: {weather.coord.lon}
                      </Text>
                    </AdditionalInfo>
                  </StyledCard>

                  <ForecastContainer>
                    <StyledTitle level={4}>5-Day Forecast</StyledTitle>
                    <Row gutter={[16, 16]} justify="center">
                      {forecast.map((day, index) => (
                        <Col key={day.dt}>
                          <ForecastCard>
                            <Text strong style={{ fontSize: '14px' }}>
                              {index === 0 ? 'Today' : new Date(day.dt * 1000).toLocaleDateString("en-IN", {
                                weekday: "short",
                                day: "numeric",
                              })}
                            </Text>
                            <div style={{ margin: '12px 0' }}>
                              <img
                                alt="weather icon"
                                src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                style={{ width: 60, height: 60 }}
                              />
                            </div>
                            <div>
                              <Text strong style={{ fontSize: '16px', color: '#1890ff' }}>
                                {(day.main.temp_max - 273.15).toFixed(0)}°C
                              </Text>
                              <Text style={{ fontSize: '14px', color: '#666', marginLeft: 4 }}>
                                / {(day.main.temp_min - 273.15).toFixed(0)}°C
                              </Text>
                            </div>
                            <CapitalizedText style={{ fontSize: '12px', marginTop: 4 }}>
                              {day.weather[0].description}
                            </CapitalizedText>
                          </ForecastCard>
                        </Col>
                      ))}
                    </Row>
                  </ForecastContainer>

                  <InfoContainer>
                    <UpdatedText type="secondary">
                      Weather data provided by OpenWeatherMap • Updates every 10 minutes
                    </UpdatedText>
                  </InfoContainer>
                </>
              ) : null}
            </AnimatedContainer>
          </CenterCol>
        </ModernCard>
      </FullHeightRow>
    </GradientBackground>
  );
};

export default Weather;