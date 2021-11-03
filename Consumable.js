class Consumable
{
    constructor(x, y, level)
    {
        this.x = x;
        this.y = y;

        this.level = level;

        if(config.leftMargin == null)
        {
            this.leftMargin = 10;
            this.rightMargin = 10;
            this.topMargin = 6;
            this.bottomMargin = -1;
        }
        else
        {
            this.leftMargin = config.leftMargin;
            this.rightMargin = config.rightMargin;
            this.topMargin = config.rightMargin;
            this.bottomMargin = config.bottomMargin;
        }
    }


    

}