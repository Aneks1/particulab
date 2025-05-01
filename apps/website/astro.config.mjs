// @ts-check
import { defineConfig } from 'astro/config';

import starlight from '@astrojs/starlight';

import vue from '@astrojs/vue';

import mdx from '@astrojs/mdx'

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Documentation | particulab',
            logo: { src: './src/assets/logo.png', replacesTitle: true, alt: 'particulab logo' },
            customCss: [
                './src/styles/docs.css',
            ],
        }), 
        vue(), 
        mdx()
    ],
    output: 'static',
    vite: {
        ssr: {
            noExternal: ['@mdx-js/react'],
        },
    },
});