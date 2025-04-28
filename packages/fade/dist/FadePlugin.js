import { FadeInHandler, FadeOutHandler } from "./FadeHandler";
export default class FadePlugin {
    id = '@particulab/fade';
    options;
    setup(system) {
        console.log(`✅ ${this.id} was installed successfully.`);
        return system;
    }
    onParticleUpdate = (particle, deltaTime) => {
        const data = particle.pluginData.get(this.id);
        if (!data)
            return;
        if (data.fadeInHandler) {
            if (particle.age <= data.fadeIn.duration) {
                if (particle.age == 0) {
                    particle.opacity = data.fadeIn.opacity != undefined ? data.fadeIn.opacity : particle.opacity;
                    particle.size = data.fadeIn.scaleFactor != undefined ? data.fadeIn.scaleFactor * particle.size : particle.size;
                }
                particle.opacity += data.fadeInHandler?.deltaOpacity * deltaTime;
                particle.opacity = Math.max(0, Math.min(100, particle.opacity));
                particle.size += data.fadeInHandler.deltaSize * deltaTime;
                particle.size = Math.max(0, particle.size);
            }
        }
        if (data.fadeOutHandler) {
            if (particle.lifeSpan - particle.age <= data.fadeOut?.duration) {
                particle.opacity += data.fadeOutHandler?.deltaOpacity * deltaTime;
                particle.opacity = Math.max(0, Math.min(100, particle.opacity));
                particle.size += data.fadeOutHandler.deltaSize * deltaTime;
                particle.size = Math.max(0, particle.size);
            }
        }
    };
    onParticleCreate = (particle) => {
        particle.pluginData.set(this.id, {
            fadeInHandler: new FadeInHandler(particle, this.options.fadeIn),
            fadeOutHandler: new FadeOutHandler(particle, this.options.fadeOut),
            ...this.options
        });
    };
    constructor(options) {
        this.options = options;
    }
}
