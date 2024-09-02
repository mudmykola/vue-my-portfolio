import axios from 'axios';

export async function fetchClientImages() {
  try {
    const response = await axios.get(
      'https://test-api-mudmykola.vercel.app/api-my-portfolio-avatar.json'
    );
    const data = response.data;

    if (data.clientImage && Array.isArray(data.clientImage)) {
      return data.clientImage.map((item) => ({
        ...item,
        image: `https://test-api-mudmykola.vercel.app${item.image}`,
      }));
    } else {
      console.error('Invalid or missing client images data');
      return [];
    }
  } catch (error) {
    console.error('Error fetching client images:', error);
    return [];
  }
}
