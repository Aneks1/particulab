type interval = { min: number, max: number }
export default function range(min: number, max: number): interval {
    return { min: min, max: max }
}