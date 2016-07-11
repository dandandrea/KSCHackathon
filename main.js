// Create our 'main' state that will contain the game
var mainState = {
    
    canvasWidth: 800,
    canvasHeight: 600,

    lunarGravity: 100,
    thrustUpAmount: 10,
    thrustSidewaysAmount: 5,
    maxLandingVelocity: 75,

    preload: function() { 
        game.load.image('lander', 'assets/lander.png'); 
    },

    create: function() { 
        // Change the background color of the game to blue
        game.stage.backgroundColor = '#000000';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the lander at the position x=100 and y=245
        this.lander = game.add.sprite(100, 400, 'lander');

        // Add physics to the lander
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.lander);

        // Add gravity to the lander to make it fall
        this.lander.body.gravity.y = this.lunarGravity;

        // Call the 'thrustUp' function when the spacekey is hit
        this.cursors = game.input.keyboard.createCursorKeys();

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" });

        this.platforms = new Array();
        var platformCoordinates = getPlatformCoordinates(this.canvasWidth, this.canvasHeight, 20, 100, 2);
        for (var i = 0; i < platformCoordinates.length; i++)
        {
            var platformStructure = {};
            platformStructure.landed = false;
            platformStructure.coordinates = platformCoordinates[i];
            this.platforms.push(platformStructure);
        }

        var lineHeight = 2;

        drawLine(game, this.platforms[0].coordinates.x1, this.platforms[0].coordinates.y1, this.platforms[0].coordinates.x2, this.platforms[0].coordinates.y2, lineHeight);
        drawLine(game, this.platforms[1].coordinates.x1, this.platforms[1].coordinates.y1, this.platforms[1].coordinates.x2, this.platforms[1].coordinates.y2, lineHeight);
    },

    update: function() {
        // console.log((this.lander.y + this.lander.height) + " >= " + this.platforms[0].coordinates.y1 + "?");

        if (detectCollision(this.lander, this.platforms) == true)
        {
            if (detectSuccessfulLanding(this.lander, this.platforms, this.maxLandingVelocity) == true)
            {
                // console.log("Successful landing");

                if (this.platforms[0].landed == false)
                {
                    this.increaseScore(1);
                }

                this.platforms[0].landed = true;
            }
            else
            {
                console.log("Failed landing");

                this.restartGame();
            }

            this.lander.body.velocity.y = 0;
            this.lander.y = this.platforms[0].coordinates.y1 - this.lander.height;
        }

        this.move();
    },

    move: function()
    {
        if (this.cursors.up.isDown == true)
        {
            this.thrustUp();
        }

        if (this.cursors.left.isDown == true)
        {
            this.thrustLeft();
        }

        if (this.cursors.right.isDown == true)
        {
            this.thrustRight();
        }
    },

    // Increase the score
    increaseScore: function(increaseAmount) {
        this.score += increaseAmount;
        this.labelScore.text = this.score;  
    },

    // Make the lander thrust up
    thrustUp: function() {
        // Add a vertical velocity to the lander
        this.lander.body.velocity.y += this.thrustUpAmount * -1;
    },

    // Make the lander thrust left
    thrustLeft: function() {
        // Add a vertical velocity to the lander
        this.lander.body.velocity.x += this.thrustSidewaysAmount * -1;
    },

    // Make the lander thrust right
    thrustRight: function() {
        // Add a vertical velocity to the lander
        this.lander.body.velocity.x += this.thrustSidewaysAmount;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
};

// Initialize Phaser and create a game
var game = new Phaser.Game(mainState.canvasWidth, mainState.canvasHeight);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');