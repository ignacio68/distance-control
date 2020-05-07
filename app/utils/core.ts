const PI = Math.PI

const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step))

const radiansToDegrees = (radians: number)  => radians * (180 / PI);

const degreesToRadians = (degrees: number) => degrees * (PI / 180)
 
export { PI, range, degreesToRadians }