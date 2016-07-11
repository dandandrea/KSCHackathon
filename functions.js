function getPlatformCoordinates(canvasWidth, canvasHeight, platformWidth, maxYCoordinateValue, numberOfPlatforms)
{
    var platforms = new Array();

    var platform1 = {'x1': 50, 'y1': 50, 'x2': 80, 'y2': 50};
    var platform2 = {'x1': 100, 'y1': 75, 'x2': 130, 'y2': 75};

    platforms.push(platform1);
    platforms.push(platform2);

    return platforms;
}