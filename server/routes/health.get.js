export default defineEventHandler(() => ({
  success: true,
  service: 'vue-my-portfolio-contact',
  status: 'ok',
  usage: {
    method: 'POST',
    endpoint: '/api/contact',
    contentType: 'application/json',
  },
}));
