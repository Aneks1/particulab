# Particulab — TODO

> Roadmap basado en una revisión estática de `main` (8 de noviembre de 2026). Prioridades: **P0** = bloqueante/corrección fundamental; **P1** = alta; **P2** = media; **P3** = mejora futura. Los problemas identificados por inspección deben verificarse con pruebas antes de cerrarlos.

## Fase 1 — Corregir errores y estabilizar el motor

### P0 — Física y consistencia
- [ ] **Acumular fuerzas en vez de sobrescribir aceleración.** `ReactivityPlugin.applyForce()` reemplaza `particle.acceleration`, impidiendo combinar efectos. Añadir acumulador de fuerzas por partícula, masa y cálculo de aceleración resultante (`ΣF / m`). **Archivos:** `packages/reactivity/src/ReactivityPlugin.ts`, `packages/core/src/structures/Particle.ts`.
- [ ] **Unificar el sistema de coordenadas.** `Particle.update()` usa `position.x += ...` pero `position.y -= ...`; definir si el mundo usa Y hacia arriba o abajo y realizar conversiones en un solo lugar (idealmente renderizado). Ajustar todas las fuerzas y la interacción del cursor. **Archivo:** `packages/core/src/structures/Particle.ts`.
- [ ] **Establecer una integración física consistente.** Revisar Euler explícito actual (posición antes que velocidad), implementar inicialmente Euler semiimplícito y probar comportamiento con aceleraciones variables. **Archivo:** `packages/core/src/structures/Particle.ts`.

### P1 — Ciclo de vida y robustez
- [ ] **Evitar múltiples animation loops.** Hacer `init()` idempotente o separar `start()` de inicialización; mantener estado `running`. **Archivo:** `packages/core/src/structures/ParticleSystem.ts`.
- [ ] **Implementar `start`/`stop`/`resume`/`destroy`.** Cancelar `requestAnimationFrame`, liberar listeners y recursos; definir semántica de `clear()` (vacía partículas sin reponerlas inmediatamente o se pausa). **Archivo:** `ParticleSystem.ts` y plugins.
- [ ] **Usar timestep fijo o limitado.** Evitar saltos enormes al volver a una pestaña y documentar unidades de velocidad/aceleración. Considerar acumulador de tiempo y substeps. **Archivo:** `ParticleSystem.ts`.
- [ ] **Corregir coordenadas del cursor.** Convertir `clientX/clientY` a coordenadas locales del canvas mediante `getBoundingClientRect()`, teniendo en cuenta escalado CSS y resolución interna. **Archivo:** `packages/reactivity/src/ReactivityPlugin.ts`.
- [ ] **Eliminar listeners al desinstalar/destruir plugins.** `mousemove` se registra en `window` sin cleanup; añadir hook `dispose`/`destroy`. **Archivo:** `ReactivityPlugin.ts`.
- [ ] **Manejar imágenes aún no cargadas.** `ParticleImage` carga de forma asíncrona; no llamar `drawImage()` hasta que el recurso esté listo. Definir comportamiento ante error de carga. **Archivos:** `ParticleImage.ts`, `Particle.ts`.
- [ ] **Corregir opciones que aceptan cero.** Reemplazar `||` por `??` cuando cero sea válido (`opacity`, `size`, etc.) y validar los parámetros. **Archivos:** constructores de `Particle.ts`, `ParticleSystem.ts` y plugins.
- [ ] **Completar los modos de reactividad o retirarlos de la API.** `ReactionMode` declara `attract`, `repel` y `force-field`, pero el `switch` implementa solo `attract`. **Archivos:** `packages/reactivity/src/index.ts`, `ReactivityPlugin.ts`.
- [ ] **Revisar el estado de aceleración al salir del radio del cursor.** La aceleración asignada por reactividad persiste si la partícula sale del radio; definir si debe cesar y cómo interactúa con otras fuerzas. **Archivo:** `ReactivityPlugin.ts`.
- [ ] **Arreglar loops auxiliares de la demo.** FPS y contador crean `requestAnimationFrame` sin cancelación al desmontar Vue; añadir `onUnmounted`/cleanup y destruir el sistema. **Archivo:** `apps/website/src/components/HomeView/HomeView.vue`.

### P2 — API, renderizado y calidad
- [ ] **Hacer los hooks de plugins opcionales.** No exigir `onParticleCreate` y `onParticleUpdate` si un plugin no los necesita; definir `setup`, `update`, `dispose` y, si hace falta, orden/prioridad. **Archivo:** `packages/core/src/structures/Plugin.ts`.
- [ ] **Revisar cómo se registran callbacks.** Actualmente se copian callbacks de plugins a cada partícula al nacer; permitir cambios/desinstalación de plugins y evitar duplicados. **Archivo:** `ParticleSystem.ts`.
- [ ] **Separar simulación de dibujo.** Métodos claros para `update(dt)` y `render(ctx)`; permitir tests sin canvas y futuros renderizadores. **Archivos:** `Particle.ts`, `ParticleSystem.ts`.
- [ ] **Añadir `resize` y soporte devicePixelRatio.** Adaptar resolución y coordenadas a CSS/resizes sin perder nitidez. **Archivo:** `ParticleSystem.ts`.
- [ ] **Permitir rangos decimales.** `numberInRange()` redondea límites y devuelve enteros; crear `randomFloat` y `randomInt` explícitos, con validación de min/max. **Archivo:** `ParticleSystem.ts` / `utils`.
- [ ] **Definir defaults y validación de colores/formas.** Evitar arrays vacíos que generen `undefined`; validar tamaños, duración, masa, opacidad y valores finitos. **Archivo:** `ParticleSystem.ts`.
- [ ] **Mejorar `FadePlugin`.** Revisar interpolaciones basadas en edad normalizada, easing, casos de duración cero y coherencia al modificar tamaño/opacidad durante el efecto. **Archivos:** `packages/fade/src/FadePlugin.ts`, `FadeHandler.ts`.
- [ ] **Evitar trabajo por partícula innecesario.** Evaluar reutilizar `ShapeManager`, minimizar asignaciones en cada frame y cambios de estado de canvas; medir antes de optimizar. **Archivos:** `Particle.ts`, `ShapeManager.ts`.
- [ ] **Corregir README y ejemplos.** Faltan comas en `ParticleSystem` options; `system.speed` debe ser `system.velocity`; corregir `system.shapes.push[new ParticleImage(...)]` por llamada `push(...)` e importar `ParticleImage` correctamente. **Archivo:** `README.md` (y copias en paquetes).
- [ ] **Actualizar documentación desfasada.** Hay referencias a `speed`, `fadeIn` y `fadeOut` en `ParticleSystemOptions` que no corresponden a la interfaz actual; corregir enlaces y nombres. **Ruta:** `apps/website/src/content/docs/`.
- [ ] **Limpiar archivos generados versionados.** Revisar y dejar de trackear `.turbo/`, `dist/`, `types/` y `*.tsbuildinfo` cuando corresponda; completar `.gitignore` sin eliminar artefactos necesarios para publicación. **Rutas:** raíz y paquetes.
- [ ] **Añadir pruebas automatizadas.** Cubrir integración física, combinación de fuerzas, vida/respawn, cero como opción válida, rangos, plugins, resize, cursor y cleanup; integrar en CI.

## Fase 2 — Base matemática multivariable

### P1 — Primitivas matemáticas
- [ ] Crear `Vector2` con suma, resta, producto escalar, escala, magnitud, normalización y distancia, sin mezclar coordenadas de canvas con coordenadas físicas.
- [ ] Definir `ScalarField`: `f(x, y, t?) => number`.
- [ ] Definir `VectorField`: `F(x, y, t?) => Vector2`.
- [ ] Implementar gradiente analítico a partir de derivadas parciales suministradas por el usuario: `∇f = (∂f/∂x, ∂f/∂y)`.
- [ ] Implementar gradiente numérico mediante diferencias finitas centrales, con parámetro `h`, validación y pruebas de precisión.
- [ ] Definir unidades, origen y escala de coordenadas para los campos (píxeles vs coordenadas normalizadas).

### P2 — Herramientas adicionales
- [ ] Crear funciones/presets de campos: uniforme, radial, rotacional y oscilante dependiente de tiempo.
- [ ] Agregar pruebas de campos conocidos: `f(x,y)=x²+y²`, `∇f=(2x,2y)` y `F(x,y)=(-y,x)`.
- [ ] Documentar diferencia entre campo de velocidad, aceleración y fuerza; un campo matemático no siempre debe tratarse como fuerza.
- [ ] Considerar divergencia, rotacional y campos conservativos después de consolidar la API básica.

## Fase 3 — Comportamientos basados en campos

### P1 — Integración con partículas
- [ ] Diseñar API componible para `FieldBehavior`/`FieldPlugin` con `field`, `mode: 'velocity' | 'acceleration' | 'force'` y `strength`.
- [ ] Implementar aplicación de campos a cada partícula según posición y tiempo, respetando masa cuando el modo sea fuerza.
- [ ] Permitir sumar varios campos y comportamientos con reglas explícitas para los modos que fijan velocidad.
- [ ] Implementar atractores/repulsores mediante campos radiales o gradientes negativos/positivos.
- [ ] Implementar vórtices con `F(x,y)=(-y,x)` y controlar la intensidad según distancia para evitar velocidades excesivas.
- [ ] Implementar campos temporales, por ejemplo `F(x,y,t)=(sin(y+t), cos(x-t))`.

### P2 — Propiedades visuales procedurales
- [ ] Permitir que tamaño, opacidad y color dependan de funciones escalares de `(x,y,t)`.
- [ ] Agregar ejemplo de opacidad `100·exp(-k(x²+y²))`, normalizada a las dimensiones del canvas.
- [ ] Incorporar presets reutilizables y ejemplos de composición de fuerzas/campos.

## Fase 4 — Experiencia de uso, rendimiento y playground

### P2 — Funcionalidades para backgrounds
- [ ] Añadir emisores/spawners configurables: punto, línea, círculo y región rectangular.
- [ ] Añadir políticas de límites: wrap, respawn, eliminar y rebote.
- [ ] Añadir damping/amortiguamiento configurable y documentar sus unidades.
- [ ] Evaluar pooling de partículas y estructuras de datos más compactas **después** de medir cuellos de botella.
- [ ] Medir FPS, tiempo de actualización/render, memoria y escalabilidad con diferentes cantidades de partículas.
- [ ] Evaluar optimizaciones de Canvas 2D; considerar WebGL solo si los benchmarks justifican su complejidad.

### P3 — Playground educativo e interactivo
- [ ] Crear editor visual para seleccionar presets y ajustar parámetros en vivo.
- [ ] Mostrar flechas de un campo vectorial superpuestas a las partículas.
- [ ] Mostrar opcionalmente la función escalar, gradiente y curvas de nivel.
- [ ] Permitir escribir o configurar funciones personalizadas de forma segura, sin ejecutar texto arbitrario con `eval`.
- [ ] Añadir ejemplos didácticos de gradientes, atracción, rotación y campos dependientes del tiempo.
- [ ] Crear documentación que conecte fórmulas matemáticas con efectos visuales y ejemplos TypeScript.

## Criterios de finalización de cada fase

- **Fase 1:** no hay loops duplicados ni listeners filtrados; física y coordenadas coherentes; tests de regresión pasan; README ejecutable.
- **Fase 2:** campos y gradientes probados independientemente del canvas, con documentación de convenciones y precisión numérica.
- **Fase 3:** varios comportamientos se combinan de forma predecible; hay demos de atracción, vórtice y campo temporal.
- **Fase 4:** playground funcional, presets documentados y métricas reproducibles de rendimiento.

## Fuera de alcance inicial

- [ ] No introducir WebGL por defecto ni un parser simbólico completo antes de validar las necesidades reales.
- [ ] No reescribir todo el monorepo de una vez; mantener compatibilidad pública cuando sea viable y documentar cambios incompatibles.
