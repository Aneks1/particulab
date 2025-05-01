<img src="https://particulab.vercel.app/_astro/logo.wub4nhH8.png" alt="particulab logo"/>

A simple and easy-to-use library to create particles in your website.

<img src="https://particulab.vercel.app/images/screenshot.jpg" alt="particulab demo"/>

## Installation

### npm
```sh
$ npm i particulab
```

## Example usage

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

## [Go to Docs](https://particulab.vercel.app/docs/)