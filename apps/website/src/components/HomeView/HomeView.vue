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

    <div id="fps">0 FPS</div>
    <div id="particles">0 Particles</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import * as particulab from 'particulab'

export default defineComponent({
    mounted() {
        const canvas = document.getElementById('container') as HTMLCanvasElement

        const system = new particulab.ParticleSystem(canvas, { 
            canvasSize: { x: window.innerWidth, y: window.innerHeight },
            amount: 1,
            lifeSpan: particulab.range(5, 10)
        })

        system.size = particulab.range(15, 25)
        system.speed = { x: particulab.range(-2, 2), y: particulab.range(-2, 2) }
        system.colors.push(new particulab.HEX("ffffff"))
        system.colors.push(new particulab.RGBA(255, 255, 0, 1))
        system.opacity = particulab.range(50, 100)
        system.shapes.push("star")

        const fadePlugin = new particulab.FadePlugin({
            fadeIn: {
                duration: 2,
                opacity: 0
            },
            fadeOut: {
                duration: 2,
                opacity: 0
            }
        })
        system.installPlugin(fadePlugin)
        system.init()

        const count = document.getElementById('particles') as HTMLElement
        function updateCount() {
            count.innerText = system.particles.size + ' Particles'
            requestAnimationFrame(updateCount)
        }

        requestAnimationFrame(updateCount)
    },

    methods: {
        updateFPS() {
            const fpsCounter = document.getElementById('fps') as HTMLElement
 
            let lastFrameTime = performance.now()
            let frameCount = 0
            let fps = 0

            function updateFPS(currentTime: number) {
                frameCount++;

                const delta = currentTime - lastFrameTime
                if (delta >= 1000) {
                fps = Math.round((frameCount / delta) * 1000)
                fpsCounter.textContent = `${fps} FPS`
                frameCount = 0
                lastFrameTime = currentTime
                }

                requestAnimationFrame(updateFPS)
            }

            requestAnimationFrame(updateFPS)
        }
    }
})
</script>

<style scoped>
@import url("../../styles/landing.css");
</style>