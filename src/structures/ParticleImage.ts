export default class ParticleImage {
    private src: string;
    public element!: HTMLImageElement
    
    constructor(src: string){
        this.src = src
        this.loadImage()
    }

    private async loadImage() {
        try {
            this.element = await this.createImage(this.src)
        } catch (error) {
            console.error(`Failed to load image: ${this.src}`, error)
        }
    }

    private createImage(src: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = src
            img.onload = () => resolve(img)
            img.onerror = () => reject(new Error(`Image failed to load: ${src}`))
        })
    }
}