class Level
{
    constructor()
    {
        this.hardTiles = []
        this.softTiles = []
        this.apples = []
    }

    addHardTile(x_val, y_val)
    {
        this.hardTiles.push({x: x_val, y: y_val});
    }

    isHardTile(x_val, y_val)
    {
        var flag = false;

        for(var i = 0; i < this.hardTiles.length; i++)
        {
            if(x_val == this.hardTiles[i].x && y_val == this.hardTiles[i].y)
            {
                return true;
            }
        }
        return false;
    }
}