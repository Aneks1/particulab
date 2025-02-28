# Structures

## class ParticleSystem

### Constructors

#### constructor(canvas: HTMLCanvasElement, options: [ParticleSystemOptions](../options/ParticleSystemOptions.md#interface-particle-system-options))

___

### Properties

#### amount : [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

The number of particles rendered by the system.

***

#### colors : ([RGBA](RGBA.md#class-rgba) | [HEX](../structures/HEX.md#class-hex))[]

***

#### life : [interval](../types.md#type-interval)

***

#### opacity : [interval](../types.md#type-interval)

***

#### particles : [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)&lt;[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String), [Particle](Particle.md#class-particle)&gt;

***

#### size : [interval](../types.md#type-interval)

***

#### shapes : [shapes](../types.md#type-shapes)[]

***

#### speed : [vectorInterval](../types.md#type-vectorinterval)

***

#### fadeIn? : [FadeOptions](../options/FadeOptions.md#interface-fadeoptions)

***

#### fadeOut? : [FadeOptions](../options/FadeOptions.md#interface-fadeoptions)

***

### Methods

#### init() : void

***

#### stop() : void

***

#### clear() : void