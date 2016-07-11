function getPlatformCoordinates(canvasWidth, canvasHeight, platformWidth, maxYCoordinateValue, numberOfPlatforms)
{
    var platforms = new Array();

    var platform1 = {'x1': 350, 'y1': 300, 'x2': 450, 'y2': 300};
    var platform2 = {'x1': 250, 'y1': 300, 'x2': 300, 'y2': 300};

    platforms.push(platform1);
    platforms.push(platform2);

    return platforms;
}

function drawLine(game, x1, y1, x2, y2, lineHeight)
{
        console.log("Drawing line from (" + x1 + ", " + y1 + ") to (" + x2 + ", " + y2 + ")");

        var line = game.add.graphics(0, 0);
        line.lineStyle(lineHeight, 0xffffff, 1);
        line.moveTo(x1, y1);
        line.lineTo(x2, y2);
}