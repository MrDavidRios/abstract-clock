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

function drawGuidelines(x, y, planetRadius, length, color, pct) {
  stroke(color);

  // rotation of -90

  const green = "#215913";
  const yellow = "#c7c422";

  // top
  push();
  stroke(color);
  if (pct >= 0.75 && pct < 1.0) {
    stroke(yellow);
  }
  line(x, y, x + planetRadius + length, y);
  pop();

  // right
  push();
  stroke(pct >= 0.25 ? green : color);
  if (pct >= 0.0 && pct < 0.25) {
    stroke(yellow);
  }
  line(x, y, x, y + planetRadius + length);
  pop();

  // left
  push();
  stroke(pct >= 0.75 ? green : color);
  if (pct >= 0.5 && pct < 0.75) {
    stroke(yellow);
  }
  line(x, y - planetRadius - length, x, y);
  pop();

  // bottom
  push();
  stroke(pct >= 0.5 ? green : color);
  if (pct >= 0.25 && pct < 0.5) {
    stroke(yellow);
  }
  line(x - planetRadius - length, y, x + length, y);
  pop();
}

function draw() {
  background("#181a1b");
  printMinuteIfChanged(minute());

  // Make origin center of canvas
  translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

  drawStars();

  rotate(-90);

  const sunriseColor = color("#FC9601");
  const sunsetColor = color("#A36D8D");
  const sunColor = lerpColor(sunriseColor, sunsetColor, hour() / 24);
  fill(sunColor);

  const SUN_RADIUS = 300;

  drawGuidelines(0, 0, SUN_RADIUS, 40, "#3a3a3a", (hour() > 12 ? hour() - 12 : hour()) / 12);

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

  drawGuidelines(hourX, hourY, CENTER_PLANET_RADIUS, 40, "#3a3a3a", minute() / 60);
  push();
  noStroke();
  circle(hourX, hourY, CENTER_PLANET_RADIUS);
  pop();

  // Minutes circle
  fill("#498C8A");

  const minutePlanetDist = 100;
  const minuteAngle = map(minute(), 0, 60, 0, 360);
  const minuteX = hourX + minutePlanetDist * cos(minuteAngle);
  const minuteY = hourY + minutePlanetDist * sin(minuteAngle);
  const minutePlanetRadius = CENTER_PLANET_RADIUS / 2;

  drawGuidelines(minuteX, minuteY, minutePlanetRadius, 20, "#3a3a3a", second() / 60);
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
