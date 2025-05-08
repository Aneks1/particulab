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
            logo: { light: './src/assets/logo-light.png', dark:'./src/assets/logo.png', replacesTitle: true, alt: 'particulab logo' },
            customCss: [
                './src/styles/docs.css',
            ],
            favicon: './src/favicon.ico',
            defaultLocale: 'en',
            sidebar: [
                {
                    label: 'Introduction',
                    link: '/docs'
                },
                {
                    label: 'Classes',
                    autogenerate: {
                        directory: '/docs/Classes'
                    }
                },
                {
                    label: 'Types',
                    autogenerate: {
                        directory: '/docs/Types'
                    }
                }
            ]
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