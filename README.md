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
system.size = particulab.range(1, 3)
system.life = particulab.range(5, 10)
system.speed = { x: particulab.range(-2, 2), y: particulab.range(-2, 2) }
system.colors.push(new particulab.HEX("ffffff"))
system.colors.push(new particulab.RGBA(255, 255, 0, 1))
system.opacity = particulab.range(50, 100)
```

### You can set fade types!
```ts
system.fadeIn = { duration: 1, opacity: 0, scaleFactor: 0.5 }
system.fadeOut = { duration: 2, opacity: 0, scaleFactor: 2 }
```

### Init the particle system
```ts
system.init()
```