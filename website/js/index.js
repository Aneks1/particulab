const fpsCounter = document.getElementById('fps')

let lastFrameTime = performance.now()
let frameCount = 0
let fps = 0

function updateFPS(currentTime) {
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