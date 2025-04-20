import p5 from "p5";

export default interface P5PlayInstance extends p5 {
    P5Play: {
        new(): P5Play
    },
    Sprite: {
        new(x?: number, y?: number, w?: number, h?: number, collider?: string, ...args: any[]): Sprite
    },
    Ani: {
        new(...args: (new (width?: number, height?: number) => HTMLImageElement)[]): Ani
    },
    Anis: {
        new(): Anis
    },
    Group: {
        new(...args: any[]): Group
    },
    World: {
        new(): World
    },
    Camera: {
        new(): Camera
    },
    Tiles: {
        new(tiles: string, x: number, y: number, w: number, h: number): Tiles
    },
    Joint: {
        new(spriteA: Sprite, spriteB: Sprite, type?: string): Joint
    },
    GlueJoint: {
        new(spriteA: Sprite, spriteB: Sprite, ...args: any[]): GlueJoint
    },
    DistanceJoint: {
        new(spriteA: Sprite, spriteB: Sprite, ...args: any[]): DistanceJoint
    },
    WheelJoint: {
        new(spriteA: Sprite, spriteB: Sprite, ...args: any[]): WheelJoint
    },
    HingeJoint: {
        new(spriteA: Sprite, spriteB: Sprite, ...args: any[]): HingeJoint
    },
    SliderJoint: {
        new(spriteA: Sprite, spriteB: Sprite, ...args: any[]): SliderJoint
    },
    RopeJoint: {
        new(spriteA: Sprite, spriteB: Sprite, ...args: any[]): RopeJoint
    },
    GrabberJoint: {
        new(sprite: Sprite): GrabberJoint
    },
    Scale: {
        new(): Scale
    },
    Canvas: {
        new(width?: number, height?: number, options?: any): Canvas
    },
    FriendlyError: {
        new(func: any, errorNum: any, e: any): FriendlyError
    },
    InputDevice: {
        new(): InputDevice
    },
    Contro: {
        new(gp: any): Contro
    },

    createTiles(tiles: any, x: any, y: any, w: any, h: any): any,

    colorPal(c: string, palette: number | any): string,

    EmojiImage(emoji: string, textSize: number): new (width?: number, height?: number) => HTMLImageElement,

    spriteArt(txt: string, scale: number, palette: number | any): new (width?: number, height?: number) => HTMLImageElement,

    createSprite(...args: any[]): Sprite,

    createGroup(...args: any[]): Group,

    loadAnimation(...args: any[]): Ani,

    loadAni(...args: any[]): Ani,

    animation(ani: Ani, x: number, y: number, r: number, sX: number, sY: number): void,

    delay(milliseconds: any): Promise<any>,

    sleep(milliseconds: any): Promise<any>,

    play(sound: any): Promise<any>,

    loadImg(...args: any[]): new (width?: number, height?: number) => HTMLImageElement,

    p5play: P5Play,
    canvas: Canvas,
    allSprites: Group,
    world: World,
    mouse: _Mouse,
    kb: _Keyboard,
    keyboard: _Keyboard,
    contros: _Contros,
    controllers: _Contros,
    contro: Contro
}