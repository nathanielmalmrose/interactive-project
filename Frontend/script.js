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

data = [];

let fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    init(data);
};

const init = (data) => {
    let q1 = data.question1Answers;
    let q2 = data.question2Answers;
    let q3 = data.question3Answers;

    let q1Color = [[q1[0], '#f00'], [q1[1], '#0f0'], [q1[2], '#00f'], [q1[3], '#0ff']];
    let q2Color = [[q2[0], '#f00'], [q2[1], '#0f0'], [q2[2], '#00f']];
    let q3Color = [[q1[0], '#f00'], [q1[1], '#0f0'], [q1[2], '#00f'], [q1[3], '#0ff']];

    console.log("q3: ", data.question3Answers);

    for (let i = 0; i < 3; i++) {
        switch(i) {
            case 0:
                drawPieChart(100, 100, 80, q1Color);
                break;
            case 1:
                drawPieChart(300, 100, 80, q2Color);
                break;
            case 2:
                drawPieChart(500, 100, 80, q3Color);
                break;
        }
    }
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
data = fetchData('http://localhost:3000/api');
// console.log(data);
// setInterval(loop(), 100);
