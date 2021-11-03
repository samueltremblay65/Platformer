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

        this.substate = 0;
        this.slowness = 1;
        if(config.slowness != null)
        {
            console.log("creating sprite with different slowness");
            this.slowness = config.slowness;
        }
        if(config.random_phase == true)
        {
            this.currentState = Math.floor( Math.random() * this.num_states );
        }
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

        this.substate++;
        if(this.substate == this.slowness)
        {
            this.substate = 0;
            this.currentState++;
        }
        if(this.currentState == this.num_states)
        {
            this.currentState = 0;
        }
    }
}