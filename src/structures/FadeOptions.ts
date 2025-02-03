export interface FadeOptions { duration: number }
export interface OpacityFadeOptions extends FadeOptions { targetOpacity: number }
export interface ScaleFadeOptions extends FadeOptions { targetScaleFactor: number }
export interface OpacityScaleFadeOptions extends OpacityFadeOptions, ScaleFadeOptions {}