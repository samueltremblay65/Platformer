class GameObject
{
    constructor(config, level)
    {
        this.x = config.x;
        this.y = config.y;

        this.level = level;

        this.changedTile = 0;

        this.visible = true;

        this.currentSprite = "";

        if(config.leftMargin == null)
        {
            this.leftMargin = 10;
            this.rightMargin = 10;
            this.topMargin = 10;
            this.bottomMargin = -1;
        }
        else
        {
            this.leftMargin = config.leftMargin;
            this.rightMargin = config.rightMargin;
            this.topMargin = config.rightMargin;
            this.bottomMargin = config.bottomMargin;
        }

        this.spriteDict = config.spriteDict;
    }

    draw(ctx, spriteName)
    {
        if(!this.visible)
        {
            return;
        }
        if(this.currentSprite != null && this.currentSprite != "")
        {
            this.spriteDict[this.currentSprite].draw(ctx, this.x, this.y);
        }
        else
            this.spriteDict[spriteName].draw(ctx, this.x, this.y);
    }

    getHitBox(){
        var currentPoints = [
            {x: this.x + this.leftMargin, y:this.y + this.topMargin}, 
            {x: this.x + 32 - this.rightMargin, y:this.y + this.topMargin},  
            {x: this.x + this.leftMargin, y:this.y + 32 + this.bottomMargin}, 
            {x: this.x + 32 - this.rightMargin, y:this.y + 32 + this.bottomMargin}  
        ];
        return currentPoints;        
    }

    getCurrentTiles()
    {
        var currentPoints = this.getHitBox();
        var currentTiles = [
            currentTile(currentPoints[0].x, currentPoints[0].y),
            currentTile(currentPoints[1].x, currentPoints[1].y),
            currentTile(currentPoints[2].x, currentPoints[2].y),
            currentTile(currentPoints[3].x, currentPoints[3].y)
        ];
        return currentTiles;
    }

    // This should never be used with both x and y ! Either x or y should be equal to 0
    move(x, y)
    {
        // compute top and bottoms, left and right
        var currentPoints = [
            {x: this.x + this.leftMargin, y:this.y + this.topMargin}, 
            {x: this.x + 32 - this.rightMargin, y:this.y + this.topMargin},  
            {x: this.x + this.leftMargin, y:this.y + 32 + this.bottomMargin}, 
            {x: this.x + 32 - this.rightMargin, y:this.y + 32 + this.bottomMargin}  
        ];

        var futurePoints = [
            {x: this.x + this.leftMargin + x, y:this.y + this.topMargin + y}, 
            {x: this.x + 32 - this.rightMargin + x, y:this.y + this.topMargin + y},  
            {x: this.x + this.leftMargin + x, y:this.y + 32 + this.bottomMargin + y}, 
            {x: this.x + 32 - this.rightMargin + x, y:this.y + 32 + this.bottomMargin+ y}  
        ];

        var currentTiles = [
            currentTile(currentPoints[0].x, currentPoints[0].y),
            currentTile(currentPoints[1].x, currentPoints[1].y),
            currentTile(currentPoints[2].x, currentPoints[2].y),
            currentTile(currentPoints[3].x, currentPoints[3].y)
        ];

        var futureTiles = [
            currentTile(futurePoints[0].x, futurePoints[0].y),
            currentTile(futurePoints[1].x, futurePoints[1].y),
            currentTile(futurePoints[2].x, futurePoints[2].y),
            currentTile(futurePoints[3].x, futurePoints[3].y)
        ];

        if(x < 0)
        {
            if(level.isHardTile(futureTiles[0].x, futureTiles[0].y) || level.isHardTile(futureTiles[2].x, futureTiles[2].y))
            {
                // collision left
            }
            else
            {
                var flag = true;
                level.movableTiles.forEach(element => {
                    var points = [
                        {x: element.x, y: element.y},
                        {x: element.x + 32, y: element.y},
                        {x: element.x, y: element.y + 32},
                        {x: element.x + 32, y: element.y + 32}
                    ];
                    if(collision(points, futurePoints))
                    {
                        flag = false;
                        this.x = points[1].x - this.rightMargin;
                    }
                });
                if (flag)
                this.x += x;
            }
        }
        else if(x > 0)
        {
            if(level.isHardTile(futureTiles[1].x, futureTiles[1].y) || level.isHardTile(futureTiles[3].x, futureTiles[3].y))
            {
                // collision right
            }
            else
            {
                var flag = true;
                level.movableTiles.forEach(element => {
                    var points = [
                        {x: element.x, y: element.y},
                        {x: element.x + 32, y: element.y},
                        {x: element.x, y: element.y + 32},
                        {x: element.x + 32, y: element.y + 32}
                    ];
                    if(collision(points, futurePoints))
                    {
                        flag = false;
                        this.x = points[0].x - 32 + this.leftMargin;
                    }
                });
                if (flag)
                    this.x += x;
            }
        }

        if(y < 0)
        {
            if(level.isHardTile(futureTiles[0].x, futureTiles[0].y) || level.isHardTile(futureTiles[1].x, futureTiles[1].y))
            {
                // collision top
                this.y = 32 * (futureTiles[0].y + 1);
            }
            else
            {
                var flag = true;

                if(flag)
                {
                    this.y += y;
                }
            }
        }
        else if(y > 0)
        {
            if(level.isHardTile(futureTiles[2].x, futureTiles[2].y) || level.isHardTile(futureTiles[3].x, futureTiles[3].y))
            {
                this.y = 32 * (futureTiles[3].y - 1);
            }
            else
            {
                var flag = true;
                level.movableTiles.forEach(element => {
                    var points = [
                        {x: element.x, y: element.y},
                        {x: element.x + 32, y: element.y},
                        {x: element.x, y: element.y + 32},
                        {x: element.x + 32, y: element.y + 32}
                    ];
                    if(collision(points, futurePoints))
                    {
                        flag = false;
                        this.y = points[0].y -32;
                    }
                });
                if (flag)
                    this.y += y;
            }
        }
    }
}

function currentTile(x, y)
{
    return {x: Math.floor(x/32), y: Math.floor(y/32)};
}

function collision(points1, points2)
{
    for(var i = 0; i < 4; i++)
    {
        if(inRectangle(points1, points2[i]))
        {
            return true;
        }
    }
    return false;
}

function inRectangle(rectangle, point)
{
    if(point.x >= rectangle[0].x && point.x <= rectangle[1].x && point.y >= rectangle[0].y && point.y <= rectangle[2].y )
    {
        return true;
    }
    return false;
}