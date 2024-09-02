import { ref, onMounted } from 'vue';

export const temperature = ref(null);
export const weatherDescription = ref(null);
export const weatherIconUrl = ref(null);
export const city = ref(localStorage.getItem('selectedCity') || 'Kyiv');

const apiKey = '3ede0554953b4fbb790104651a6b07c0';

export const fetchWeatherData = async (selectedCity = city.value) => {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();
    temperature.value = Math.round(data.main.temp);
    weatherDescription.value = data.weather[0].main;
    weatherIconUrl.value = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    city.value = selectedCity;
    localStorage.setItem('selectedCity', selectedCity);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
};

export const chooseLocation = () => {
  const selectedCity = prompt('Please enter a city:');
  if (selectedCity) {
    fetchWeatherData(selectedCity);
  }
};

onMounted(fetchWeatherData);
