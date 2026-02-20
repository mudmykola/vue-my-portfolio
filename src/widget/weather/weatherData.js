import { ref } from 'vue';

export const temperature = ref(null);
export const weatherDescription = ref(null);
export const weatherIconUrl = ref(null);
export const city = ref(localStorage.getItem('selectedCity') || 'Kyiv');
export const weatherError = ref('');

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

export const fetchWeatherData = async (selectedCity = city.value) => {
  weatherError.value = '';

  if (!apiKey) {
    weatherError.value = 'Weather API key is not configured.';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error(`Weather API request failed: ${response.status}`);
    }

    const data = await response.json();
    if (
      typeof data?.main?.temp !== 'number' ||
      typeof data?.weather?.[0]?.icon !== 'string'
    ) {
      throw new Error('Unexpected weather API response shape.');
    }

    temperature.value = Math.round(data.main.temp);
    weatherDescription.value = data.weather[0].main;
    weatherIconUrl.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    city.value = selectedCity;
    localStorage.setItem('selectedCity', selectedCity);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    weatherError.value = 'Unable to load weather right now.';
  }
};

export const chooseLocation = () => {
  const selectedCity = prompt('Please enter a city:');
  if (selectedCity) {
    fetchWeatherData(selectedCity);
  }
};
