<script setup>
import { ref } from 'vue';
import AppPagination from '../shared/AppPagination.vue';
import {
  faArrowRight,
  faCheck,
  faEnvelope,
  faMagnifyingGlass,
  faPaperPlane,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub as faGithubBrand,
  faInstagram as faInstagramBrand,
  faLinkedin,
  faShopify,
  faVuejs,
} from '@fortawesome/free-brands-svg-icons';

const loading = ref(false);
const activeFilter = ref('Frontend');
const showToast = ref(false);
const compactPaginationPage = ref(2);
const paginationPage = ref(3);

const colors = [
  ['Background', '#080F0E', 'var(--color-bg)'],
  ['Surface', '#0D1815', 'var(--color-surface)'],
  ['Raised', '#13211D', 'var(--color-surface-raised)'],
  ['Border', 'rgba(190,215,204,.14)', 'var(--color-border)'],
  ['Text', '#F3F7F5', 'var(--color-text)'],
  ['Secondary', '#B5C2BC', 'var(--color-text-secondary)'],
  ['Muted', '#7F9088', 'var(--color-text-muted)'],
  ['Accent', '#18D6A0', 'var(--color-accent)'],
  ['Accent hover', '#2CE5B1', 'var(--color-accent-hover)'],
  ['Accent soft', 'rgba(24,214,160,.12)', 'var(--color-accent-soft)'],
  ['Error', '#FF7373', 'var(--color-error)'],
  ['Warning', '#F4BF58', 'var(--color-warning)'],
  ['Info', '#76B9FF', 'var(--color-info)'],
];

const filters = ['All', 'Frontend', 'Backend'];

const triggerLoading = () => {
  loading.value = true;
  window.setTimeout(() => {
    loading.value = false;
    showToast.value = true;
    window.setTimeout(() => {
      showToast.value = false;
    }, 2200);
  }, 600);
};
</script>

<template>
  <main class="ds-page">
    <header class="ds-hero">
      <div class="ds-brand">
        <span class="ds-brand__mark">M</span><strong>Mykola Mud</strong>
      </div>
      <span class="ds-hero__divider" aria-hidden="true"></span>
      <p>PORTFOLIO DESIGN SYSTEM <span>/</span> COMPONENT INVENTORY</p>
      <span class="ds-version">UI LIBRARY&nbsp;&nbsp; v1.0</span>
    </header>

    <div class="ds-grid">
      <section class="ds-panel ds-panel--colors">
        <div class="ds-heading">
          <span>01</span>
          <div>
            <h2>Color tokens</h2>
            <p>Core palette, semantic colors and brand logos.</p>
          </div>
        </div>
        <div class="ds-swatches">
          <div v-for="color in colors" :key="color[0]" class="ds-swatch">
            <span :style="{ background: color[2] }"></span
            ><strong>{{ color[0] }}</strong
            ><small>{{ color[1] }}</small>
          </div>
        </div>
        <div class="ds-subtitle">Brand logos (official colors only)</div>
        <div class="ds-brands">
          <span><font-awesome-icon :icon="faVuejs" /> Vue</span>
          <span><b class="ds-nuxt-mark">M</b> Nuxt</span>
          <span><font-awesome-icon :icon="faShopify" /> Shopify</span>
        </div>
      </section>

      <section class="ds-panel ds-panel--type">
        <div class="ds-heading">
          <span>02</span>
          <div>
            <h2>Type scale</h2>
            <p>Sora for headings, Manrope for body.</p>
          </div>
        </div>
        <div class="ds-type-row">
          <b>H1</b><small>Sora · 700 · 64px</small
          ><strong class="ds-type-h1">Heading H1</strong>
        </div>
        <div class="ds-type-row">
          <b>H2</b><small>Sora · 700 · 48px</small
          ><strong class="ds-type-h2">Heading H2</strong>
        </div>
        <div class="ds-type-row">
          <b>H3</b><small>Sora · 700 · 32px</small
          ><strong class="ds-type-h3">Heading H3</strong>
        </div>
        <div class="ds-type-copy">
          <b>Body</b><small>Manrope · 400 · 18px</small>
          <p>
            This is body text. A clear, modern and highly readable paragraph.
          </p>
        </div>
        <div class="ds-type-copy">
          <b>Small</b><small>Manrope · 400 · 14px</small>
          <p>Secondary information, hints and supportive text.</p>
        </div>
        <div class="ds-type-nav">
          <b>Nav</b><small>Manrope · 600 · 16px</small><span>Home</span
          ><span>Portfolio</span><span>About</span>
        </div>
      </section>

      <section class="ds-panel ds-panel--wide">
        <div class="ds-heading">
          <span>03</span>
          <div>
            <h2>Buttons</h2>
            <p>
              Variants and states. All 48px high, 20px × 24px padding, 9px
              radius.
            </p>
          </div>
        </div>
        <div class="ds-button-table">
          <b>Variant</b><b>Default</b><b>Hover</b><b>Focus-visible</b
          ><b>Pressed</b><b>Disabled</b><b>Loading</b> <strong>Primary</strong
          ><button class="app-btn app-btn--primary">
            <font-awesome-icon :icon="faPaperPlane" /> Send</button
          ><button class="app-btn app-btn--primary ds-hover">
            <font-awesome-icon :icon="faPaperPlane" /> Send</button
          ><button class="app-btn app-btn--primary ds-focus">
            <font-awesome-icon :icon="faPaperPlane" /> Send</button
          ><button class="app-btn app-btn--primary ds-pressed">
            <font-awesome-icon :icon="faPaperPlane" /> Send</button
          ><button class="app-btn app-btn--primary" disabled>
            <font-awesome-icon :icon="faPaperPlane" /> Send</button
          ><button class="app-btn app-btn--primary ds-loading">
            <span class="ds-spinner"></span> Send
          </button>
          <strong>Secondary</strong><button class="app-btn">Send</button
          ><button class="app-btn ds-hover">Send</button
          ><button class="app-btn ds-focus">Send</button
          ><button class="app-btn ds-pressed">Send</button
          ><button class="app-btn" disabled>Send</button
          ><button class="app-btn">
            <span class="ds-spinner"></span> Send
          </button>
          <strong>Text / Ghost</strong
          ><button class="ds-text-button">Send</button
          ><button class="ds-text-button ds-hover">Send</button
          ><button class="ds-text-button ds-focus">Send</button
          ><button class="ds-text-button ds-pressed">Send</button
          ><button class="ds-text-button" disabled>Send</button
          ><button class="ds-text-button">
            <span class="ds-spinner"></span> Send
          </button>
        </div>
      </section>

      <section class="ds-panel ds-panel--wide">
        <div class="ds-heading">
          <span>04</span>
          <div>
            <h2>Form fields</h2>
            <p>
              Inputs, textarea and select with default, focus, error, disabled
              and success states.
            </p>
          </div>
        </div>
        <div class="ds-form-table">
          <strong>Text input</strong
          ><label>Default<input placeholder="Your full name" /></label
          ><label class="is-focus">Focus<input value="Mykola Mud" /></label
          ><label class="is-error"
            >Error<input value="Mykola" /><small
              >Please enter your full name.</small
            ></label
          ><label class="is-disabled"
            >Disabled<input disabled placeholder="Your full name" /></label
          ><label class="is-success"
            >Success<input value="Mykola Mud" /><small>✓</small></label
          >
          <strong>Email input</strong
          ><label>Default<input placeholder="you@email.com" /></label
          ><label class="is-focus"
            >Focus<input value="mykola.mud@gmail.com" /></label
          ><label class="is-error"
            >Error<input value="mykola@" /><small
              >Please enter a valid email.</small
            ></label
          ><label class="is-disabled"
            >Disabled<input disabled placeholder="you@email.com" /></label
          ><label class="is-success"
            >Success<input value="mykola.mud@gmail.com"
          /></label>
          <strong>Textarea</strong
          ><label
            >Default<textarea
              placeholder="Tell me about your idea..."
            ></textarea></label
          ><label class="is-focus"
            >Focus<textarea>Build a portfolio...</textarea></label
          ><label class="is-error"
            >Error<textarea></textarea
            ><small>Message is required.</small></label
          ><label class="is-disabled"
            >Disabled<textarea
              disabled
              placeholder="Tell me about your idea..."
            ></textarea></label
          ><label class="is-success"
            >Success<textarea>Looks good!</textarea>
          </label>
          <strong>Select</strong
          ><label
            >Default<select>
              <option>Select a type</option>
              <option>Web App</option>
            </select></label
          ><label class="is-focus"
            >Focus<select>
              <option>Web App</option>
            </select></label
          ><label class="is-error"
            >Error<select>
              <option>Select a type</option></select
            ><small>Please select a project type.</small></label
          ><label class="is-disabled"
            >Disabled<select disabled>
              <option>Select a type</option>
            </select></label
          ><label class="is-success"
            >Success<select>
              <option>Web App</option>
            </select></label
          >
        </div>
      </section>

      <section class="ds-panel">
        <div class="ds-heading">
          <span>05</span>
          <div>
            <h2>Selection controls</h2>
            <p>Checkboxes, radios, toggles and filter chips.</p>
          </div>
        </div>
        <div class="ds-controls">
          <fieldset>
            <legend>Checkbox</legend>
            <label><input type="checkbox" /> Unchecked</label
            ><label><input type="checkbox" checked /> Checked</label
            ><label><input type="checkbox" disabled /> Disabled</label>
          </fieldset>
          <fieldset>
            <legend>Radio</legend>
            <label><input type="radio" name="ds-radio" /> Unselected</label
            ><label
              ><input type="radio" name="ds-radio" checked /> Selected</label
            ><label
              ><input type="radio" name="ds-radio" disabled /> Disabled</label
            >
          </fieldset>
          <fieldset>
            <legend>Toggle</legend>
            <label><input type="checkbox" role="switch" /> Off</label
            ><label><input type="checkbox" role="switch" checked /> On</label
            ><label
              ><input type="checkbox" role="switch" disabled /> Disabled</label
            >
          </fieldset>
        </div>
        <div class="ds-chip-row">
          <span>Filter chips (category)</span
          ><button
            v-for="filter in filters"
            :key="filter"
            :class="{ active: activeFilter === filter }"
            @click="activeFilter = filter"
          >
            {{ filter }}
          </button>
        </div>
      </section>

      <section class="ds-panel ds-panel--wide">
        <div class="ds-heading">
          <span>06</span>
          <div>
            <h2>Navigation and links</h2>
            <p>Brand lockup, navigation states and link styles.</p>
          </div>
        </div>
        <div class="ds-nav-preview">
          <div class="ds-brand">
            <span class="ds-brand__mark">M</span><strong>Mykola Mud</strong
            ><small>FRONT-END ENGINEER</small>
          </div>
          <nav>
            <a>Home</a><a>Portfolio</a><a class="active">About</a><a>Resume</a
            ><a>Blog</a><a>Contact</a>
          </nav>
          <div class="ds-nav-icons">
            <font-awesome-icon :icon="faGithubBrand" /><font-awesome-icon
              :icon="faLinkedin"
            /><font-awesome-icon :icon="faInstagramBrand" />
          </div>
        </div>
        <div class="ds-link-states">
          <span>Link styles</span><a>Default link</a
          ><a class="ds-hover">Hover link</a
          ><a class="ds-visited">Visited link</a
          ><a class="ds-focus">Focus link</a>
        </div>
      </section>

      <section class="ds-panel ds-panel--feedback">
        <div class="ds-heading">
          <span>07</span>
          <div>
            <h2>Feedback</h2>
            <p>Toasts, alerts and validation messages.</p>
          </div>
        </div>
        <div class="ds-alert is-success">
          <font-awesome-icon :icon="faCheck" />
          <div>
            <strong>Success — Message sent!</strong
            ><small>I will get back to you shortly.</small>
          </div>
          <font-awesome-icon :icon="faXmark" />
        </div>
        <div class="ds-alert is-error">
          <font-awesome-icon :icon="faXmark" />
          <div>
            <strong>Error — Something went wrong.</strong
            ><small>Please try again later.</small>
          </div>
          <font-awesome-icon :icon="faXmark" />
        </div>
        <div class="ds-alert is-warning">
          <font-awesome-icon :icon="faPaperPlane" />
          <div>
            <strong>Warning — Unsaved changes.</strong
            ><small>Your changes will be lost.</small>
          </div>
          <font-awesome-icon :icon="faXmark" />
        </div>
        <label class="is-error ds-inline-field"
          >Email<input value="mykola@" /><small
            >Please enter a valid email address.</small
          ></label
        >
      </section>

      <section class="ds-panel">
        <div class="ds-heading">
          <span>08</span>
          <div>
            <h2>Surfaces</h2>
            <p>Cards, modal, tooltip and pagination.</p>
          </div>
        </div>
        <article class="ds-project-card">
          <div class="ds-placeholder">
            <font-awesome-icon :icon="faMagnifyingGlass" />
          </div>
          <h3>Project Title</h3>
          <p>A short description of the project and the technologies used.</p>
          <span>Vue</span><span>Nuxt</span
          ><font-awesome-icon :icon="faArrowRight" />
        </article>
        <div class="ds-modal-card">
          <font-awesome-icon :icon="faCheck" />
          <h3>Message sent</h3>
          <p>Thanks for reaching out — I will get back to you shortly.</p>
          <button class="app-btn app-btn--primary" @click="triggerLoading">
            Close
          </button>
        </div>
        <div class="ds-tooltip">This is a helpful tip.</div>
        <div class="ds-pagination-examples">
          <div>
            <p>Compact · Blog</p>
            <AppPagination
              v-model:current-page="compactPaginationPage"
              :total-pages="5"
              mode="compact"
              label="Compact pagination preview"
            />
          </div>
          <div>
            <p>Numbered · Portfolio</p>
            <AppPagination
              v-model:current-page="paginationPage"
              :total-pages="10"
              mode="numbered"
              label="Numbered pagination preview"
            />
          </div>
        </div>
      </section>

      <section class="ds-panel ds-panel--wide">
        <div class="ds-heading">
          <span>09</span>
          <div>
            <h2>Icon style</h2>
            <p>Font Awesome Solid UI icons and official brand icons.</p>
          </div>
        </div>
        <div class="ds-icons">
          <div>
            <span>UI icons (Font Awesome Solid)</span
            ><font-awesome-icon :icon="faMagnifyingGlass" /><font-awesome-icon
              :icon="faEnvelope"
            /><font-awesome-icon :icon="faArrowRight" /><font-awesome-icon
              :icon="faXmark"
            /><font-awesome-icon :icon="faCheck" />
          </div>
          <div>
            <span>Brand / technology icons</span
            ><font-awesome-icon :icon="faGithubBrand" /><font-awesome-icon
              :icon="faLinkedin"
            /><font-awesome-icon :icon="faInstagramBrand" /><font-awesome-icon
              :icon="faVuejs"
            /><font-awesome-icon :icon="faShopify" />
          </div>
        </div>
      </section>

      <section class="ds-panel">
        <div class="ds-heading">
          <span>10</span>
          <div>
            <h2>Spacing tokens</h2>
            <p>Base spacing scale (px).</p>
          </div>
        </div>
        <div class="ds-spacing">
          <span
            v-for="size in [4, 8, 12, 16, 24, 32, 48, 64]"
            :key="size"
            :style="{ height: `${Math.max(size / 2, 6)}px` }"
            ><small>{{ size }}</small></span
          >
        </div>
      </section>

      <section class="ds-panel">
        <div class="ds-heading">
          <span>11</span>
          <div>
            <h2>Radius & shadow tokens</h2>
            <p>Corner radius and elevation.</p>
          </div>
        </div>
        <div class="ds-radius">
          <span>8px</span><span>12px</span><span>999px</span>
        </div>
        <div class="ds-shadows">
          <span>Subtle</span><span>Card</span><span>Modal</span>
        </div>
      </section>

      <section class="ds-panel">
        <div class="ds-heading">
          <span>12</span>
          <div>
            <h2>Motion (interaction)</h2>
            <p>Timings, easing and reduced motion.</p>
          </div>
        </div>
        <div class="ds-motion">
          <span>140ms <small>Micro (hover, focus)</small></span
          ><span>200ms <small>Standard (UI open/close)</small></span
          ><span>260ms <small>Emphasis (modal, panel)</small></span>
        </div>
        <div class="ds-easing">
          <span class="ds-easing-curve"></span
          ><small>Standard<br />cubic-bezier(0.2, 0.7, 0.2, 1)</small>
        </div>
        <p class="ds-reduced">
          ⌁ Respects prefers-reduced-motion: reduce (no or minimal animation).
        </p>
      </section>
    </div>

    <Transition name="ds-toast"
      ><div v-if="showToast" class="ds-toast-message">
        <font-awesome-icon :icon="faCheck" /> Action completed
      </div></Transition
    >
  </main>
</template>

<style lang="scss">
@import './style.scss';
</style>
