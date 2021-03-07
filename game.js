var colorA = '#f55a3c'

//test

var w = window.innerWidth;
var h = window.innerHeight;

let engine = Matter.Engine.create();

let render = Matter.Render.create({
    element: document.body,
    engine: engine,

    options: {
        width: w*990/1000,
        height: h*990/1000,
        wireframes: false,
        background: 'black'
    }
});

let ground = Matter.Bodies.rectangle(900, 300, 300, 20, { isStatic: true });
var ground1 = Matter.Bodies.rectangle(700, 500, 1200, 20, { isStatic: true, angle: Math.PI * -0.05, render: { fillStyle: colorA } });

let ball = Matter.Bodies.circle(300, 400, 20);
let sling = Matter.Constraint.create({
    pointA: { x: 300, y: 400 },
    bodyB: ball,
    stiffness: 0.05
});

let box = Matter.Bodies.rectangle(680, 350, 1,1, {
    isStatic: true,
    isSensor: true,
    render: {
        sprite: {
            texture: './img/iets.png'
        }}

});

let collider = Matter.Bodies.rectangle(400, 300, 500, 50, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/ball.png'
        }
    }
});

Matter.Events.on(engine, 'collisionEnd', function(event) {
    var pairs = event.pairs;

    for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[i];

        if (pair.bodyA === collider || pair.bodyB === collider) {
            //pair.bodyA.render.strokeStyle = colorA;
            doeIets();

        }
    }
});

function doeIets(){
    let boll = Matter.Bodies.circle(1100, 200, 20);
    Matter.World.add(engine.world,boll);
    console.log("test");
}


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
    if (firing && Math.abs(ball.position.x - 300) < 20 && Math.abs(ball.position.y - 400) < 20) {
        ball = Matter.Bodies.circle(300, 400, 20);
        Matter.World.add(engine.world, ball);
        sling.bodyB = ball;
        firing = false;
    }
});

let stack = Matter.Composites.stack(800, 70, 4, 4, 0, 0, function (x, y) {
    return Matter.Bodies.polygon(x, y, 8, 20);
});




Matter.World.add(engine.world, [box, stack, ground, ground1,  ball, sling, collider, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);