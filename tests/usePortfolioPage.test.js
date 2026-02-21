import test from 'node:test';
import assert from 'node:assert/strict';

const originalError = console.error;
console.error = () => {};

const importUsePortfolioPage = async (tag) =>
  import(`../src/components/portfolio/usePortfolioPage.js?${tag}`);

test('usePortfolioPage loads and maps portfolio data', async () => {
  let fetchCalls = 0;
  global.fetch = async () => {
    fetchCalls += 1;
    return {
      ok: true,
      async json() {
        return {
          portfolioCard: [{ id: 1, name: 'Project A' }],
        };
      },
    };
  };

  const { usePortfolioPage } = await importUsePortfolioPage(`ok-${Date.now()}`);
  const state = usePortfolioPage();
  await state.load();

  assert.equal(fetchCalls, 1);
  assert.equal(state.loading.value, false);
  assert.equal(state.error.value, '');
  assert.equal(state.projects.value.length, 1);
  assert.equal(state.projects.value[0].name, 'Project A');
});

test('usePortfolioPage reports error when request fails', async () => {
  global.fetch = async () => ({
    ok: false,
    status: 500,
    async json() {
      return {};
    },
  });

  const { usePortfolioPage } = await importUsePortfolioPage(
    `error-${Date.now()}`
  );
  const state = usePortfolioPage();
  await state.load();

  assert.equal(state.loading.value, false);
  assert.equal(state.projects.value.length, 0);
  assert.equal(state.error.value, 'Unable to load portfolio projects.');
});

test('usePortfolioPage prevents duplicate fetch after first successful load', async () => {
  let fetchCalls = 0;
  global.fetch = async () => {
    fetchCalls += 1;
    return {
      ok: true,
      async json() {
        return { portfolioCard: [{ id: 2, name: 'Project B' }] };
      },
    };
  };

  const { usePortfolioPage } = await importUsePortfolioPage(
    `once-${Date.now()}`
  );
  const state = usePortfolioPage();
  await state.load();
  await state.load();

  assert.equal(fetchCalls, 1);
});

process.on('exit', () => {
  console.error = originalError;
});
