import { supabase } from '@/lib/supabase';

export async function fetchClientImages() {
  const { data, error } = await supabase
    .from('client_image')
    .select('*')
    .order('id');

  if (error) {
    console.error('❌ Error fetching client images:', error);
    return [];
  }

  console.log('✅ Fetched client images:', data);

  return data.map((item) => ({
    ...item,
    image: item.image.startsWith('http')
      ? item.image
      : `${import.meta.env.VITE_SUPABASE_URL}${item.image}`,
  }));
}
