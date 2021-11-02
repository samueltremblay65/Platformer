let canvas = document.getElementById("game_canvas");
let ctx = canvas.getContext("2d");

const canvas_width = 15;
const canvas_height = 12;

const backgroundImg = new Image();
backgroundImg.src = "assets/Terrain/Background1.jpg";

const floorImg = new Image();
floorImg.src = "assets/Terrain/Purple Bricks (32x32).png"

function drawGameObject(gameObject, spriteName)
{
    gameObject.draw(ctx, spriteName);
}

function clearCanvas()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawBackground()
{
    ctx.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height);
}

function drawFloor()
{
    for(var i = 0; i < canvas_width; i++)
    {
        ctx.drawImage(
            floorImg,
            32*5, 32*5,
            32, 32,
            32*i, 32*(canvas_height-1),
            32, 32
        );
    }
}

function drawFloorFromConfig(floorConfig)
{
    for(var i = 0; i < floorConfig.length; i++)
    {
        ctx.drawImage(
            floorImg,
            32*5, 32*5,
            32, 16,
            32*floorConfig[i].x, 32*floorConfig[i].y,
            32, 16
        );
    }
}

character_sprite_idle_config = {
    src: "assets/Ninja Frog/Idle (32x32).png",
    num_states: 11
}
character_sprite_idle_left_config = {
    src: "assets/Ninja Frog/IdleLeft (32x32).png",
    num_states: 11
}

character_sprite_run_right_config = {
    src: "assets/Ninja Frog/Run (32x32).png",
    num_states: 12
}

character_sprite_run_left_config = {
    src: "assets/Ninja Frog/RunLeft (32x32).png",
    num_states: 12
}

character_sprite_jump_config = {
    src: "assets/Ninja Frog/Jump (32x32).png",
    num_states: 1
}
character_sprite_jump_left_config = {
    src: "assets/Ninja Frog/JumpLeft (32x32).png",
    num_states: 1
}

let character_idle_sprite = new Sprite(character_sprite_idle_config);
let character_idle_left_sprite = new Sprite(character_sprite_idle_left_config);
let character_jump_sprite = new Sprite(character_sprite_jump_config);
let character_jump_left_sprite = new Sprite(character_sprite_jump_left_config);
let character_run_right_sprite = new Sprite(character_sprite_run_right_config);
let character_run_left_sprite = new Sprite(character_sprite_run_left_config);

character_config = {
    x:32*2, y: 32*(canvas_height-2), spriteDict: {"idle": character_idle_sprite, "run_right": character_run_right_sprite, "jump": character_jump_sprite, "run_left": character_run_left_sprite, "jump_left": character_jump_left_sprite, "idle_left": character_idle_left_sprite} 
}

let character = new GameObject(character_config);
character['speed'] = 3;

// Example floor config
// floorConfig1 = [
//     { x:5, y: canvas_height- 3 },
//     { x:6, y: canvas_height- 3 },
//     { x:7, y: canvas_height- 3 },
//     { x:8, y: canvas_height- 3 },
// ]

// Arrow control

var leftPressed = false;
var rightPressed = false;
var lastPressed = true;
var jump = false;
var jump_state = 0;
var grounded = true;
const jump_path = [-5, -4, -3, -2, -1, 0, 0, 0, 1, 2, 3, 4, 5];

document.onkeydown = checkKey;
document.onkeyup = checkKeyUp;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        if(grounded)
            jump = true;
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       leftPressed = true;
       lastPressed = false;
    }
    else if (e.keyCode == '39') {
       // right arrow
       rightPressed = true;
       lastPressed = true;
    }
}

function checkKeyUp(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       leftPressed = false;
    }
    else if (e.keyCode == '39') {
       // right arrow
       rightPressed = false;
    }
}

function characterMovement()
{
    if(jump)
    {
        var sprite_name;
        if(leftPressed && rightPressed)
        {
            if(lastPressed)
                sprite_name = "jump";
            else
                sprite_name = "jump_left";
        }
        else if(leftPressed)
        {
            character.move(character['speed'] * -1, 0);
            sprite_name = "jump_left";
        }
        else if(rightPressed)
        {
            character.move(character['speed'], 0);
            sprite_name = "jump";
        }
        else
        {
            if(lastPressed)
                sprite_name = "jump";
            else
                sprite_name = "jump_left";
        }
        character.move(0, 2 * jump_path[jump_state]);
        drawGameObject(character, sprite_name);
        jump_state++;
        if(jump_state == 13)
        {
            jump = false;
            jump_state = 0;
            grounded = true;
        }
        return;
    }
    if(leftPressed && rightPressed)
    {
        drawGameObject(character, "idle");
    }
    else if(leftPressed)
    {
        character.move(character['speed'] * -1, 0);
        drawGameObject(character, "run_left");
    }
    else if(rightPressed)
    {
        character.move(character['speed'], 0);
        drawGameObject(character, "run_right");
    }
    else
    {
        if(lastPressed)
        {
            drawGameObject(character, "idle");
        }
        else
        {
            drawGameObject(character, "idle_left");
        }
    }
}

var counter = 0;

setInterval(() => {
    clearCanvas();
    drawBackground();
    drawFloor();
    characterMovement();
}, 50);


