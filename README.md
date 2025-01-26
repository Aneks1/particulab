# Particlex
A simple and easy-to-use library to create particles in your website.

<a href="https://aneks1.github.io/particlex/" target="_blank"><img src="https://aneks1.github.io/particlex/assets/screenshot.jgp" alt="particlex demo"/></a>

## Installation

### npm
```sh
$ npm i css-particles
```

### HMTL Library
```html
<script src="https://aneks1.github.io/particlex/particlex.umd/index.js"></script>
```

## Usage

### Create the Particle System
```ts
import cssParticles from 'particlex'
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const system = new cssParticles.ParticleSystem(canvas, { x: canvas.width, y: canvas.height })
```

### Set the ammount of particles to show
```ts
system.ammount = 100
```

### Set the properties for the particles
```ts
system.speed = { x: { min: -5, max: 5 }, y: { min: -5, max: 5 } }
system.diameter = { min: 1, max: 4 },
system.life = { min: 5, max: 15 }
```

### Init the particle system
```ts
system.init()
```