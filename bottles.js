status_model = "";
objects = [];
img = ""

function preload(){
img = loadImage("bot.jpeg");
}

function setup(){
    canvas = createCanvas(450,450);
    canvas.position(900,200);
    object_Detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting objects";
    document.getElementById("num_of_obj").innerHTML = "There are 2 big objects in the image from which cocossd model has detected 1 object";
    
}

function modelLoaded(){
    console.log("Model Loaded");
    status_model = true;
    object_Detector.detect(img, gotResults);
}

function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}
function draw(){
    image(img, 0, 0, 430, 520);
    if(status_model != ""){
        document.getElementById("status").innerHTML = "Status: Objects detected";
        for(i = 0;i < objects.length;i++){
            var percent = Math.floor(objects[i].confidence * 100);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y + 15);
            fill("black");
            noFill();
            stroke("yellow");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}
