import { onMounted, ref } from 'vue';
import axios from 'axios';

export const avatarUrl = ref('');
export const avatarAlt = ref('');

export const fetchAvatar = async () => {
    try {
        const response = await axios.get('https://test-api-mudmykola.vercel.app/api-my-portfolio-avatar.json');
        const avatarData = response.data;

        if (avatarData && avatarData.length > 0) {
            const firstAvatar = avatarData[0];
            if (firstAvatar.image && firstAvatar.alt) {
                avatarUrl.value = `https://test-api-mudmykola.vercel.app${firstAvatar.image}`;
                avatarAlt.value = firstAvatar.alt;
            } else {
                console.error('Missing image or alt in response');
            }
        } else {
            console.error('Invalid response format or empty array');
        }
    } catch (error) {
        console.error('Error fetching avatar:', error);
    }
};

onMounted(fetchAvatar);