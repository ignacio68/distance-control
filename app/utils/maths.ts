const toRadians = 0.017453292519943295 // PI / 180
const toDegrees = 57.2958 // 180 / PI

const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

const degreesToRadians = (degrees: number) => degrees * toRadians
const radiansToDegrees = (radians: number) => radians * toDegrees

export {
    range,
    degreesToRadians,
    radiansToDegrees
}