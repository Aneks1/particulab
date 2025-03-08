import { Interval } from ".."
export default function range(min: number, max: number): Interval {
    return { min: min, max: max }
}