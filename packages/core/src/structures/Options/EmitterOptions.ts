import { Vector } from "../.."
import { Coordinates } from "../.."
import { FnInterval } from "../.."
import { Condition } from "../.."

export default interface EmitterOptions<T extends Coordinates = "cartesian"> {
    coordinates: T
    fn:  T extends "cartesian" 
        ? (x: number) => number 
        : (theta: number) => number
    domain: FnInterval
    range: FnInterval
    condition?: Condition
    position?: Vector
    debug?: boolean
    scale?: Vector
}