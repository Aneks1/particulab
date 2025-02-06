export interface FadeOptions { duration: number }
export interface OpacityFadeOptions extends FadeOptions { opacity: number }
export interface ScaleFadeOptions extends FadeOptions { scaleFactor: number }
export interface OpacityScaleFadeOptions extends OpacityFadeOptions, ScaleFadeOptions {}