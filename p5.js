let offset = 0;
let shapeTypes = {};

function setup() {
  createCanvas(400, 400);
  fill(255, 72, 176);
    
  // 1 = rect, 2 = circle
  for (let i = 0; i <= 15; i++) {
    shapeTypes[i] = floor(random(1, 3));
  }
}

function draw() {
  if (frameCount % 95 === 0) {
    // Pick a new random shape layout every 95 frames
    for (let i = 0; i <= 15; i++) {
      shapeTypes[i] = floor(random(1, 3));
    }
  }

  for (let i = 0; i <= 15; i++) {
    let x = 50 + (i * 50);
    let y = 200 + sin(offset + i) * 50;
    
    if (shapeTypes[i] === 1) {
      rect(x, y, 15);
    } else {
      // Using x and y centers the circle on the wave path
      circle(x, y, 15); 
    }

    if (frameCount % 95 === 0) {
      circle(random(255), random(255), random(255));
      fill(255, 232, 0);
      rect(random(255), random(255), random(255));
      fill(0, 120, 191);
      ellipse(random(255), random(255), random(255));
      fill(255, 72, 176);
    }
  }

  offset += 0.1;
}
