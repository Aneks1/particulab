# particulab
A simple and easy-to-use library to create particles in your website.

<a href="https://aneks1.github.io/particulab/" target="_blank"><img src="https://aneks1.github.io/particulab/assets/screenshot.jpg" alt="particulab demo"/></a>

## Installation

### npm
```sh
$ npm i css-particles
```

### HMTL Library
```html
<script src="https://aneks1.github.io/particulab/particulab.umd/index.js"></script>
```

## Usage

### Create the Particle System
```ts
import particulab from 'particulab'
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const system = new particulab.ParticleSystem(canvas, { x: canvas.width, y: canvas.height })
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
system.colors.push(new RGBA(255, 0, 0, 1))
system.colors.push(new HEX("#00ff00"))
```

### Init the particle system
```ts
system.init()
```