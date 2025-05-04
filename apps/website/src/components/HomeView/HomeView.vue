<template>
    <canvas width="1600" height="900" id="container"></canvas>
    <div class="panel_wrapper">
        <div class="panel">
            <h1>particulab</h1>
            <p>Library to create amazing particle backgrounds with a fully customizable particle system.</p>
            <a class="btn" href="/docs">
                <span>Docs</span>
            </a>
            <a class="btn" href="https://github.com/Aneks1/particulab">
                <span>Github</span>
            </a>
            <a class="btn" href="https://www.npmjs.com/package/particulab">
                <span>npm</span>
            </a>
        </div>
    </div>

    <div id="fps">{{ `${fps} FPS` }}</div>
    <div id="particles">{{ `${count} Particles` }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as particulab from 'particulab'

export default defineComponent({
    mounted() { 
        const canvas = document.getElementById('container') as HTMLCanvasElement

        const system = new particulab.ParticleSystem(canvas, { 
            canvasSize: { x: window.innerWidth, y: window.innerHeight },
            amount: 1e3,
            lifeSpan: particulab.range(5, 10)
        })

        system.size = particulab.range(1, 2)
        system.velocity = { x: particulab.range(-2, 2), y: particulab.range(-2, 2) }
        system.colors.push(new particulab.HEX("ffffff"))
        system.colors.push(new particulab.RGBA(0, 255, 255, 1))
        system.opacity = particulab.range(25, 100)
        system.shapes.push("circle")

        const fadePlugin = new particulab.FadePlugin({
            fadeIn: {
                duration: 2,
                opacity: 0,
                scaleFactor: 0.5,

            },
            fadeOut: {
                duration: 2,
                opacity: 0,
                scaleFactor: 2
            }
        })

        const reactivityPlugin = new particulab.ReactivityPlugin({
            mode: 'attract',
            radius: 100,
            strength: 100,
            particleConfig: {
                mass: particulab.range(1, 1)
            }
        })

        system.installPlugin(reactivityPlugin)
        system.installPlugin(fadePlugin)
        system.init()

        const updateCount = () => {
            this.count = system.particles.size
            requestAnimationFrame(updateCount)
        }

        requestAnimationFrame(updateCount)
        this.updateFPS()
    },
    data() {
        return {
            fps: 0,
            count: 0
        }
    },
    methods: {
        updateFPS() {
            let lastFrameTime = performance.now()
            let frameCount = 0

            const updateFPS = (currentTime: number) => {
                frameCount++;
                const delta = currentTime - lastFrameTime
                if (delta >= 1000) {
                    this.fps = Math.round((frameCount / delta) * 1000)
                    frameCount = 0
                    lastFrameTime = currentTime
                }
                requestAnimationFrame(updateFPS)
            }
            updateFPS(0)
        }
    }
})
</script>

<style scoped>
@import url("../../styles/landing.css");
</style>