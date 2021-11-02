class Sprite
{
    constructor(config)
    {
        this.image = new Image();
        this.image.src = config.src;
        this.isLoaded = false;
        this.image.onload = () => {
            this.isLoaded = true;
        }
        this.num_states = config.num_states;
        this.currentState = 0;
    }

    reset()
    {
        this.currentState = 0;
    }

    draw(ctx, x, y)
    {        
        ctx.drawImage(this.image, 
            32*this.currentState,0,
            32, 32,
            x, y,
            32, 32
        );

        this.currentState++;
        if(this.currentState == this.num_states)
        {
            this.currentState = 0;
        }
    }
}