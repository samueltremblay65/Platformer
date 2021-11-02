class Dino
{
    constructor(config)
    {
        this.name = config.name;
        this.age = config.age;
    }

    printDino()
    {
        console.log("Dino with name " + this.name);
    }
}