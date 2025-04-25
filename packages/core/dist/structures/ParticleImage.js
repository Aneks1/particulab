export default class ParticleImage {
    src;
    element;
    constructor(src) {
        this.src = src;
        this._loadImage();
    }
    async _loadImage() {
        try {
            this.element = await this.createImage(this.src);
        }
        catch (error) {
            console.error(`Failed to load image: ${this.src}`, error);
        }
    }
    createImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Image failed to load: ${src}`));
        });
    }
}
