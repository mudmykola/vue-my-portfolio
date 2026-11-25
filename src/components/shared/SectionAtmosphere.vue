<script setup>
defineProps({
  variant: {
    type: String,
    default: 'branch',
    validator: (value) =>
      ['hero', 'left', 'right', 'branch', 'edge'].includes(value),
  },
});
</script>

<template>
  <div
    class="section-atmosphere"
    :class="`section-atmosphere--${variant}`"
    aria-hidden="true"
  >
    <div v-if="variant === 'hero'" class="section-atmosphere__glow"></div>
    <svg viewBox="0 0 1200 700" preserveAspectRatio="none" focusable="false">
      <g class="section-atmosphere__traces">
        <template v-if="variant === 'hero'">
          <path d="M0 126H138l22 22h160l24-24h168" />
          <path d="M0 498h116l28-28h174l24 24h148" />
          <path d="M1200 112h-126l-24 24H914l-28-28H734" />
          <path d="M1200 542h-144l-28-28H864l-24 24H700" />
          <path d="M216 0v78l28 28v118" />
          <path d="M1004 0v94l-26 26v136" />
          <path d="M336 700v-94l24-24V478" />
          <path d="M890 700v-78l-24-24V478" />
        </template>
        <template v-else-if="variant === 'left'">
          <path d="M0 150h170l26 24h130l26-22h104" />
          <path d="M0 520h120l28-26h176l22 22h104" />
          <path d="M196 0v92l26 24v100" />
          <path d="M312 700v-96l24-24V516" />
        </template>
        <template v-else-if="variant === 'right'">
          <path d="M1200 142h-166l-24 22H870l-26-24H742" />
          <path d="M1200 518h-124l-28-26H872l-24 22H742" />
          <path d="M1004 0v98l-26 24v102" />
          <path d="M888 700v-92l-24-24V514" />
        </template>
        <template v-else-if="variant === 'edge'">
          <path d="M0 118h120l24 24h98l22-22h96" />
          <path d="M1200 558h-120l-26-24h-98l-22 22h-96" />
          <path d="M144 0v70l24 24v72" />
          <path d="M1054 700v-74l-22-22v-68" />
        </template>
        <template v-else>
          <path d="M0 144h184l26 22h112l26-22h100" />
          <path d="M1200 548h-180l-24-22H872l-24 22h-96" />
          <path d="M474 0v78l24 22v54" />
          <path d="M738 700v-82l-26-24v-48" />
          <path d="M0 354h92l20 18h64" />
          <path d="M1200 342h-84l-20 18h-66" />
        </template>
      </g>
      <g class="section-atmosphere__nodes">
        <template v-if="variant === 'hero'">
          <circle cx="320" cy="148" r="3" />
          <circle cx="320" cy="498" r="3" />
          <circle cx="880" cy="136" r="3" />
          <circle cx="864" cy="518" r="3" />
          <circle cx="244" cy="224" r="3" />
          <circle cx="978" cy="256" r="3" />
        </template>
        <template v-else-if="variant === 'left'">
          <circle cx="326" cy="174" r="3" />
          <circle cx="324" cy="516" r="3" />
        </template>
        <template v-else-if="variant === 'right'">
          <circle cx="874" cy="164" r="3" />
          <circle cx="876" cy="514" r="3" />
        </template>
        <template v-else-if="variant === 'edge'">
          <circle cx="264" cy="142" r="3" />
          <circle cx="936" cy="556" r="3" />
        </template>
        <template v-else>
          <circle cx="348" cy="166" r="3" />
          <circle cx="854" cy="526" r="3" />
          <circle cx="176" cy="372" r="2.5" />
          <circle cx="1030" cy="360" r="2.5" />
        </template>
      </g>
      <g
        v-if="variant === 'right' || variant === 'edge'"
        class="section-atmosphere__streaks"
      >
        <path d="M1038 250l-30 22" />
        <path d="M164 590l-24 18" />
      </g>
    </svg>
    <div v-if="variant === 'hero'" class="section-atmosphere__shade"></div>
  </div>
</template>

<style lang="scss">
.tech-atmosphere-host {
  position: relative;
  isolation: isolate;
}

.tech-atmosphere-host > :not(.section-atmosphere) {
  position: relative;
  z-index: 1;
}

.section-atmosphere {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  color: rgba(24, 214, 160, 0.15);
}

.section-atmosphere svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.74;
}

.section-atmosphere__traces {
  fill: none;
  stroke: currentColor;
  stroke-width: 1;
  stroke-linecap: square;
  stroke-linejoin: miter;
}

.section-atmosphere__nodes {
  fill: var(--color-accent, #18d6a0);
  opacity: 0.48;
}

.section-atmosphere__streaks {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.5;
  stroke-linecap: round;
  opacity: 0.32;
}

.section-atmosphere--hero {
  color: rgba(24, 214, 160, 0.28);
}

.section-atmosphere--hero svg {
  filter: drop-shadow(0 0 12px rgba(24, 214, 160, 0.1));
  opacity: 0.72;
}

.section-atmosphere__glow {
  position: absolute;
  top: 12%;
  right: 12%;
  width: min(42vw, 540px);
  height: min(48vw, 560px);
  border-radius: 50%;
  background: rgba(24, 214, 160, 0.1);
  filter: blur(58px);
  opacity: 0.65;
}

.section-atmosphere__shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
      90deg,
      rgba(8, 15, 14, 0.5) 0%,
      rgba(8, 15, 14, 0.38) 48%,
      rgba(8, 15, 14, 0.16) 100%
    ),
    rgba(8, 15, 14, 0.18);
}

@media (max-width: 767px) {
  .section-atmosphere:not(.section-atmosphere--hero) {
    opacity: 0.58;
  }

  .section-atmosphere:not(.section-atmosphere--hero) svg {
    transform: scaleX(0.82);
    transform-origin: center;
  }

  .section-atmosphere__glow {
    top: 28%;
    right: -18%;
    width: 70vw;
    height: 64vw;
    filter: blur(42px);
  }
}

@media (max-width: 420px) {
  .section-atmosphere:not(.section-atmosphere--hero) {
    opacity: 0.4;
  }
}
</style>
