const env = import.meta?.env ?? {};

const trimTrailingSlash = (value) => String(value || '').replace(/\/+$/, '');

const GITHUB_TEST_API_BASE = trimTrailingSlash(
  env.VITE_GITHUB_TEST_API_BASE_URL || 'https://mudmykola.github.io/test-api'
);

const CONTENT_API_BASE = trimTrailingSlash(
  env.VITE_CONTENT_API_BASE_URL || 'https://test-api-mudmykola.vercel.app'
);

const GITHUB_API_BASE = trimTrailingSlash(
  env.VITE_GITHUB_API_BASE_URL || 'https://api.github.com'
);

const OPENWEATHER_API_BASE = trimTrailingSlash(
  env.VITE_OPENWEATHER_API_BASE_URL ||
    'https://api.openweathermap.org/data/2.5'
);

const OPENWEATHER_ICON_BASE = trimTrailingSlash(
  env.VITE_OPENWEATHER_ICON_BASE_URL || 'https://openweathermap.org/img/wn'
);

const ensureLeadingSlash = (path) => (String(path || '').startsWith('/') ? path : `/${path}`);

export const remoteEndpoints = {
  contentApiBase: CONTENT_API_BASE,
  githubApiBase: GITHUB_API_BASE,
  githubTestApiBase: GITHUB_TEST_API_BASE,
  openWeatherApiBase: OPENWEATHER_API_BASE,
  openWeatherIconBase: OPENWEATHER_ICON_BASE,
  blogPostsUrl:
    env.VITE_BLOG_POSTS_URL ||
    `${GITHUB_TEST_API_BASE}/api-my-portfolio-blog-post.json`,
  portfolioProjectsUrl:
    env.VITE_PORTFOLIO_PROJECTS_URL ||
    `${GITHUB_TEST_API_BASE}/api-my-portfolio-project.json`,
  avatarDataUrl:
    env.VITE_AVATAR_DATA_URL ||
    `${CONTENT_API_BASE}/api-my-portfolio-avatar.json`,
  clickSoundGithubContentUrl:
    env.VITE_CLICK_SOUND_GITHUB_CONTENT_URL ||
    `${GITHUB_API_BASE}/repos/mudmykola/test-api/contents/audio/rclick.mp3`,
  resolveGithubTestApiAsset(path) {
    return `${GITHUB_TEST_API_BASE}${ensureLeadingSlash(path)}`;
  },
  resolveContentApiAsset(path) {
    return `${CONTENT_API_BASE}${ensureLeadingSlash(path)}`;
  },
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
