import { ref } from 'vue';

export const avatarUrl = ref('');
export const avatarAlt = ref('');

export const fetchAvatar = async () => {
  try {
    const response = await fetch('/data/site-content.json');
    const data = await response.json();
    const avatars = data?.avatars;

    if (avatars && avatars.length > 0) {
      const { image, alt } = avatars[0];
      if (image && alt) {
        avatarUrl.value = image;
        avatarAlt.value = alt;
        return;
      }
    }
    console.error('Invalid response format or missing image/alt data');
  } catch (error) {
    console.error('Error fetching avatar:', error);
  }
};
