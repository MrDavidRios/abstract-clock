const CANVAS_WIDTH = window.innerWidth;
const CANVAS_HEIGHT = window.innerHeight;

const CENTER_PLANET_RADIUS = 100;

let lastRecordedMinute = -1;

// Edges relative to center of canvas
const TOP_EDGE = CANVAS_HEIGHT / 2;
const BOTTOM_EDGE = -CANVAS_HEIGHT / 2;
const LEFT_EDGE = -CANVAS_WIDTH / 2;
const RIGHT_EDGE = CANVAS_WIDTH / 2;

let starPositions = [];
const STARS_RADIUS = 3;

const printMinuteIfChanged = (currentMinute) => {
  if (currentMinute !== lastRecordedMinute) {
    lastRecordedMinute = currentMinute;
    console.log(`Minute changed. Current minute: ${currentMinute}`);
  }
};

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  colorMode(hex);
  angleMode(DEGREES);
  fillStarPositions();

  lastRecordedMinute = minute();
}

function fillStarPositions() {
  const STARS_AMOUNT = 50;

  for (let i = 0; i < STARS_AMOUNT; i++) {
    const starX = Math.random() * CANVAS_WIDTH - CANVAS_WIDTH / 2;
    const starY = Math.random() * CANVAS_HEIGHT - CANVAS_HEIGHT / 2;

    starPositions.push({ x: starX, y: starY });
  }
}

function drawStars() {
  push();

  fill("white");

  for (const position of starPositions) {
    circle(position.x, position.y, STARS_RADIUS);
  }

  pop();
}

function drawGuidelines(x, y, planetRadius, length, color) {
  push();
  stroke(color);
  line(x - planetRadius - length, y, x + planetRadius + length, y);
  line(x, y - planetRadius - length, x, y + planetRadius + length);
  // line(x, y, x, y);
  // line(x, y, x, y);

  pop();
}

function draw() {
  background("#181a1b");
  printMinuteIfChanged(minute());

  // Make origin center of canvas
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  drawStars();

  rotate(-90);

  fill("#FC9601");

  const SUN_RADIUS = 300;

  drawGuidelines(0, 0, SUN_RADIUS, 40, "#3a3a3a");

  push();
  noStroke();
  circle(0, 0, SUN_RADIUS);
  pop();

  // Hour circle
  fill("#186467");

  const hourPlanetDist = 300;
  const hourAngle = map(hour(), 0, 12, 0, 360);
  const hourX = hourPlanetDist * cos(hourAngle);
  const hourY = hourPlanetDist * sin(hourAngle);

  drawGuidelines(hourX, hourY, CENTER_PLANET_RADIUS, 200, "#3a3a3a");
  push();
  noStroke();
  circle(hourX, hourY, CENTER_PLANET_RADIUS);
  pop();
  // Start orbiting from top of center circle

  // Minutes circle
  fill("#498C8A");

  const minutePlanetDist = 100;
  const minuteAngle = map(minute(), 0, 60, 0, 360);
  const minuteX = hourX + minutePlanetDist * cos(minuteAngle);
  const minuteY = hourY + minutePlanetDist * sin(minuteAngle);
  const minutePlanetRadius = CENTER_PLANET_RADIUS / 2;

  drawGuidelines(minuteX, minuteY, minutePlanetRadius, 50, "#3a3a3a");
  push();
  noStroke();
  circle(minuteX, minuteY, minutePlanetRadius);
  pop();
  // Seconds circle
  fill("#42F2F7");

  const secondsPlanetDist = 50;
  const secondAngle = map(second(), 0, 60, 0, 360);
  const secondX = minuteX + secondsPlanetDist * cos(secondAngle);
  const secondY = minuteY + secondsPlanetDist * sin(secondAngle);
  const secondsPlanetRadius = minutePlanetRadius / 3;

  push();
  noStroke();
  circle(secondX, secondY, secondsPlanetRadius);
  pop();
}
