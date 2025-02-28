# Types

## type interval
```ts
type interval = { min: number, max: number }
```

### References
[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

***

## type vector
```ts
type vector = { x: number, y: number }
```

### References
[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

***

## type vectorInterval
```ts
type vectorInterval = { x: interval, y: interval }
```

### References
[interval](#type-interval)

***

## type shapes
```ts
type shapes = 'circle' | 'rectangle' | 'triangle' | 'star' | ParticleImage
```

### References
[ParticleImage](./structures/ParticleImage.md#class-particleimage)