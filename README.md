# particulab
A simple and easy-to-use library to create particles in your website.

<a href="https://aneks1.github.io/particulab/" target="_blank"><img src="https://aneks1.github.io/particulab/assets/screenshot.jpg" alt="particulab demo"/></a>

## Installation

### npm
```sh
$ npm i particulab
```

### HMTL Library
```html
<script src="https://aneks1.github.io/particulab/particulab.umd/index.js"></script>
```

## Example usage

In the following example, we are going to create a basic particle system with 100 particles. We want to have red and purple particles which move slowly across the screen.

### Create the Particle System
```ts
import particulab from 'particulab'
const canvas = document.getElementById('canvas') as HTMLCanvasElement
const system = new particulab.ParticleSystem(canvas, { x: canvas.width, y: canvas.height })

system.amount = 100
system.life = particulab.range(5, 10)

// Set visual properties for the particles
system.size = particulab.range(1, 3)
system.speed = { x: particulab.range(-2, 2), y: particulab.range(-2, 2) }
system.colors.push(new particulab.HEX("ff0000"))
system.colors.push(new particulab.RGBA(255, 255, 0, 1))
system.opacity = particulab.range(50, 100)

// Set fade types to make our system look cleaner
system.fadeIn = { duration: 1, opacity: 0, scaleFactor: 0.5 }
system.fadeOut = { duration: 2, opacity: 0, scaleFactor: 2 }

// Select a custom image for the particles
system.shapes.push[new ParticleImage('assets/myImage.png')]

system.init()
```

## [Go to Docs](https://github.com/Aneks1/particulab/wiki)