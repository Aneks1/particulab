<div align="center">
    <a href="https://particulab.vercel.app">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="https://particulab.vercel.app/_astro/logo.BdmdAPAp.png"/>
            <source media="(prefers-color-scheme: light)" srcset="https://particulab.vercel.app/_astro/logo-light.DbNBGWNZ.png"/>
            <img alt="particulab logo" src="https://particulab.vercel.app/_astro/logo.BdmdAPAp.png" width="500"/>
        </picture>
    </a>
    <br/>
    <br/>
    <span>✨ A lightweight and customizable JavaScript particle system for stunning interactive visuals — perfect for websites, games, and UI effects.</span>
    <br/>
    <br/>
    <img src="https://particulab.vercel.app/images/demo.gif" alt="particulab demo"/>
    <br/>
    <p style="display: flex; justify-content: center; gap: 0.5rem; flex-wrap: wrap;">
    	<a href="https://www.npmjs.com/package/particulab"><img src="https://img.shields.io/npm/v/particulab.svg" alt="particulab npm" /></a>
        <a href="https://www.npmjs.com/package/particulab"><img src="https://img.shields.io/npm/dt/particulab?color=brightgreen" alt="particulab downloads" /></a>
        <a href="https://particulab.vercel.app"><img src="https://img.shields.io/badge/Demo-Live-blue" alt="particulab demo badge" /></a>
    </p>
</div>

---


## Features

- ⚙️ Fully customizable: colors, shapes, physics, interactivity
- 🧠 Tiny & fast: minimal bundle size with high performance
- 🎮 Great for: splash screens, landing pages, and UIs

## Installation

```sh
$ npm i particulab
```

## Quick Start

In the following example, we are going to create a basic particle system with 100 particles. We want to have red and purple particles which move slowly across the screen.

### Create the Particle System
```ts
import * as particulab from 'particulab'
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const system = new particulab.ParticleSystem(canvas, 
    {
        canvasSize: { x: 800, y: 600 }
        amount: 100
        lifeSpan: particulab.range(5, 15)
    }
)

// Set visual properties for the particles
system.size = particulab.range(1, 3)
system.speed = { x: particulab.range(-2, 2), y: particulab.range(-2, 2) }
system.colors.push(new particulab.HEX("ff0000"))
system.colors.push(new particulab.RGBA(255, 255, 0, 1))
system.opacity = particulab.range(50, 100)

// Select a custom image for the particles
system.shapes.push[new ParticleImage('assets/myImage.png')]

system.init()
```

## Docs

Check out full usage, options, and examples here:
👉 https://particulab.vercel.app/docs

---

Built with 🩵 by [Aneks](https://github.com/Aneks1)