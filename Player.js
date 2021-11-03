class Player
{
    constructor(config)
    {
        this.grav_constant = config.grav_constant;
        this.leftPressed = false;
        this.rightPressed = false;
        this.lastPressed = true;
        this.grounded = true;
        this.jump = false;
        this.jump_state = 0;
        this.jump_states = 13;
        this.gravity_state = 0;
        this.speed = config.speed;
    }

}