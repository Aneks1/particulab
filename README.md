# Particlex
A simple and easy-to-use library to create particles in your website.

## Installation

### npm
```sh
$ npm i particlex
```

### HMTL Library
```html
<script src="https://aneks1.github.io/particlex/lib/index.js"></script>
```

## Usage

### Create the Particle System
```ts
import particlex from 'particlex'
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const system = new particlex.ParticleSystem(canvas, { x: canvas.width, y: canvas.height })
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