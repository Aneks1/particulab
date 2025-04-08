# particulab
A simple and easy-to-use library to create particles in your website.

<a href="https://particulab.vercel.app/" target="_blank"><img src="https://media.discordapp.net/attachments/1293702593721270343/1359299405773275217/screenshot.jpg?ex=67f6f9b8&is=67f5a838&hm=b7b54b159d9292638ab55d0d58aa6575474678520fdc320f6c535da01c0ad79d" alt="particulab demo"/></a>

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