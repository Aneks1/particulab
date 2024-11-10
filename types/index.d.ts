declare global {
    interface Window {
        particlex: { ParticleSystem: typeof ParticleSystem, Particle: typeof Particle }
    }
}

export {}