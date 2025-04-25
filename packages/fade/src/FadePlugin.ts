import { Particle, ParticleSystem, Plugin } from "@particulab/core"
import { FadeInHandler, FadeOutHandler } from "./FadeHandler"
import FadeOptions from "./FadeOptions"

export default class FadePlugin implements Plugin {
    public readonly id: string = '@particulab/fade'
    private readonly options: { fadeIn: FadeOptions, fadeOut: FadeOptions }

    setup(system: ParticleSystem): unknown {
        console.log(`✅ ${this.id} was installed successfully.`)
        return system
    }
    onParticleUpdate = (particle: Particle, deltaTime: number) => {
        const data = particle.pluginData.get(this.id) as { fadeIn: FadeOptions, fadeOut: FadeOptions, fadeInHandler: FadeInHandler, fadeOutHandler: FadeOutHandler }
        if(!data) return
        if(data.fadeInHandler) {
            if(particle.age <= data.fadeIn.duration) {
                console.log(particle.opacity)
                particle.opacity += data.fadeInHandler?.deltaOpacity * deltaTime
                particle.opacity = Math.max(0, Math.min(100, particle.opacity))
                particle.size += data.fadeInHandler.deltaSize * deltaTime
                particle.size = Math.max(0, particle.size)
            }
        }

        if(data.fadeOutHandler) {
            if(particle.lifeSpan - particle.age <= data.fadeOut?.duration) {
                particle.opacity += data.fadeOutHandler?.deltaOpacity * deltaTime
                particle.opacity = Math.max(0, Math.min(100, particle.opacity))
                particle.size += data.fadeOutHandler.deltaSize * deltaTime
                particle.size = Math.max(0, particle.size)
            }
        }
    }
    onParticleCreate = (particle: Particle) => {
        console.log(this)
        particle.pluginData.set(this.id, { 
            fadeInHandler: new FadeInHandler(particle, this.options.fadeIn), 
            fadeOutHandler: new FadeOutHandler(particle, this.options.fadeOut),
            ...this.options 
        })
        const data = particle.pluginData.get(this.id) as { fadeIn: FadeOptions, fadeOut: FadeOptions, fadeInHandler: FadeInHandler, fadeOutHandler: FadeOutHandler }
        if(!data) return
        if(data.fadeInHandler) {
            particle.opacity = data.fadeIn.opacity || particle.opacity
            particle.size = data.fadeIn.scaleFactor ? data.fadeIn.scaleFactor * particle.size : particle.size
        }
    }
    constructor(options: { fadeIn: FadeOptions, fadeOut: FadeOptions }) {
        this.options = options
    }
}