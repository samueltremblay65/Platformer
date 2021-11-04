class Level
{
    constructor()
    {
        this.hardTiles = []
        this.specialTiles = []
        this.softTiles = []
        this.apples = []

        this.showAll = false;
    }

    clearLevel()
    {
        this.hardTiles = []
        this.softTiles = []
        this.apples = []
    }

    addHardTile(x_val, y_val, texture)
    {
        if(texture == "special")
        {
            this.specialTiles.push({x: x_val, y: y_val});
        }
        if(texture == "hidden")
        {
            this.hardTiles.push({x: x_val, y: y_val, hidden: true});
        }
        else
        {
            this.hardTiles.push({x: x_val, y: y_val, hidden: false});
        }
    }

    isSpecialTile(x, y)
    {
        for(var i = 0; i < this.specialTiles.length; i++)
        {
            if(x == this.specialTiles[i].x && y + 1 == this.specialTiles[i].y)
            {
                return true;
            }
        }
        return false;
    }

    isHardTile(x_val, y_val)
    {
        for(var i = 0; i < this.hardTiles.length; i++)
        {
            if(this.hardTiles[i].hidden && !this.showAll)
            {
                // Do not return true because the tile is currently hidden
            }
            else if(x_val == this.hardTiles[i].x && y_val == this.hardTiles[i].y)
            {
                return true;
            }
        }
        return false;
    }

    getNumberApples()
    {
        var number = 0;
        for(var i = 0; i < this.apples.length; i++)
        {
            if(this.apples[i].visible)
            {
                number++;
            }
        }
        return number;
    }
}