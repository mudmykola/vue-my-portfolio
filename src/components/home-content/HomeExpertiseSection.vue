<script setup>
import { computed } from 'vue';
import {
  faCloudflare,
  faFigma,
  faGithub,
  faHtml5,
  faJs,
  faSass,
  faShopify,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons';
import {
  faArrowsRotate,
  faBagShopping,
  faBolt,
  faChartLine,
  faChartSimple,
  faCircleNodes,
  faCode,
  faCodeBranch,
  faCube,
  faDatabase,
  faDiagramProject,
  faFileCode,
  faFire,
  faLayerGroup,
  faNetworkWired,
  faPuzzlePiece,
  faRoute,
  faServer,
  faStore,
  faTags,
  faTerminal,
  faVial,
} from '@fortawesome/free-solid-svg-icons';

const props = defineProps({
  toolkit: { type: Array, default: () => [] },
});

const iconRules = [
  [/^JavaScript/i, faJs, '#f7df1e'],
  [/^TypeScript/i, null, '#3178c6', 'TS'],
  [/^Vue Router/i, faRoute],
  [/^Vue/i, faVuejs, '#42b883'],
  [/^Nuxt/i, null, '#00dc82', null, '/images/brands/nuxt.svg'],
  [/^Composition API/i, faCodeBranch],
  [/^Pinia/i, faDatabase],
  [/^HTML5/i, faHtml5, '#e34f26'],
  [/^SCSS/i, faSass, '#cc6699'],
  [/^Tailwind/i, faLayerGroup],
  [/^Shopify Liquid/i, faShopify, '#95bf47'],
  [/^Online Store/i, faStore],
  [/^SSR/i, faServer],
  [/^REST \/ GraphQL/i, faCircleNodes],
  [/^WebSockets/i, faNetworkWired],
  [/^Unit & E2E/i, faVial],
  [/^Git \/ GitHub/i, faGithub, '#f0f0f0'],
  [/^Vite \/ Webpack/i, faBolt],
  [/^Shopify CLI/i, faTerminal],
  [/^Storefront API/i, faBagShopping],
  [/^Admin API/i, faDiagramProject],
  [/^Checkout/i, faBagShopping],
  [/^Metafields/i, faTags],
  [/^Theme App Extensions/i, faPuzzlePiece],
  [/^Shopify Web Pixels/i, faChartLine],
  [/^Recharge \/ Loop/i, faArrowsRotate],
  [/^Cloudflare/i, faCloudflare, '#f38020'],
  [/^Amplitude/i, faChartSimple],
  [/^Meta Pixel/i, faChartLine],
  [/^Firebase/i, faFire],
  [/^Python/i, faCode],
  [/^Google Apps Script/i, faFileCode],
  [/^Figma/i, faFigma, '#f24e1e'],
];

const technologyIcon = (technology) => {
  const rule = iconRules.find(([matcher]) => matcher.test(technology));

  return {
    icon: rule?.[1] ?? faCube,
    color: rule?.[2],
    mark: rule?.[3],
    asset: rule?.[4],
  };
};

const groups = computed(() => {
  const categories = [
    {
      title: 'Core Front-end',
      match:
        /^(JavaScript|TypeScript|Vue\s|Nuxt\s|Composition API|Pinia|Vue Router)/i,
    },
    {
      title: 'Shopify',
      match:
        /^(Shopify Liquid|Online Store 2\.0|Storefront API|Admin API(?: \([^)]*\))?|Checkout Extensibility|Metafields|Theme App Extensions)$/i,
    },
    {
      title: 'Quality & Integrations',
      match:
        /^(HTML5 \/ CSS3|SCSS|Tailwind CSS|SSR|REST \/ GraphQL|WebSockets|Unit & E2E Testing)$/i,
    },
  ];

  return categories
    .map(({ title, match }) => ({
      title,
      technologies: props.toolkit
        .filter((technology) => match.test(technology))
        .map((label) => ({ label, ...technologyIcon(label) })),
    }))
    .filter(({ technologies }) => technologies.length);
});
</script>

<template>
  <section class="home-section section-expertise">
    <div class="section-intro">
      <p class="section-eyebrow">Expertise</p>
      <h2>Front-end engineering for Shopify and modern web products.</h2>
      <p class="expertise-intro__description">
        From custom Shopify themes to Vue/Nuxt applications, I build performant
        interfaces with reliable integrations and maintainable code.
      </p>
    </div>
    <div class="expertise-groups" aria-label="Technical expertise">
      <section
        v-for="group in groups"
        :key="group.title"
        class="expertise-group"
        :aria-label="group.title"
      >
        <h3 class="expertise-group__title">{{ group.title }}</h3>
        <ul class="expertise-group__list">
          <li
            v-for="technology in group.technologies"
            :key="technology.label"
            :aria-label="technology.label"
            :title="technology.label"
          >
            <span
              v-if="technology.mark"
              class="expertise-group__mark"
              :style="{ '--mark-color': technology.color }"
              aria-hidden="true"
            >
              {{ technology.mark }}
            </span>
            <img
              v-else-if="technology.asset"
              :src="technology.asset"
              alt=""
              aria-hidden="true"
            />
            <font-awesome-icon
              v-else
              :icon="technology.icon"
              :style="{ color: technology.color }"
              aria-hidden="true"
            />
            <span class="expertise-group__name">{{ technology.label }}</span>
          </li>
        </ul>
      </section>
    </div>
  </section>
</template>
