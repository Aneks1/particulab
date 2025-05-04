import { Particle, ParticleSystem, Plugin, range, Vector } from "@particulab/core"
import ReactivityOptions from "./ReactivityOptions"
import ParticleReactivity from "./ParticleReactivity"

export default class ReactivityPlugin implements Plugin {
    public readonly id: string = '@particulab/reactivity'
    private readonly options: ReactivityOptions
    private cursorPosition: Vector = { x: 0, y: 0 }

    setup(system: ParticleSystem): unknown {
        console.log(`✅ ${this.id} was installed successfully.`)
        if (typeof window === 'undefined') return
        const updateCursor = (x: number, y: number) => { this.cursorPosition = { x, y } }
        window.addEventListener('mousemove', (e: MouseEvent) => updateCursor(e.clientX, e.clientY))
        return system
    }
    onParticleUpdate = (particle: Particle, deltaTime: number) => {
        const data = particle.pluginData.get(this.id) as ParticleReactivity
        const dx = particle.position.x - this.cursorPosition.x
        const dy = particle.position.y - this.cursorPosition.y
        const distanceMagnitude = Math.sqrt( dx**2 + dy**2 )
        if(distanceMagnitude > this.options.radius || distanceMagnitude == 0) return
        switch(this.options.mode) {
            case 'attract':
                this.applyForce(
                    particle,
                    { x: dx/distanceMagnitude, y: dy/distanceMagnitude },
                    data.mass,
                    -1
                )
                break
        }
    }
    onParticleCreate = (particle: Particle) => {
        particle.pluginData.set(this.id, { 
            mass: ParticleSystem.numberInRange(this.options.particleConfig ? this.options.particleConfig.mass : range(1, 1))
        })
    }
    applyForce(particle: Particle, direction: Vector, mass: number, sign: 1 | -1) {
        const accelerationMagnitude = this.options.strength ? this.options.strength / mass : 10 / mass
        particle.acceleration = { x: accelerationMagnitude*direction.x*sign, y: accelerationMagnitude*direction.y*-sign }
    }
    constructor(options: ReactivityOptions) {
        this.options = options
    }
}