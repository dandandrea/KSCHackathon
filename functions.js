function getPlatformCoordinates(canvasWidth, canvasHeight, platformWidth, maxYCoordinateValue, numberOfPlatforms)
{
    // Randomize platform positions while taking maxYCoordinateValue into account
    // Also make sure that no platforms are "above" each other -- each should occupy its own "column"
    // Take numberOfPlatforms argument into account?

    var platforms = new Array();

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

function drawLine(game, x1, y1, x2, y2, lineHeight, color)
{
    var line = game.add.graphics(0, 0);
    line.lineStyle(lineHeight, color, 1);
    line.moveTo(x1, y1);
    line.lineTo(x2, y2);
}

function detectSuccessfulLanding(lander, platforms, maxVelocity)
{
    var landerX1 = Math.round(lander.x);
    var landerY1 = Math.round(lander.y);
    var landerX2 = Math.round(lander.x + lander.width);
    var landerY2 = Math.round(lander.y + lander.height);

    var platformX1 = Math.round(platforms[0].coordinates.x1);
    var platformY1 = Math.round(platforms[0].coordinates.y1);
    var platformX2 = Math.round(platforms[0].coordinates.x2);
    var platformY2 = Math.round(platforms[0].coordinates.y2);

    var landerUL = "(" + landerX1 + ", " + landerY1 + ")";
    var landerLR = "(" + landerX2 + ", " + landerY2 + ")";
    var platformUL = "(" + platformX1 + ", " + platformY1 + ")";
    var platformLR = "(" + platformX2 + ", " + platformY2 + ")";

    if (lander.body.velocity.y <= maxVelocity && landerY2 == platformY1 && landerX1 >= platformX1 && landerX2 <= platformX2)
    {
        console.log("Successful landing");
        return true;
    }

    console.log("Failed landing: [Velocity: " + Math.round(lander.body.velocity.y) + " (max: " + maxVelocity + ")] [Lander: " + landerUL + ", " + landerLR + "] vs [Platform: " + platformUL + ", " + platformLR + "]");
    return false;
}

function detectCollision(lander, platforms)
{
    var landerX1 = Math.round(lander.x);
    var landerY1 = Math.round(lander.y);
    var landerX2 = Math.round(lander.x + lander.width);
    var landerY2 = Math.round(lander.y + lander.height);

    var platformX1 = Math.round(platforms[0].coordinates.x1);
    var platformY1 = Math.round(platforms[0].coordinates.y1);
    var platformX2 = Math.round(platforms[0].coordinates.x2);
    var platformY2 = Math.round(platforms[0].coordinates.y2);

    var landerUL = "(" + landerX1 + ", " + landerY1 + ")";
    var landerLR = "(" + landerX2 + ", " + landerY2 + ")";
    var platformUL = "(" + platformX1 + ", " + platformY1 + ")";
    var platformLR = "(" + platformX2 + ", " + platformY2 + ")";

    // console.log("detectCollision: [Lander: " + landerUL + ", " + landerLR + "] vs [Platform: " + platformUL + ", " + platformLR + "]");

    var collision = false;

    // 1. Check rectangle top
    if (landerY1 == platformY1 && landerX1 <= platformX2 && landerX2 >= platformX1) collision = true;

    // 2. Check rectangle bottom
    if (landerY2 == platformY1 && landerX1 <= platformX2 && landerX2 >= platformX1) collision = true;

    // 3. Check rectangle left
    if (landerX1 == platformX2 && landerY1 <= platformY2 && landerY2 >= platformY1) collision = true;

    // 4. Check rectangle right
    if (landerX2 == platformX1 && landerY1 <= platformY2 && landerY2 >= platformY1) collision = true;

    if (collision == true)
    {
        console.log("Collision");
        return true;
    }

    return false;
}

function detectOutOfBounds(lander, canvasWidth, canvasHeight)
{
    if (lander.x < 0 || lander.x + lander.width > canvasWidth || lander.y < 0 || lander.y + lander.height > canvasHeight)
    {
        return true;
    }

    return false;
}