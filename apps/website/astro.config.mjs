// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
    title: 'Documentation | particulab'
  }), vue()]
});