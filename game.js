var colorA = '#f55a3c'

var _width = window.innerWidth * 990/1000;
var _height = window.innerHeight * 990/1000;

let sensorHeight = _height / 4;

let engine = Matter.Engine.create();

let render = Matter.Render.create({
    element: document.body,
    engine: engine,

    options: {
        width: _width,
        height: _height,
        wireframes: false,
        background: 'black'
    }
});

//let ground = Matter.Bodies.rectangle(_width/5*4, _height/5*2, _width/6, _height/20, { isStatic: true });
// var ground1 = Matter.Bodies.rectangle(700, 500, 1200, 20, { isStatic: true, angle: Math.PI * -0.05, render: { fillStyle: colorA } });

let ball = Matter.Bodies.circle(_width / 2, _height / 2, 20);
let sling = Matter.Constraint.create({
    pointA: { x: _width / 2, y:_height / 2 },
    bodyB: ball,
    stiffness: 0.05
});

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

render.mouse = mouse;

let firing = false;
Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
    if (e.body === ball) firing = true;
});

Matter.Events.on(engine, 'afterUpdate', function () {
    if (firing && Math.abs(ball.position.x - _width / 2) < 20 && Math.abs(ball.position.y - _height / 2) < 20) {
        ball = Matter.Bodies.circle(_width / 2, _height / 2, 20);
        Matter.World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
    }
});

let sensorHardskills = Matter.Bodies.rectangle(_width/40,  sensorHeight/10, _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/hardskills.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

let sensorSoftskills = Matter.Bodies.rectangle(_width/40,  sensorHeight/10 + sensorHeight, _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/softskills.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

let sensorTalen = Matter.Bodies.rectangle(_width/40,  sensorHeight/10 + 2* sensorHeight, _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/talen.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

let sensorInteresses = Matter.Bodies.rectangle(_width/40,  sensorHeight/10 + 3* sensorHeight, _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/interesses.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

let sensorLinkedIn = Matter.Bodies.rectangle(_width - _width/40,  1, _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/linkedin.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

let sensorGitHub = Matter.Bodies.rectangle(_width - _width/40,  sensorHeight, _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/github.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

let sensorAbout = Matter.Bodies.rectangle(_width - _width/40,  2* sensorHeight , _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/about.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

let sensorPlay = Matter.Bodies.rectangle(_width - _width/40,  3* sensorHeight , _width/20, _height/4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/play.svg',
            xScale: 0.5,
            yScale: 0.5,
        }

    }
});

Matter.Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === sensorLinkedIn || pair.bodyB === sensorLinkedIn) {
            LinkedIn();
        }
        else if(pair.bodyA === sensorGitHub || pair.bodyB === sensorGitHub){
            GitHub();
        }
        else if(pair.bodyA === sensorAbout || pair.bodyB === sensorAbout){
            About();
        }
        else if(pair.bodyA === sensorPlay || pair.bodyB === sensorPlay){
            Play();
        }
    }
});

Matter.World.add(engine.world, [sensorHardskills, sensorSoftskills, sensorTalen, sensorInteresses, sensorLinkedIn, sensorGitHub, sensorAbout, sensorPlay,  ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);

window.onresize = function(){
   location.reload();
};

function LinkedIn(){
    window.open(
        'https://www.linkedin.com/in/pieter-vd-950228205/',
        '_blank'
      );
}

function GitHub(){
    window.open(
        'https://github.com/pieterCorp',
        '_blank'
    );
}

function About(){
    let boll = Matter.Bodies.circle(900, 200, 20);
    Matter.World.add(engine.world,boll);
    console.log("test");
}

function Play(){
    console.log("play was hit");


    Matter.World.clear( engine.world)
    let ball = Matter.Bodies.circle(_width / 2, _height / 2, 20);
let sling = Matter.Constraint.create({
    pointA: { x: _width / 2, y:_height / 2 },
    bodyB: ball,
    stiffness: 0.05
});

let mouse = Matter.Mouse.create(render.canvas);
let mouseConstraint = Matter.MouseConstraint.create(engine, {
    mouse: mouse,
    constraint: {
        render: { visible: false }
    }
});

render.mouse = mouse;

let firing = false;
Matter.Events.on(mouseConstraint, 'enddrag', function (e) {
    if (e.body === ball) firing = true;
});

Matter.Events.on(engine, 'afterUpdate', function () {
    if (firing && Math.abs(ball.position.x - _width / 2) < 20 && Math.abs(ball.position.y - _height / 2) < 20) {
        ball = Matter.Bodies.circle(_width / 2, _height / 2, 20);
        Matter.World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
    }
});

Matter.World.add(engine.world, [ ball, sling, mouseConstraint]);

}




