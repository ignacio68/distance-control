export interface AnimationRange {
  from: number
  to: number
}

export interface JsAnimationDefinition {
  getRange: () => AnimationRange
  curve(progress: number): number
  step(deltaResult: number): void
  // condition: () => boolean
}

export const amountFromTo = (range: AnimationRange) => (t: number) => {
  const ret = range.from + t * (range.to - range.from)
  return ret
}

export const animate = (duration: number, defs: JsAnimationDefinition[]) => {
  return new Promise((resolve) => {
    const start = new Date()

    const timerId = setInterval(() => {
      const timePassed = new Date().valueOf() - start.valueOf()

      let progress = timePassed / duration
      if (progress > 1) progress = 1

      defs.map((def) => {
        const delta = def.curve(progress)
        const v = amountFromTo(def.getRange())(delta)

        def.step(v)
      })

      if (progress === 1) {
        clearInterval(timerId)
        resolve()
      }
    }, 17)
  })
}
