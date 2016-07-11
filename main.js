// Create our 'main' state that will contain the game
var mainState = {
    preload: function() { 
        game.load.image('lander', 'assets/lander.png'); 
    },

    create: function() { 
        // Change the background color of the game to blue
        game.stage.backgroundColor = '#000000';

        // Set the physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Display the lander at the position x=100 and y=245
        this.lander = game.add.sprite(100, 245, 'lander');

        // Add physics to the lander
        // Needed for: movements, gravity, collisions, etc.
        game.physics.arcade.enable(this.lander);

        // Add gravity to the lander to make it fall
        // this.lander.body.gravity.y = 1000;
        this.lander.body.gravity.y = 0;

        // Call the 'jump' function when the spacekey is hit
        var spaceKey = game.input.keyboard.addKey(
                        Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 20, "0", 
            { font: "30px Arial", fill: "#ffffff" });

        var platforms = getPlatformCoordinates(this.canvasWidth, this.canvasHeight, 20, 100, 2);

        var lineHeight = 2;

        drawLine(game, platforms[0].x1, platforms[0].y1, platforms[0].x2, platforms[0].y2, lineHeight);
        drawLine(game, platforms[1].x1, platforms[1].y1, platforms[1].x2, platforms[1].y2, lineHeight);
    },

    update: function() {
        // If the lander is out of the screen (too high or too low)
        // Call the 'restartGame' function
        if (this.lander.y < 0 || this.lander.y > 490)
            this.restartGame();
    },

    // Make the lander jump 
    jump: function() {
        // Add a vertical velocity to the lander
        this.lander.body.velocity.y = -350;
    },

    // Restart the game
    restartGame: function() {
        // Start the 'main' state, which restarts the game
        game.state.start('main');
    },
};

var canvasWidth = 800;
var canvasHeight = 600;

// Initialize Phaser and create a game
var game = new Phaser.Game(canvasWidth, canvasHeight);

// Add the 'mainState' and call it 'main'
game.state.add('main', mainState); 

// Start the state to actually start the game
game.state.start('main');