import { ref } from 'vue';
import axios from 'axios';

export const avatarUrl = ref('');
export const avatarAlt = ref('');

export const fetchAvatar = async () => {
    try {
        const { data: { avatars } } = await axios.get('https://test-api-mudmykola.vercel.app/api-my-portfolio-avatar.json');

        if (avatars && avatars.length > 0) {
            const { image, alt } = avatars[0];
            if (image && alt) {
                avatarUrl.value = `https://test-api-mudmykola.vercel.app${image}`;
                avatarAlt.value = alt;
                return;
            }
        }
        console.error('Invalid response format or missing image/alt data');
    } catch (error) {
        console.error('Error fetching avatar:', error);
    }
};