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
    addHardTileToConfig(11, upY(11), "movable", levelConfigs[currentLevel]);

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
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < canvas_width - 4; i++)
    {
        addHardTileToConfig(i, upY(9), "metal_tile", levelConfigs[currentLevel]);
        if( i != 6 )
            addHardTileToConfig(canvas_width - i - 1, upY(7), "metal_tile", levelConfigs[currentLevel]);
    }
    
    addHardTileToConfig(7, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(6), "metal_tile", levelConfigs[currentLevel]);

    addHardTileToConfig(8, upY(7), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(1), "special", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(3), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(3), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(3), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(10), "movable", levelConfigs[currentLevel]);


    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
    }

    addAppleToConfig(8, upY(8), appleConfigs[currentLevel]);
    addAppleToConfig(5, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(11, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(13, upY(5), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(11), x2: 2, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

    // Making level 11

    currentLevel++;
    emptyArray = [];
    emptyAppleArray = [];

    levelConfigs.push(emptyArray);
    appleConfigs.push(emptyAppleArray);

    for(var i = 0; i < canvas_width; i++)
    {
        addHardTileToConfig(i, canvas_height-1, "ground", levelConfigs[currentLevel]);
    }

    for(var i = 0; i < canvas_width - 4; i++)
    {
        addHardTileToConfig(i, upY(9), "metal_tile", levelConfigs[currentLevel]);
        if( i != 6 )
            addHardTileToConfig(canvas_width - i - 1, upY(7), "metal_tile", levelConfigs[currentLevel]);
    }
    
    addHardTileToConfig(7, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(8, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(9, upY(6), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(8), "metal_tile", levelConfigs[currentLevel]);
    addHardTileToConfig(1, upY(1), "metal_tile", levelConfigs[currentLevel]);


    addHardTileToConfig(5, upY(3), "special", levelConfigs[currentLevel]);
    addHardTileToConfig(13, upY(3), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(12, upY(3), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(2), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(11, upY(3), "hidden", levelConfigs[currentLevel]);
    addHardTileToConfig(4, upY(10), "movable", levelConfigs[currentLevel]);
    addHardTileToConfig(10, upY(8), "movable", levelConfigs[currentLevel]);


    for(var i = 0; i < canvas_height - 1; i++)
    {
        addHardTileToConfig(0, i, "metal_tile", levelConfigs[currentLevel]);
        addHardTileToConfig(14, i, "metal_tile", levelConfigs[currentLevel]);
    }

    addAppleToConfig(8, upY(8), appleConfigs[currentLevel]);
    addAppleToConfig(5, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(11, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(12, upY(5), appleConfigs[currentLevel]);
    addAppleToConfig(13, upY(5), appleConfigs[currentLevel]);

    // Character positions
    var positions = {x1: 2, y1: upY(11), x2: 2, y2: upY(1)};
    characterPositions.push(positions);

    num_levels++;

}