const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const OPENWEATHER_API_BASE = trimTrailingSlash(
  'https://api.openweathermap.org/data/2.5'
);

const OPENWEATHER_ICON_BASE = trimTrailingSlash(
  'https://openweathermap.org/img/wn'
);

export const remoteEndpoints = {
  blogPostsUrl: '/data/blog-posts.json',
  portfolioProjectsUrl: '/data/portfolio.json',
  buildOpenWeatherCurrentUrl({ city, apiKey, units = 'metric' }) {
    const params = new URLSearchParams({
      q: city,
      appid: apiKey,
      units,
    });
    return `${OPENWEATHER_API_BASE}/weather?${params.toString()}`;
  },
  buildOpenWeatherIconUrl(icon) {
    return `${OPENWEATHER_ICON_BASE}/${icon}.png`;
  },
};
