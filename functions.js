function getPlatformCoordinates(canvasWidth, canvasHeight, platformWidth, maxYCoordinateValue, numberOfPlatforms)
{
    // TODO: Randomize platform positions while taking maxYCoordinateValue into account
    // TODO: Also make sure that no platforms are "above" each other -- each should occupy it's own "column"
    // TODO: Take numberOfPlatforms argument into account?

    var platforms = new Array();

    // manually add a platofrm in a known location (directly under the sprite)
    var platform1 = {'x1': 50, 'y1': 500, 'x2': 200, 'y2': 500};
    platforms.push(platform1);
    
    var width = 100;
    var paddingY = 250;
    
    while (platforms.length < numberOfPlatforms)
    {
        var x1 = Math.floor(Math.random() * (canvasWidth - width));
        var y1 = Math.floor((Math.random() * (canvasHeight - paddingY)) + paddingY);
        
        var x2 = x1 + width;
        
        var overlap = false;
        
        // check to ensure that this platform is not above or below any existing platform
        for (p = 0; p < platforms.length; p++)
        {
            if ((platforms[p].x1 < x1 && x1 < platforms[p].x2) 
                || (platforms[p].x1 < x2 && x2 < platforms[p].x2))
            {
                overlap = true;
                break;
            }
        }
        
        if (overlap)
            continue;
        
        var platform = {'x1': x1, 'y1': y1, 'x2': x2, 'y2': y1};
        platforms.push(platform);
    }

    return platforms;
}

function drawLine(game, x1, y1, x2, y2, lineHeight)
{
    // console.log("Drawing line from (" + x1 + ", " + y1 + ") to (" + x2 + ", " + y2 + ")");

    var line = game.add.graphics(0, 0);
    line.lineStyle(lineHeight, 0xffffff, 1);
    line.moveTo(x1, y1);
    line.lineTo(x2, y2);
}

function detectSuccessfulLanding(lander, platforms, maxVelocity)
{
    // console.log(lander.body.velocity.y + " <= " + maxVelocity);

    if (lander.body.velocity.y <= maxVelocity)
    {
        return true;
    }

    return false;
}

function detectCollision(lander, platforms)
{
    // console.log("detectCollision: " + (lander.y + lander.height) + " >= " + platforms[0].coordinates.y1);

    if (lander.y + lander.height >= platforms[0].coordinates.y1)
    {
        return true;
    }

    return false;
}