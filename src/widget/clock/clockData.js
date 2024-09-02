import { ref, watchEffect } from 'vue';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

export const currentTime = ref('');
export const currentDate = ref('');
export const dayNightIcon = ref(faSun);

export const updateClock = () => {
  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${hours}:${minutes}:${seconds}`;

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const dayOfWeek = daysOfWeek[now.getDay()];
  const date = now.getDate();
  currentDate.value = `${dayOfWeek} ${date}`;

  const isNight = now.getHours() >= 18 || now.getHours() < 6;
  dayNightIcon.value = isNight ? faMoon : faSun;
};

watchEffect(() => {
  const intervalId = setInterval(updateClock, 1000);
  return () => clearInterval(intervalId);
});
