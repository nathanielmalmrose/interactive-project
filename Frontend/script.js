const canvasDemo = document.getElementById("canvas");
const ctx = canvasDemo.getContext("2d");

canvasDemo.width = 800;
canvasDemo.height = 400;

ctx.imageSmoothingEnabled= false;

let directionX = 1;
let directionY = 1;

const drawBackGround = () => {
    ctx.fillStyle = '#405';
    ctx.fillRect(100, 100, 80, 40);
    
    ctx.strokeStyle = '#3c3';
    ctx.strokeRect(120, 80, 40, 80);
    
    ctx.fillStyle = '#226'
    ctx.strokeStyle = '#ff0';
    
    ctx.fillRect(300, 80, 80, 40);
    ctx.strokeRect(300, 80, 80, 40);
    
    ctx.fillStyle = '#FFF'
    ctx.font = '30px Arial';
    ctx.fillText("Howdy!", 200, 200);
    
    ctx.beginPath();
    ctx.moveTo(420, 69);
    ctx.lineTo(7,11);
    ctx.lineTo(420, 11);
    ctx.lineTo(420,69);
    
    ctx.lineWidth = 3;
    
    ctx.fill();
    ctx.stroke();
}

const drawForeGround = () => {
    
}

let player = {
    x: 0,
    y: 110,
    size: 16
};

var image = new Image();
image.src = 'player.png';

window.addEventListener('keydown', function (e) {
    myGameArea.key = e.key;
});
  window.addEventListener('keyup', function (e) {
    myGameArea.key = false;
});

const loop = () => {
    ctx.clearRect(0, 0, 800, 400);
    drawBackGround();
    ctx.fillStyle = '';
    
    if (player.x > 780) {
		player.x = 780;
		directionX = -1;
    }
	else if (player.x < -8) {
		player.x = -8;
		directionX = 1;
	}
    else {
		player.x = player.x + directionX;
    }
	ctx.fillRect(image, player.x, player.y, 32, 32);
    drawForeGround();
}

const drawPieChart = (centerx, centery, radius, data) => {

    //  360 degrees
    let startAngle = 0;
    let endAngle = 0;

    //  Get total amount of Arc Units (number of segments to complete circle)
    let totalArcUnits = 0;
    for(var i = 0; i < data.length; i++) {
        totalArcUnits += data[i][0];
    }

    //  Full Circle divided by total amount of Arc Units
    //  Equals length of each arc needed to complete a circle
    let arcLengthDegrees = 360 / totalArcUnits;

    //  Convert to Radians
    let arcLengthRadian = arcLengthDegrees * (Math.PI / 180);

    for(var i = 0; i < data.length; i++) {
        ctx.beginPath();
        ctx.moveTo(centerx, centery);
        //  Get color from chart info
        ctx.fillStyle = data[i][1];
        

        //  Start new arc (pie slice) from end of previous arc
        startAngle = endAngle;
        endAngle = endAngle + (arcLengthRadian * data[i][0]);

        ctx.arc(centerx, centery, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fill();
    }
}
setInterval(drawPieChart, 1);