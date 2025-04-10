import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    vue(),
    starlight({
      title: 'particulab | Documentation',
      description: 'Documentation for your particulab',
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', link: '/docs/introduction' },
            { label: 'Installation', link: '/docs/installation' },
          ],
        },
      ],
    }),
  ],
  vite: {
    optimizeDeps: {
      include: ['particulab'], // Add your package name here
    },
  },
});