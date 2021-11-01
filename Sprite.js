class Sprite
{
    constructor(config)
    {
        this.image = new Image();
        this.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        this.num_states = config(config.num_states)
        this.currentState = 0;
    }

    reset()
    {
        this.currentState = 0;
    }

    draw(ctx, x, y)
    {
        if(!this.isLoaded)
        {
            return;
        }
        
        ctx.drawImage(this.image, 
            32*this.currentState,0,
            32, 32,
            x, y,
            32, 32
        );
    }
}