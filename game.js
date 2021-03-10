var colorA = '#f55a3c'

var _width = window.innerWidth * 990 / 1000;
var _height = window.innerHeight * 990 / 1000;

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

let shootme = Matter.Bodies.circle(_width / 2, _height / 2, 1, {
    isStatic: true,
    isSensor: true,
    render: {
        sprite: {
            texture: './img/shootMe.png',
            xScale: 0.5,
            yScale: 0.5,
        }
    }
});

let sling = Matter.Constraint.create({
    pointA: { x: _width / 2, y: _height / 2 },
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

let sensorHardskills = Matter.Bodies.rectangle(_width / 40, sensorHeight / 2, _width / 20, _height / 4, {
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
            yOffset: 0.25
        }
    }
});

let sensorSoftskills = Matter.Bodies.rectangle(_width / 40, sensorHeight / 2 + sensorHeight, _width / 20, _height / 4, {
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
            yOffset: 0.25
        }
    }
});

let sensorTalen = Matter.Bodies.rectangle(_width / 40, sensorHeight / 2 + 2 * sensorHeight, _width / 20, _height / 4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/talenkennis.svg',
            xScale: 0.5,
            yScale: 0.5,
            yOffset: 0.25
        }
    }
});

let sensorInteresses = Matter.Bodies.rectangle(_width / 40, sensorHeight / 2 + 3 * sensorHeight, _width / 20, _height / 4, {
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
            yOffset: 0.25
        }
    }
});

let sensorLinkedIn = Matter.Bodies.rectangle(_width - _width / 40, sensorHeight / 2, _width / 20, _height / 4, {
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
            yOffset: 0.25
        }
    }
});

let sensorGitHub = Matter.Bodies.rectangle(_width - _width / 40, sensorHeight / 2 + sensorHeight, _width / 20, _height / 4, {
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
            yOffset: 0.25
        }
    }
});

let sensorCv = Matter.Bodies.rectangle(_width - _width / 40, sensorHeight / 2 + 2 * sensorHeight, _width / 20, _height / 4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/cv.svg',
            xScale: 0.5,
            yScale: 0.5,
            yOffset: 0.25
        }
    }
});

let sensorGoNuts = Matter.Bodies.rectangle(_width - _width / 40, sensorHeight / 2 + 3 * sensorHeight, _width / 20, _height / 4, {
    isSensor: true,
    isStatic: true,
    render: {
        strokeStyle: colorA,
        fillStyle: 'transparent',
        lineWidth: 1,
        sprite: {
            texture: './img/goNuts.svg',
            xScale: 0.5,
            yScale: 0.5,
            yOffset: 0.25
        }
    }
});

Matter.Events.on(engine, 'collisionEnd', function (event) {

    var pairs = event.pairs;

    if(falling || pairs.length >= 2)return;


    //for (var i = 0, j = pairs.length; i != j; ++i) {
        var pair = pairs[0];

        if(pair.bodyA === shootme || pair.bodyB === shootme){
            return;
        }
        else{
            if (pair.bodyA === sensorLinkedIn || pair.bodyB === sensorLinkedIn) {
                LinkedIn();
            }
            else if (pair.bodyA === sensorGitHub || pair.bodyB === sensorGitHub) {
                GitHub();
            }
            else if (pair.bodyA === sensorCv || pair.bodyB === sensorCv) {
                Cv();
            }
            else if (pair.bodyA === sensorGoNuts || pair.bodyB === sensorGoNuts) {
                GoNuts();
            }
            else if (pair.bodyA === sensorHardskills || pair.bodyB === sensorHardskills) {
                HardSkills()
            }
            else if (pair.bodyA === sensorSoftskills || pair.bodyB === sensorSoftskills) {
                SoftSkills()
            }
            else if (pair.bodyA === sensorTalen || pair.bodyB === sensorTalen) {
                Talenkennis()
            }
            else if (pair.bodyA === sensorInteresses || pair.bodyB === sensorInteresses) {
                Interesses()
            }
            falling = true;
        }
    //}
    delay = setTimeout(DoneFalling, 2000);
});

function DoneFalling() {
    falling = false;
}


engine.world.gravity.y = 0.2;

Matter.World.add(engine.world, [ shootme, sensorHardskills, sensorSoftskills, sensorTalen, sensorInteresses, sensorLinkedIn, sensorGitHub, sensorCv, sensorGoNuts, ball, sling, mouseConstraint]);
Matter.Engine.run(engine);
Matter.Render.run(render);

window.onresize = function () {
    location.reload();
};

// function Talen() {

//     let path = './img/nederlands.svg'
//     let nederlands = Matter.Bodies.rectangle(_width /2-100, 1,1,1, {
//         render: {
//             sprite: {
//                 texture: path,
//                 xScale: _width/3000,
//                 yScale: 0.5,
//                 xOffset:  -_width/3000
//             }
//         }
//     });

//     Matter.World.add(engine.world,nederlands);
// }

let counter;
let interval;
let falling = false;

function HardSkills() {

    counter = 0;
    let itemsArr = ['./img/hs-5.svg', './img/hs-1.svg', './img/hs-2.svg', './img/hs-3.svg', './img/hs-4.svg', './img/hs-6.svg'];
    AddTitleToWorld('./img/F-hardskills.svg');
    AddItemsToWorld(itemsArr);
    interval = setInterval(AddItemsToWorld, 300, itemsArr);
}

function SoftSkills() {

    counter = 0;
    let itemsArr = ['./img/hs-1.svg', './img/hs-2.svg', './img/hs-3.svg', './img/hs-4.svg', './img/hs-5.svg', './img/hs-6.svg'];
    AddTitleToWorld('./img/F-softskills.svg');
    AddItemsToWorld(itemsArr);
    interval = setInterval(AddItemsToWorld, 300, itemsArr);
}

function Talenkennis() {

    counter = 0;
    let itemsArr = ['./img/t-1.svg', './img/t-2.svg', './img/t-3.svg'];
    AddTitleToWorld('./img/F-talenkennis.svg');
    AddItemsToWorld(itemsArr);
    interval = setInterval(AddItemsToWorld, 300, itemsArr);
}

function Interesses() {

    counter = 0;
    let itemsArr = ['./img/i-1.svg', './img/i-2.svg', './img/i-3.svg', './img/i-4.svg',];
    AddTitleToWorld('./img/F-interesses.svg');
    AddItemsToWorld(itemsArr);
    interval = setInterval(AddItemsToWorld, 300, itemsArr);
}

function LinkedIn() {
    window.open(
        'https://www.linkedin.com/in/pieter-vd-950228205/',
        '_blank'
    );
}

function GitHub() {
    window.open(
        'https://github.com/pieterCorp',
        '_blank'
    );
}

function Cv() {
    var audio = new Audio('./img/beep.mp3');
    audio.play();
    window.open('cv.pdf');
}

function GoNuts() {

    Matter.World.clear(engine.world)
    let ball = Matter.Bodies.circle(_width / 2, _height / 2, 20);
    let sling = Matter.Constraint.create({
        pointA: { x: _width / 2, y: _height / 2 },
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

    Matter.World.add(engine.world, [ball, sling, mouseConstraint]);
}

function AddItemsToWorld(items) {

    if (counter < items.length) {

        path = items[counter];
        let item = Matter.Bodies.rectangle(_width / 4 * 3 + 30, 1, 1, 1, {
            render: {
                sprite: {
                    texture: path,
                    xScale: (1 / 1000 * _width) * 0.7,
                    yScale: (1 / 1000 * _width) * 0.7,
                    xOffset: 0.2
                }
            }
        });
        Matter.World.add(engine.world, item);
        counter++;
    }
    else {
        clearInterval(interval);
    }
}

function AddTitleToWorld(theTitle) {

    path = theTitle;
    let title = Matter.Bodies.rectangle(_width / 4, 1, 1, 1, {
        render: {
            sprite: {
                texture: path,
                xScale: 1 / 1000 * _width,
                yScale: 1 / 1000 * _width,
                xOffset: -_width / 12000
            }
        }
    });
    Matter.World.add(engine.world, title);
}

