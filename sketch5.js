//https://p5js.org/examples/math-sine-wave.html
//https://p5js.org/reference/#/p5.Amplitude

let xspacing = 10; // Distance between each horizontal location
let w; // Width of entire wave
let theta = 0.0; // Start angle at 0

let period = 400.0; // How many pixels before the wave repeats
let dx; // Value for incrementing x
let yvalues; // Using an array to store height values for the wave
let sat = 90;//saturation
let hue = 200;//hue
let b = 90;//brightness

let isText = true;

let sound;
let level;
let size;

function preload(){
  sound = loadSound('clocks.mp3');//load sound
}


//start playing sound based on mouse click
function mousePressed() {
  if (sound.isPlaying()) {
    // .isPlaying() returns a boolean
    sound.pause();
    isText = true; 

  } else {
    sound.play();
    isText = false;  
  }
}

//change color on key press
function keyPressed() {
  if (keyCode === 40 && hue < 360) {
    hue += 7;  
      console.log(hue);
  } else if (keyCode === 38 && hue > 1) {
    hue -= 7;
      console.log(hue);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = width +10;
  dx = (TWO_PI / period) * xspacing; //specific x value
  yvalues = new Array(floor(w / xspacing));//array for y values
    
  amplitude = new p5.Amplitude(); //amplitude of sound wave from file
  colorMode(HSB, 360,100,100);  
  //console.log(yvalues.length);
}

function draw() {
  level = amplitude.getLevel(); //get amplitude value at specific time
  size = map(level, 0, 1, 5, 150); //map to convert values to a range suitable for wave
  
  background(0,0,95);
  
  //instructions how to start
  if(isText){
      textSize(14);
      textAlign(CENTER);
      fill(0,0,75);
      text("Click Anywhere to start.", width/2, height-100);
  }
  //instructions how to change color
  else if(isText == false){
      textSize(14);
      textAlign(CENTER);
      fill(0,0,75);
      text("Use Up / Down arrows to change color", width/2, height-100);
  } 
  
    

  calcWave(5);//waves at different depths (higher value = farther away)
  calcWave(3);
  calcWave(2);
  calcWave(1.5);    
  calcWave(1);
    
    
}


function calcWave(co) {
    
    
   let a = (size * 3)/ co; // Height of wave 
   
    

  // Increment theta (angular velocity)
  theta += (.02/co);
  // Increment or decrement spacing between the circles based on mouseY position
    if(mouseY < height/2){
       xspacing = (mouseY/(co*7))+30;
    }
    else if(mouseY > height/2){
        xspacing = (mouseY/(co*7))+30;
    }

    
  // For every x value, calculate a y value with sine function
  let x = theta;
  for (let i = 0; i < yvalues.length; i++) {
    yvalues[i] = sin(x) * a;
    x += dx;
  }
    
  //r = 1 * co;

  let thickness = size/(3*co); //circle size
  let transparency = 200 / co; 
  
   noStroke();
  
  // A simple way to draw the wave with a circle at each location
  for (let j = 0; j < yvalues.length; j++) {
    fill(hue,sat,b,transparency);
    ellipse(j * xspacing, height / 2 + yvalues[j], thickness, thickness);//draw at x, y, size h, size v   
  } 
}



