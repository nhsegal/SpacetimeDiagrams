let beta1 = 0;
let beta2 = 0.6;
let gamma1 = 1 / Math.sqrt(1 - beta1 * beta1);
let gamma2 = 1 / Math.sqrt(1 - beta2 * beta2);
const spacing = 45;
let spacing1 = spacing / gamma1;
let spacing2 = spacing / gamma2;

let speedSlider;
let speedSlider2;

let input1;
let input2;
let input3;
let modalButton;
let span;
let lastBlackGridChoice;

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight - 30);
  cnv.parent("myContainer");
  strokeWeight(0.25);
  stroke(0);
  speedSlider = createSlider(-196, 196, 0);
  speedSlider2 = createSlider(-196, 196, 120);
  speedSlider.position(145, height - 63);
  speedSlider2.position(145, height - 23);
  speedSlider.parent("sliderPos");
  speedSlider2.parent("sliderPos2");
  speedSlider.style("width", "130px");
  speedSlider2.style("width", "130px");
  modalButton = createButton("Questions and Answers");
  modalButton.position(width - 168, height - 16);
  modalButton.mousePressed(showModal);

  blackGridCheckbox = createCheckbox("", true);
  redGridCheckbox = createCheckbox("", false);
  blackAxesCheckbox = createCheckbox("", true);
  redAxesCheckbox = createCheckbox("", true);
  blackFutureCheckbox = createCheckbox("", false);
  redFutureCheckbox = createCheckbox("", false);
  drawEventsBox = createCheckbox("", false);
  drawBarnBox = createCheckbox("", false);
  drawPoleBox = createCheckbox("", false);


  blackGridCheckbox.position(442, height - 64);
  redGridCheckbox.position(442, height - 22);
  blackAxesCheckbox.position(335, height - 64);
  redAxesCheckbox.position(335, height - 22);
  blackFutureCheckbox.position(535, height - 64);
  redFutureCheckbox.position(535, height - 22);
  drawEventsBox.position(15, height - 117);
  drawBarnBox.position(625, height - 64);
  drawPoleBox.position(625, height - 22);

  input1 = createInput("0");
  input1.parent("buttonPos");
  input1.position(84, height - 63);
  input1.style("width", "30px");

  input2 = createInput(".6");
  input2.parent("buttonPos2");
  input2.position(84, height - 23);
  input2.style("width", "30px");
  const modal = document.getElementById("modal");
  span = document.getElementsByClassName("close")[0];
  span.onclick = function () {
    modal.classList.remove("visible");
  };
}

function draw() {
  background(255);
  stroke(50);

  push();
  translate(width / 2, (3 * height) / 5);
  scale(1, -1);
  if (drawEventsBox.checked()) {
    drawEvents();
  }

  drawLightCone();

  if (drawBarnBox.checked()){
    drawBarn(spacing1 * 2.5, 1 * gamma1 * gamma1, spacing1 * 5);
  }
  if (drawPoleBox.checked()){
    drawPole(-2.5* spacing2, 1 * gamma2 * gamma2, spacing2 * 5);
  }

  for (let i = -spacing1 * 25; i < spacing1 * 25; i = i + spacing1) {
    if (blackGridCheckbox.checked() == true) {
      drawBlackGridline(i);
    }
    if (blackAxesCheckbox.checked() == true) {
      drawBlackAxes(i);
    }
   
  }
 
  if (blackFutureCheckbox.checked() == true) {
    showBlackFuture();
  }

  //red
  
  for (let i = -spacing2 * 25; i < spacing2 * 25; i = i + spacing2) {
    if (redGridCheckbox.checked() == true) {
      drawRedGridline(i);
    }

    if (redAxesCheckbox.checked() == true) {
      drawRedAxes(i);
    }

  }

  if (redFutureCheckbox.checked() == true) {
    drawRedFuture();
  }

  pop();
  drawControls();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 30);
  speedSlider.position(145, height - 63);
  speedSlider2.position(145, height - 23);
  modalButton.position(width - 168, height - 16);
  blackGridCheckbox.position(442, height - 64);
  redGridCheckbox.position(442, height - 22);
  blackAxesCheckbox.position(335, height - 64);
  redAxesCheckbox.position(335, height - 22);
  blackFutureCheckbox.position(535, height - 64);
  redFutureCheckbox.position(535, height - 22);
  drawEventsBox.position(15, height - 117);
  input1.position(84, height - 63);
  input2.position(84, height - 23);
}

function showModal() {
  modal.classList.add("visible");
}

function setSpeed1() {
  beta1 = speedSlider.value() / 200;
  gamma1 = 1 / Math.sqrt(1 - beta1 * beta1);
  spacing1 = spacing / gamma1;
  input1.value(beta1);
}

function setSpeed2() {
  beta2 = speedSlider2.value() / 200;
  gamma2 = 1 / Math.sqrt(1 - beta2 * beta2);
  spacing2 = spacing / gamma2;
  input2.value(beta2);
}

function drawEvents() {
  stroke(0, 70, 230);
  fill(0, 70, 230);
  ellipse(2 * spacing, 2 * spacing, 10, 10);
  scale(1, -1);
  text("A", 2 * spacing - 10, -2 * spacing - 10);
  scale(1, -1);

  ellipse(2 * spacing, 6 * spacing, 10, 10);
  scale(1, -1);
  text("B", 2 * spacing - 10, -6 * spacing - 10);
  scale(1, -1);

  ellipse(-6 * spacing, 6 * spacing, 10, 10);
  scale(1, -1);
  text("C", -6 * spacing - 10, -6 * spacing - 10);
  scale(1, -1);

  ellipse(-8 * spacing, 4 * spacing, 10, 10);
  scale(1, -1);
  text("D", -8 * spacing - 10, -4 * spacing - 10);
  scale(1, -1);

  ellipse(0, 8 * spacing, 10, 10);
  scale(1, -1);
  text("E", -10, -8 * spacing - 10);
  scale(1, -1);
}

function drawLightCone() {
  stroke(0, 150, 0);
  strokeWeight(2.5);
  fill(0);
  for (let i = -height / 2; i < height; i = i + 12) {
    line(i, i, i + 7, i + 7);
    line(-i, i, -i - 7, i + 7);
  }
}

function drawBlackGridline(i) {
  stroke(0);
  strokeWeight(0.3);
  for (let dash = -width; dash < width; dash = dash + 12) {
    line(dash, i + dash * beta1, dash + 6, i + beta1 * (dash + 6));
    line(i + dash * beta1, 0 + dash, i + beta1 * (dash + 6), dash + 6);
  }
}

function drawBlackAxes(i) {
  //black axes
  stroke(0);
  strokeWeight(1.5);
  line(-beta1 * height, -height, beta1 * height, height);
  if (beta1 != 0) {
    line((-1 / beta1) * height, -height, (1 / beta1) * height, height);
  } else {
    line(-width, 0, width, 0);
  }

  //black time axis numbers
  push();
  translate(gamma1 * gamma1 * beta1 * i, gamma1 * gamma1 * i);
  scale(1, -1);
  ellipse(0, 0, 4);
  noStroke();
  fill(0);
  textAlign(CENTER, CENTER);
  if (i > 0.5 || i < -0.5) {
    text((i / spacing1).toFixed(0), -10, 0);
  }
  if (
    gamma1 * gamma1 * i > height / 2 + 5 &&
    gamma1 * gamma1 * i < (2 * height) / 3 - 75
  ) {
    text("Time", -25, -64);
  }
  pop();

  //black space axes numbers
  push();
  translate(gamma1 * gamma1 * i, gamma1 * gamma1 * i * beta1);
  scale(1, -1);
  ellipse(0, 0, 4);
  textSize(16);
  noStroke();
  fill(0);
  if (i > 0.5 || i < -0.5) {
    text((i / spacing1).toFixed(0), 0, 15);
  }
  if (
    gamma1 * gamma1 * i > (3 * width) / 8 + 110 &&
    gamma1 * gamma1 * i < width / 2 - 10
  ) {
    text("Position", -35, 40);
  }
  pop();
}

function showBlackFuture() {
  stroke(0)
  strokeWeight(1)
  push();
  rotate(atan(beta1));
  fill(200, 200, 200, 100);
  rect(-width - 200, 0, 2 * (width + 200), 2 * height);
  pop();
}

function drawRedGridline(i) {
  stroke(220, 0, 0);
  strokeWeight(0.3);
  for (let dash = -width; dash < width; dash = dash + 12) {
    line(dash, i + dash * beta2, dash + 6, i + beta2 * (dash + 6));
    line(i + dash * beta2, 0 + dash, i + beta2 * (dash + 6), dash + 6);
  }
}

function drawRedAxes(i) {
  //red axes
  stroke(200, 0, 0, 190);
  strokeWeight(1.5);
  line(-beta2 * height, -height, beta2 * height, height);
  if (beta2 != 0) {
    line((-1 / beta2) * height, -height, (1 / beta2) * height, height);
  } else {
    line(-width, 0, width, 0);
  }
  strokeWeight(3);
  stroke(200, 0, 0, 190);
  fill(200, 0, 0, 190);
  ellipse(gamma2 * gamma2 * beta2 * i, gamma2 * gamma2 * i, 2, 2);
  textSize(16);
  noStroke();
  textAlign(CENTER, CENTER);

  //red time axis numbers
  push();
  translate(gamma2 * gamma2 * beta2 * i, gamma2 * gamma2 * i);
  scale(1, -1);
  ellipse(0, 0, 4);
  noStroke();
  textAlign(CENTER, CENTER);
  if (i > 0.5 || i < -0.5) {
    text((i / spacing2).toFixed(0), -10, 0);
  }
  if (
    gamma2 * gamma2 * i > height / 2 + 20 &&
    gamma2 * gamma2 * i < (2 * height) / 3 - 10
  ) {
    text("Time", -25, -36);
  }
  pop();

  //red space axes numbers
  push();
  translate(gamma2 * gamma2 * i, gamma2 * gamma2 * i * beta2);
  scale(1, -1);
  ellipse(0, 0, 4);
  textSize(16);
  noStroke();
  if (i > 0.5 || i < -0.5) {
    text((i / spacing2).toFixed(0), 0, 10);
  }
  if (
    gamma2 * gamma2 * i > (3 * width) / 8 + 110 &&
    gamma2 * gamma2 * i < width / 2 - 10
  ) {
    text("Position", -95, 35);
  }
  pop();
}

function drawRedFuture() {
  push();
  rotate(atan(beta2));
  fill(250, 200, 200, 100);
  rect(-width - 200, 0, 2 * (width + 200), 2 * height);
  pop();
}

function drawControls() {
  fill(255);
  rect(5, height - 136, width - 5, 136);
  fill(0);
  textSize(16);
  textAlign(CENTER);
  text("Show \nAxes", 336, height - 115);
  text("Show \nGridlines", 445, height - 115);
  text("Show \nFuture", 535, height - 115);
  text("Show \nBarn/Pole", 625, height - 115);
  text("Display Events", 85, height - 110);
  text("0", 204, height - 78);
  text("-0.98c", 144, height - 78);
  text("0.98c", 266, height - 78);
  strokeWeight(1);
  line(204, height - 70, 204, height - 52);
  line(145, height - 70, 145, height - 52);
  line(264, height - 70, 264, height - 52);
  line(204, height - 30, 204, height - 12);
  line(145, height - 30, 145, height - 12);
  line(264, height - 30, 264, height - 12);
  strokeWeight(0.25);
  text("Velocity:", 40, height - 55);
  stroke(220, 0, 0);
  fill(220, 0, 0);
  text("Velocity:", 40, height - 15);
}

function drawBarn(x, y, w) {
  push();
  shearX(atan(beta1));
  rectMode(CENTER);
  noStroke();
  fill(200, 200, 200, 100);

  rect(x, -200, w, height*2);
 
  pop();
}

function drawPole(x, y, w) {
  push();
  shearX(atan(beta2));
  rectMode(CENTER);
  noStroke();
  fill(200, 100, 100, 100);
  rect(x, y, w, height*2);
  pop();
}
