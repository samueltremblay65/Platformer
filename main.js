let canvas = document.getElementById("game_canvas");
let ctx = canvas.getContext("2d");

// Level
var level = new Level();
var currentConfig;
var currentLevel = 0;
var num_levels = 0;

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

function setLevelFromConfig(levelConfig, appleConfig)
{
    levelConfig.forEach(element => {
        level.addHardTile(element.x, element.y, element.texture);
    });

    appleConfig.forEach(element => {
        addApple(element.x, element.y, level);
    });
}

function drawLevel()
{
    // Draw normal hard tiles
    for(var i = 0; i < level.hardTiles.length; i++)
    {
        var image;
        var texture = level.hardTiles[i].texture;
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
        else if(texture == 'hidden' )
        {
            if(level.showAll)
            {
                ctx.drawImage(
                    terrain,
                    0,0,
                    48, 48,
                    32*level.hardTiles[i].x, 32*level.hardTiles[i].y,
                    32, 32
                );
                ctx.drawImage(
                    terrain,
                    8.5*32, 32*4,
                    48, 16,
                    32*level.hardTiles[i].x, 32*level.hardTiles[i].y,
                    32, 16
                );
            }
            continue;
        }
        else if(texture == "special")
        {
            image = terrain;
            cut_x = 0, cut_y = 32*4;
        }
        ctx.drawImage(
            image,
            cut_x, cut_y,
            48, 48,
            32*level.hardTiles[i].x, 32*level.hardTiles[i].y,
            32, 32
        );
    }

    // Draw movable tiles
    for(var i = 0; i < level.movableTiles.length; i++)
    {
        image = terrain;
        cut_x = 0, cut_y = 2;
        ctx.drawImage(
            image,
            cut_x * 32, cut_y * 32,
            48, 48,
            level.movableTiles[i].x, level.movableTiles[i].y,
            32, 32
        );

    }

    // Draw apples
    drawApples();
}

// Previous way of drawing (from config). We moved to drawing from level object
/* function drawHardTilesFromConfig(levelConfig, showAll)
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
        else if(texture == 'hidden' )
        {
            if(showAll)
            {
                ctx.drawImage(
                    terrain,
                    0,0,
                    48, 48,
                    32*levelConfig[i].x, 32*levelConfig[i].y,
                    32, 32
                );
                ctx.drawImage(
                    terrain,
                    8.5*32, 32*4,
                    48, 16,
                    32*levelConfig[i].x, 32*levelConfig[i].y,
                    32, 16
                );
            }
            continue;
        }
        else if(texture == "special")
        {
            image = terrain;
            cut_x = 0, cut_y = 32*4;
        }
        ctx.drawImage(
            image,
            cut_x, cut_y,
            48, 48,
            32*levelConfig[i].x, 32*levelConfig[i].y,
            32, 32
        );
    }
} */

function drawMoveableTiles()
{
    var image = terrain;
    var cut_x = 0;
    var cut_y = 4;

    level.movableTiles.forEach()
    {
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

function addAppleToConfig(x, y, appleConfig)
{
    appleConfig.push({x:x, y:y});
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

function boxOnHardTile(box)
{
    var tileBelow = currentTile(box.x + 16, box.y+32);
    if(level.isHardTile(tileBelow.x, tileBelow.y))
    {
        return true;
    }
    if(level.isMovableTile(tileBelow))
    {
        return true;
    }
    return false;
}

function movableTileGravity()
{
    level.movableTiles.forEach(element => {
        if(!boxOnHardTile(element) && !boxOnMovableTile(element))
        {
            element.y += 8;
        }
    });
}

function movableTileCollisions()
{
    level.movableTiles.forEach(element => {
        var points = [
            {x: element.x - 2, y: element.y},
            {x: element.x + 34, y: element.y},
            {x: element.x - 2, y: element.y + 32},
            {x: element.x + 34, y: element.y + 32}
        ];

        var player1Hitbox = player1.character.getHitBox();

        if(collision(points, player1Hitbox))
        {
            if(player1.character.x < points[0].x && player1.grounded && element.y % 32 == 0 )
            {
                var futureTile = currentTile(element.x + 32, element.y);
                if(!level.isHardTile(futureTile.x, futureTile.y) && !level.isMovableTile(element.x +33, element.y))
                {
                    element.x += 32;
                }
            }
            else if(player1.grounded && element.y % 32 == 0)
            {
                var futureTile = currentTile(element.x - 32, element.y);
                if(!level.isHardTile(futureTile.x, futureTile.y) && !level.isMovableTile(element.x - 32, element.y))
                {
                    element.x -= 32;
                }
            }
        }
    });
}

// collisions with apples
function playerAppleCollisions()
{
    var flag = false;
    level.apples.forEach(element => {
        // check player1
        if(!element.visible)
        {
            return;
        }
        if(collision(element.getHitBox(), player1.character.getHitBox()))
        {
            apples_collected++;
            element.currentSprite = "collected";
            flag = true;
        }
        // check player2
        if(collision(element.getHitBox(), player2.character.getHitBox()))
        {
            apples_collected++;
            element.currentSprite = "collected";
            flag = true;
        }
    });
    return flag;
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

// Making the characters for each player 
let character1 = new GameObject(character1_config, level);

let character2 = new GameObject(character2_config, level);

// Floor and apple configurations

var levelConfigs = [

];

var appleConfigs = [

]

var characterPositions = [

]

// Arrow control

// Jump path config
const jump_path = [-5, -4, -3, -2, -1, 0, 0, 0];

const gravity_path = [1, 2, 3, 4, 5];

var player1_config = {
    grav_constant: 3,
    speed: 6,
    character: character1
}

var player2_config = {
    grav_constant: 5,
    speed: 4,
    character: character2
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
    else if (e.keyCode == '32')
    {
        resetLevel();
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

function characterMovement(player)
{
    var animation_name = "idle";
    if(player.leftPressed && player.rightPressed)
    {
        if(player.character.lastPressed)
        {
            animation_name = "idle";
        }
        else
        {
            animation_name = "idle_left";
        }
    }
    else if(player.leftPressed)
    {
        player.character.move(player.speed * -1, 0);
        animation_name = "run_left";
    }
    else if(player.rightPressed)
    {
        player.character.move(player.speed, 0);
        animation_name = "run_right"
    }
    else
    {
        if(player.lastPressed)
        {
            animation_name = "idle";
        }
        else
        {
            animation_name = "idle_left";
        }
    }
    if(player.jump)
    {
        player.character.move(0, player.grav_constant * jump_path[player.jump_state]);
        player.jump_state++;
        if(player.jump_state == 8)
        {
            player.jump = false;
            player.jump_state = 0;
        }
        if(player.lastPressed)
        {
            animation_name = "jump";
        }
        else
        {
            animation_name = "jump_left";
        }
    }
    if(!onHardTile(player.character, level) && !player.jump)
    {
        player.character.move(0, gravity_path[player.gravity_state] * player.grav_constant);
        if(player.gravity_state != gravity_path.length - 1)
            player.gravity_state++;
        player.grounded = false;
    }
    if(onHardTile(player.character, level) || onMovableTile(player))
    {
        player.grounded = true;
        player.gravity_state = 0;
    }

    drawGameObject(player.character, animation_name);
}

function boxOnMovableTile(box)
{
    if(level.isMovableTile(box.x + 16, box.y + 33))
    {
        return true;
    }
    return false;
}

function onMovableTile(player)
{
    if(level.isMovableTile(player.character.x + player.character.leftMargin, player.character.y + 32) || level.isMovableTile(player.character.x + 32 - player.character.rightMargin, player.character.y + 32) )
    {
        return true;
    }
    return false;
}

function onSpecialTile(player)
{
    var points = player.character.getCurrentTiles();
    if(!player.grounded)
    {
        return false;
    }
    if(level.isSpecialTile(points[2].x, points[2].y) || level.isSpecialTile(points[3].x, points[3].y))
    {
        return true;
    }
    return false;
}

function showHiddenTiles()
{
    level.showAll = true;
}

function hideHiddenTiles()
{
    level.showAll = false;
}

function upY(downY)
{
    return canvas_height - downY - 1;
}

function createLevels()
{
    // Making level 1

    currentLevel = 0;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    // Testing movable tiles

    addAppleToConfig(4, upY(1), appleConfigs[currentLevel]);
    addAppleToConfig(5, upY(2), appleConfigs[currentLevel]);
    addAppleToConfig(6, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(7, upY(4), appleConfigs[currentLevel]);
    addAppleToConfig(8, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(9, upY(2), appleConfigs[currentLevel]);
    addAppleToConfig(10, upY(1), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 13, y1: upY(1), x2: 1, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;
    // Making level 2

    currentLevel++;

    emptyArray = [];
    emptyAppleArray = [];
    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);

    for(var i = 0; i < canvas_width; i++)
    {
        if(i == 9 || i == 10)
        {

        }
        else
        {
            addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
        }
    }

    addHardTileToConfig(5, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(4), "metal_tile", levelConfigs[currentLevel]);

    addAppleToConfig(5, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(6, upY(3), appleConfigs[currentLevel]);

    addAppleToConfig(11, upY(1), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(1), appleConfigs[currentLevel]);

    addAppleToConfig(4, upY(6), appleConfigs[currentLevel]);
    addAppleToConfig(3, upY(6), appleConfigs[currentLevel]);

    var positions = {x1: 3, y1: upY(1), x2: 2, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

    // Level 3

    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);

    for(var i = 0; i < canvas_width; i++)
    {
        if(i == 5 || i == 6)
        {

        }
        else
        {
            addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
        }
    }

    addHardTileToConfig(8, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(5), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(1, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(8), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(1, upY(9), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(10), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(14, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(14, upY(0), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(1, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(0, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(0, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(0, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(0, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(0, upY(8), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(4, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(4), "metal_tile", levelConfigs[currentLevel]);

    addAppleToConfig(5, upY(6), appleConfigs[currentLevel]);
    addAppleToConfig(6, upY(6), appleConfigs[currentLevel]);
    addAppleToConfig(7, upY(6), appleConfigs[currentLevel]);

    addAppleToConfig(13, upY(9), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(9), appleConfigs[currentLevel]);
    addAppleToConfig(11, upY(9), appleConfigs[currentLevel]);

    addAppleToConfig(4, upY(11), appleConfigs[currentLevel]);
    addAppleToConfig(5, upY(11), appleConfigs[currentLevel]);
    addAppleToConfig(6, upY(11), appleConfigs[currentLevel]);
    addAppleToConfig(0, upY(9), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 3, y1: upY(1), x2: 2, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

    // level 4
    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        if(i < 4 || i > 10)
        {
            addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
        }
    }

    addHardTileToConfig(3, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(2), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(11, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(2), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(6, upY(2), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(2), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(2), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(1, upY(2), "special", levelConfigs[currentLevel]);

    addAppleToConfig(6, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(7, upY(6), appleConfigs[currentLevel]);
    addAppleToConfig(8, upY(3), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 13, y1: upY(1), x2: 1, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;
    // Level 5


    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    // Right wall
    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
    }

    addHardTileToConfig(3, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(1), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(8, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(2), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(2, upY(1), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(1), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(9, upY(5), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(6), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(7), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(7), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(1, upY(8), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(9), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(9), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(9), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(8), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(1, upY(3), "special", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(4), "special", levelConfigs[currentLevel]);

    addAppleToConfig(5, upY(8), appleConfigs[currentLevel]);
    addAppleToConfig(2, upY(8), appleConfigs[currentLevel]);
    addAppleToConfig(13, upY(5), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(1), x2: 1, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

    // Making level 6

    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    // Right wall
    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
    }

    addHardTileToConfig(4, upY(1), "special", levelConfigs[currentLevel]);

    addHardTileToConfig(6, upY(1), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(2), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(3), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(6, upY(5), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(6), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(7), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(5), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(0, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(4), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(13, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(1), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(9, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(4), "hidden", levelConfigs[currentLevel]);

    addAppleToConfig(1, upY(8), appleConfigs[currentLevel]);
    addAppleToConfig(13, upY(4), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(11, upY(2), appleConfigs[currentLevel]);
    addAppleToConfig(10, upY(8), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(1), x2: 1, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

    // Making level 7

    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        if(i != 11 && i != 12)
        {
            addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
        }
    }

    // Right wall
    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
    }

    for(var i = 1; i < 4; i++)
    {
        addHardTileToConfig(i+3, upY(10), "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(i+3, upY(7), "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(i+3, upY(4), "metal_tile", levelConfigs[currentLevel]);
    }
    addHardTileToConfig(6, upY(11), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(12), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(13), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(2, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(7), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(2, upY(7), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(7), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(2, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(4), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(12, upY(1), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(2), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(3), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(5), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(11, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(5), "metal_tile", levelConfigs[currentLevel]);
    
    addHardTileToConfig(12, upY(6), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(7), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(8), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(9), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(10), "hidden", levelConfigs[currentLevel]);

    for(var i = 4; i < 11; i++)
    {
        addHardTileToConfig(7, upY(i), "metal_tile", levelConfigs[currentLevel]);
    }

    addHardTileToConfig(8, upY(1), "special", levelConfigs[currentLevel]);


    addAppleToConfig(5, upY(8), appleConfigs[currentLevel]);
    addAppleToConfig(5, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(7, upY(11), appleConfigs[currentLevel]);
    addAppleToConfig(13, upY(6), appleConfigs[currentLevel]);
    addAppleToConfig(8, upY(6), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(1), x2: 4, y2: upY(11)};
    characterPositions.push(positions);

    num_levels++;

    // Making level 8

    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        if(i != 5 && i != 6 && i != 10 && !(i >= 9 && i <= 11))
            addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < 8; i++)
    {
        addHardTileToConfig(3, i, "metal_tile", levelConfigs[currentLevel]);
    }

    addHardTileToConfig(13, upY(1), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(4, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(5, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(4), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(7), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(1, upY(2), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(6), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(2, upY(8), "special", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(0), "special", levelConfigs[currentLevel]);


    addHardTileToConfig(4, upY(5), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(0), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(0), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(0), "hidden", levelConfigs[currentLevel]);

    addHardTileToConfig(7, upY(8), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(8), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(8), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(8), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(7), "hidden", levelConfigs[currentLevel]);

    for(var i = 6; i < 14; i++)
    {
        if(i == 8)
        {
            i = 10;
        }
        addHardTileToConfig(i, upY(6), "metal_tile", levelConfigs[currentLevel]);
    }

    for(var i = 4; i < 14; i++)
    {
        addHardTileToConfig(i, upY(11), "metal_tile", levelConfigs[currentLevel]);
    }


    addAppleToConfig(13, upY(8), appleConfigs[currentLevel]);
    addAppleToConfig(2, upY(9), appleConfigs[currentLevel]);
    addAppleToConfig(2, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(7, upY(10), appleConfigs[currentLevel]);
    addAppleToConfig(10, upY(10), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(1), x2: 1, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;
}

function createLevels2()
{
    currentLevel++;

    // Making level 8

    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        if(i == 8)
            i = 10;
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
    }

    addHardTileToConfig(3, upY(1), "movable", levelConfigs[currentLevel]);

    addHardTileToConfig(6, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(7, upY(5), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(7), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(7), "metal_tile", levelConfigs[currentLevel]);


    addAppleToConfig(12, upY(10), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(1), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 1, y1: upY(6), x2: 2, y2: upY(6)};
    characterPositions.push(positions);

    num_levels++;


    currentLevel++;

    // Making level 9

    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        if(i == 7)
            i = 8;
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
    }

    addHardTileToConfig(6, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(6, upY(3), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(1), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(3), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(2, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(2, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(3, upY(10), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(12, upY(2), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(4), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(10), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(10), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(3, upY(11), "movable", levelConfigs[currentLevel]);

    addAppleToConfig(12, upY(11), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(7), appleConfigs[currentLevel]);
    addAppleToConfig(2, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(2, upY(7), appleConfigs[currentLevel]);
    addAppleToConfig(7, upY(2), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(11), x2: 2, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

    // Making level 10

    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);
    for(var i = 0; i < canvas_width; i++)
    {
        if(i == 7)
            i = 8;
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < 8; i++)
    {
        addHardTileToConfig(i+1, upY(10), "metal_tile", levelConfigs[currentLevel]);
    }

    for(var i = 1; i < 4; i++)
    {
        addHardTileToConfig((2 * i)+1, upY(11), "movable", levelConfigs[currentLevel]);
    }

    addAppleToConfig(12, upY(11), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(7), appleConfigs[currentLevel]);
    addAppleToConfig(2, upY(3), appleConfigs[currentLevel]);
    addAppleToConfig(2, upY(7), appleConfigs[currentLevel]);
    addAppleToConfig(7, upY(2), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(11), x2: 2, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

}

function setLevel(levelNumber)
{
    level.clearLevel();
    currentLevel = levelNumber;
    setLevelFromConfig(levelConfigs[levelNumber], appleConfigs[levelNumber]);
    var positions = characterPositions[levelNumber];
    player1.character.x = positions.x1 * 32;
    player1.character.y = positions.y1 * 32;
    player2.character.x = positions.x2 * 32;
    player2.character.y = positions.y2 * 32;
}

function setNextLevel()
{
    currentLevel++;
    if(currentLevel == num_levels)
    {
        document.getElementById("win_message").innerHTML = "You win ! Final time : " + end() + " seconds !";
        document.getElementById("win_message").style.display = "block";

        currentLevel = 0;
    }
    setLevel(currentLevel);
}

function resetLevel()
{
    playing = false;
    level.clearLevel();
    setLevel(currentLevel);
    playing = true;
}

var playing = true;

// Creating level configs
createLevels();
createLevels2();

setLevel(10);
hideHiddenTiles();

// Starting timer
var startTime = new Date();

// Returns how much time has elapsed since the start time
function end() {
    endTime = new Date();
    var timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff = timeDiff / 1000;

    // get seconds and 1 decimal spot
    var seconds = Math.floor(timeDiff * 10) / 10;
    return seconds;
}

// Game loop
setInterval(() => {
    if(playing)
    {
        // Checking if players are on special tiles and showing or hiding tiles depending

        if(onSpecialTile(player1) || onSpecialTile(player2))
        {
            showHiddenTiles();
        }
        else
        {
            hideHiddenTiles();
        }

        // Clear canvas and draw
        clearCanvas();
        drawBackground();
        drawLevel();

        // Movement of characters (with physics engine)
        characterMovement(player1);
        characterMovement(player2);

        // Other collisions
        playerAppleCollisions();
        movableTileGravity();
        movableTileCollisions();
    }
    else
    {
        // We do not want to execute game functions if the game is not playing!
    }
}, 50);

// Slow interval to check if there are any apples remaining in the level
setInterval(() => {
    if(level.getNumberApples() == 0)
    {
        playing = false;

        // Set next level
        setNextLevel();

        // Restart main game loop
        playing = true;
    }

}, 100);
