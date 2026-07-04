const env = import.meta?.env ?? {};

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const GITHUB_API_BASE = trimTrailingSlash(
  env.VITE_GITHUB_API_BASE_URL || 'https://api.github.com'
);

const OPENWEATHER_API_BASE = trimTrailingSlash(
  env.VITE_OPENWEATHER_API_BASE_URL || 'https://api.openweathermap.org/data/2.5'
);

const OPENWEATHER_ICON_BASE = trimTrailingSlash(
  env.VITE_OPENWEATHER_ICON_BASE_URL || 'https://openweathermap.org/img/wn'
);

export const remoteEndpoints = {
  blogPostsUrl: env.VITE_BLOG_POSTS_URL || '/data/blog-posts.json',
  portfolioProjectsUrl:
    env.VITE_PORTFOLIO_PROJECTS_URL || '/data/portfolio.json',
  clickSoundGithubContentUrl:
    env.VITE_CLICK_SOUND_GITHUB_CONTENT_URL ||
    `${GITHUB_API_BASE}/repos/mudmykola/test-api/contents/audio/rclick.mp3`,
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
