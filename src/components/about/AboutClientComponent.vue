<script setup>
import { ref, onMounted } from 'vue';
import { fetchFromSupabase } from '@/services/fetchFromSupabase';

const props = defineProps({
  title: String,
});

const clientImages = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  const data = await fetchFromSupabase('client_image');

  clientImages.value = data.map((item) => ({
    ...item,
    image: item.image.startsWith('http')
      ? item.image
      : `${import.meta.env.VITE_SUPABASE_URL}${item.image}`,
  }));

  loading.value = false;
});
</script>

<template>
  <div class="client-section services clients mt-10">
    <div class="services-title clients-title text-2xl font-bold">
      <h2>{{ title }}</h2>
    </div>
    <div class="clients-logo mt-5">
      <ul class="flex items-center justify-between">
        <li v-for="client in clientImages" :key="client.id">
          <img
            width="150"
            height="150"
            :src="client.image"
            :alt="client.alt"
            loading="lazy"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'style';
</style>
