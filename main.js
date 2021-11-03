let canvas = document.getElementById("game_canvas");
let ctx = canvas.getContext("2d");

// Level
var level = new Level();

// Canvas size in tiles
const canvas_width = 15;
const canvas_height = 12;

// Background and terrain images
const backgroundImg = new Image();
backgroundImg.src = "assets/backgrounds/Blue.png";

const terrain = new Image();
terrain.src = "assets/Terrain/Terrain (16x16).png"

// counter for apples collected
let apples_collected = 0;

// Functions for drawing basic game
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
    for(var i = 0; i < canvas_height; i++)
    {
        for(var j = 0; j < canvas_width; j++)
        {
            ctx.drawImage(backgroundImg, 32*j, 32*i);
        }
    }
}

function addHardTileToConfig(x, y, texture, levelConfig)
{
    levelConfig.push({x: x, y: y, texture: texture});
}

function setLevelFromConfig(levelConfig)
{
    levelConfig.forEach(element => {
        level.addHardTile(element.x, element.y);
    });
}

function drawHardTilesFromConfig(levelConfig)
{
    for(var i = 0; i < levelConfig.length; i++)
    {
        var image;
        var texture = levelConfig[i].texture;
        var cut_x, cut_y;
        if(texture == "metal_tile")
        {
            image = terrain;
            cut_x = 0, cut_y = 0;
        }
        else if(texture == "ground")
        {
            image = terrain;
            cut_x = 32*3; 
            cut_y = 32*2;
        }
        ctx.drawImage(
            image,
            cut_x, cut_y,
            48, 48,
            32*levelConfig[i].x, 32*levelConfig[i].y,
            32, 32
        );
    }
}

function drawApples()
{
    level.apples.forEach(element => {
        if(element.currentSprite == "collected")
        {

            if(element.collected_state == null)
            {
                element.collected_state = 0;
            }
            if(element.collected_state == 6)
            {
                element.visible = false;
            }
            element.collected_state++;
        }
        drawGameObject(element, "idle");
    });
}

function addApple(x, y, level)
{
    let apples_sprite = new Sprite(apples_sprite_config);
    
    var apple_config = {
        x: 32 * x, y: 32 * y, leftMargin: 10, rightMargin: 10, topMargin: 10, bottomMargin: 5, spriteDict: {"idle": apples_sprite, "collected": collected_sprite}
    };

    level.apples.push(new GameObject(apple_config, level));
}

// Check if gameObject is on a hard tile
function onHardTile(gameObject, level_ref)
{
    var tileBelow = currentTile(gameObject.x + gameObject.leftMargin, gameObject.y+32);
    if(level_ref.isHardTile(tileBelow.x, tileBelow.y))
    {
        return true;
    }
    tileBelow = currentTile(gameObject.x + 32 - gameObject.rightMargin, gameObject.y+32);
    if(level_ref.isHardTile(tileBelow.x, tileBelow.y))
    {
        return true;
    }
    return false;
}

// collisions with apples
function playerAppleCollisions()
{
    level.apples.forEach(element => {
        // check player1
        if(!element.visible)
        {
            return;
        }
        if(collision(element.getHitBox(), character1.getHitBox()))
        {
            apples_collected++;
            element.currentSprite = "collected";
        }
        // check player2
        if(collision(element.getHitBox(), character2.getHitBox()))
        {
            apples_collected++;
            element.currentSprite = "collected";
        }
    });
}

// Player 1 sprite config
character1_sprite_idle_config = {
    src: "assets/Ninja Frog/Idle (32x32).png",
    num_states: 11
}

character1_sprite_idle_left_config = {
    src: "assets/Ninja Frog/IdleLeft (32x32).png",
    num_states: 11
}

character1_sprite_run_right_config = {
    src: "assets/Ninja Frog/Run (32x32).png",
    num_states: 12
}

character1_sprite_run_left_config = {
    src: "assets/Ninja Frog/RunLeft (32x32).png",
    num_states: 12
}

character1_sprite_jump_config = {
    src: "assets/Ninja Frog/Jump (32x32).png",
    num_states: 1
}
character1_sprite_jump_left_config = {
    src: "assets/Ninja Frog/JumpLeft (32x32).png",
    num_states: 1
}

// Player 2 sprite config
character2_sprite_idle_config = {
    src: "assets/Pink Man/Idle (32x32).png",
    num_states: 11
}

character2_sprite_idle_left_config = {
    src: "assets/Pink Man/IdleLeft (32x32).png",
    num_states: 11
}

character2_sprite_run_right_config = {
    src: "assets/Pink Man/Run (32x32).png",
    num_states: 12
}

character2_sprite_run_left_config = {
    src: "assets/Pink Man/RunLeft (32x32).png",
    num_states: 12
}

character2_sprite_jump_config = {
    src: "assets/Pink Man/Jump (32x32).png",
    num_states: 1
}
character2_sprite_jump_left_config = {
    src: "assets/Pink Man/JumpLeft (32x32).png",
    num_states: 1
}

// apples sprite
apples_sprite_config  = {
    src: "assets/Consumables/Apple.png",
    num_states: 17,
    slowness: 1,
    random_phase: true
}

collect_item_sprite_config  = {
    src: "assets/Consumables/Collected.png",
    num_states: 6
}

// Character 1 sprite init
let character1_idle_sprite = new Sprite(character1_sprite_idle_config);
let character1_idle_left_sprite = new Sprite(character1_sprite_idle_left_config);
let character1_jump_sprite = new Sprite(character1_sprite_jump_config);
let character1_jump_left_sprite = new Sprite(character1_sprite_jump_left_config);
let character1_run_right_sprite = new Sprite(character1_sprite_run_right_config);
let character1_run_left_sprite = new Sprite(character1_sprite_run_left_config);

// Character 2 sprite init
let character2_idle_sprite = new Sprite(character2_sprite_idle_config);
let character2_idle_left_sprite = new Sprite(character2_sprite_idle_left_config);
let character2_jump_sprite = new Sprite(character2_sprite_jump_config);
let character2_jump_left_sprite = new Sprite(character2_sprite_jump_left_config);
let character2_run_right_sprite = new Sprite(character2_sprite_run_right_config);
let character2_run_left_sprite = new Sprite(character2_sprite_run_left_config);

// consumable sprite
let collected_sprite = new Sprite(collect_item_sprite_config);

// Character config
var character1_config = {
    x:32*2, y: 32*(canvas_height-2), spriteDict: {"idle": character1_idle_sprite, "run_right": character1_run_right_sprite, "jump": character1_jump_sprite, "run_left": character1_run_left_sprite, "jump_left": character1_jump_left_sprite, "idle_left": character1_idle_left_sprite} 
}

var character2_config = {
    x:32*1, y: 32*(canvas_height-2), spriteDict: {"idle": character2_idle_sprite, "run_right": character2_run_right_sprite, "jump": character2_jump_sprite, "run_left": character2_run_left_sprite, "jump_left": character2_jump_left_sprite, "idle_left": character2_idle_left_sprite} 
}

let character1 = new GameObject(character1_config, level);
character1['speed'] = 6;

let character2 = new GameObject(character2_config, level);
character2['speed'] = 4;

// Floor configuration
var levelConfig1 = [

];

// Arrow control

// Jump path config
const jump_path = [-5, -4, -3, -2, -1, 0, 0, 0];
const gravity_path = [1, 2, 3, 4, 5];

var player1_config = {
    grav_constant: 3,
    speed: 6
}

var player2_config = {
    grav_constant: 5,
    speed: 4
}

var player1 = new Player(player1_config);
var player2 = new Player(player2_config);

document.onkeydown = checkKey;
document.onkeyup = checkKeyUp;

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        if(player1.grounded)
        {
            player1.jump = true;
            player1.grounded = false;
        }
    }
    else if (e.keyCode == '40') {
        // down arrow
    }
    else if (e.keyCode == '37') {
       // left arrow
       player1.leftPressed = true;
       player1.lastPressed = false;
    }
    else if (e.keyCode == '39') {
       // right arrow
       player1.rightPressed = true;
       player1.lastPressed = true;
    }
    // Player 2
    else if (e.keyCode == '87') {
        // up arrow
        if(player2.grounded)
        {
            player2.jump = true;
            player2.grounded = false;
        }
    }
    else if (e.keyCode == '83') {
        // down arrow
    }
    else if (e.keyCode == '65') {
       // left arrow
       player2.leftPressed = true;
       player2.lastPressed = false;
    }
    else if (e.keyCode == '68') {
       // right arrow
       player2.rightPressed = true;
       player2.lastPressed = true;
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
       player1.leftPressed = false;
    }
    else if (e.keyCode == '39') {
       // right arrow
       player1.rightPressed = false;
    }
    // Player 2
    else if (e.keyCode == '87') {
        // up arrow
    }
    else if (e.keyCode == '83') {
        // down arrow
    }
    else if (e.keyCode == '65') {
       // left arrow
       player2.leftPressed = false;
    }
    else if (e.keyCode == '68') {
       // right arrow
       player2.rightPressed = false;
    }
}

function characterMovement1()
{
    var animation_name = "idle";
    if(player1.leftPressed && player1.rightPressed)
    {
        if(character1.lastPressed)
        {
            animation_name = "idle";
        }
        else
        {
            animation_name = "idle_left";
        }
    }
    else if(player1.leftPressed)
    {
        character1.move(character1['speed'] * -1, 0);
        animation_name = "run_left";
    }
    else if(player1.rightPressed)
    {
        character1.move(character1['speed'], 0);
        animation_name = "run_right"
    }
    else
    {
        if(player1.lastPressed)
        {
            animation_name = "idle";
        }
        else
        {
            animation_name = "idle_left";
        }
    }
    if(player1.jump)
    {
        character1.move(0, player1.grav_constant * jump_path[player1.jump_state]);
        player1.jump_state++;
        if(player1.jump_state == 8)
        {
            player1.jump = false;
            player1.jump_state = 0;
        }
        if(player1.lastPressed)
        {
            animation_name = "jump";
        }
        else
        {
            animation_name = "jump_left";
        }
    }
    if(!onHardTile(character1, level) && !player1.jump)
    {
        character1.move(0, gravity_path[player1.gravity_state] * player1.grav_constant);
        if(player1.gravity_state != gravity_path.length - 1)
            player1.gravity_state++;
        player1.grounded = false;
    }
    if(onHardTile(character1, level))
    {
        player1.grounded = true;
        player1.gravity_state = 0;
    }

    drawGameObject(character1, animation_name);
}

function characterMovement2()
{
    var animation_name = "idle";
    if(player2.leftPressed && player2.rightPressed)
    {
        if(character2.lastPressed)
        {
            animation_name = "idle";
        }
        else
        {
            animation_name = "idle_left";
        }
    }
    else if(player2.leftPressed)
    {
        character2.move(character2['speed'] * -1, 0);
        animation_name = "run_left";
    }
    else if(player2.rightPressed)
    {
        character2.move(character2['speed'], 0);
        animation_name = "run_right"
    }
    else
    {
        if(player2.lastPressed)
        {
            animation_name = "idle";
        }
        else
        {
            animation_name = "idle_left";
        }
    }
    if(player2.jump)
    {
        character2.move(0, player2.grav_constant * jump_path[player2.jump_state]);
        player2.jump_state++;
        if(player2.jump_state == 8)
        {
            player2.jump = false;
            player2.jump_state = 0;
        }
        if(player2.lastPressed)
        {
            animation_name = "jump";
        }
        else
        {
            animation_name = "jump_left";
        }
    }
    if(!onHardTile(character2, level) && !player2.jump)
    {
        character2.move(0, gravity_path[player2.gravity_state] * player2.grav_constant);
        if(player2.gravity_state != gravity_path.length - 1)
            player2.gravity_state++;
        player2.grounded = false;
    }
    if(onHardTile(character2, level))
    {
        player2.grounded = true;
        player2.gravity_state = 0;
    }

    drawGameObject(character2, animation_name);
}


// Adding tiles to level

// Ground Floor
for(var i = 0; i < canvas_width; i++)
{
    if(i == 9 || i == 10)
    {

    }
    else
    {
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfig1);
    }
}

// Platforms

function upY(downY)
{
    return canvas_height - downY - 1;
}
addHardTileToConfig(5, upY(2), "metal_tile", levelConfig1);
addHardTileToConfig(6, upY(2), "metal_tile", levelConfig1);
addHardTileToConfig(4, upY(4), "metal_tile", levelConfig1);
addHardTileToConfig(3, upY(4), "metal_tile", levelConfig1);

addApple(5, upY(3), level);
addApple(6, upY(3), level);

addApple(11, upY(1), level);
addApple(12, upY(1), level);

addApple(4, upY(6), level);
addApple(3, upY(6), level);

setLevelFromConfig(levelConfig1);


// Game loop
setInterval(() => {
    clearCanvas();
    drawBackground();
    drawHardTilesFromConfig(levelConfig1);
    drawApples();
    characterMovement1();
    characterMovement2();
    playerAppleCollisions();
}, 50);


