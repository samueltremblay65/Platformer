class GameObject
{
    constructor(config)
    {
        this.x = config.x;
        this.y = config.y;

        this.spriteDict = config.spriteDict;
    }

    draw(ctx, spriteName)
    {
        this.spriteDict[spriteName].draw(ctx, this.x, this.y);
    }

    move(x, y)
    {
        this.x += x;
        this.y += y;
    }

    getPosition()
    {
        let coordinates = {
            x: this.x, y: this.y
        };
        return coordinates;
    }
}