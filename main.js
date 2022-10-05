toxic="";
arcade="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scorerightWrist = 0;
scoreleftWrist = 0;
song_name = "";
song_arcade = "";
function setup(){
    canvas = createCanvas(600,530);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    toxic = loadSound("BoyWithUke_192(PaglaSongs).mp3");
    arcade = loadSound("Arcade (1).mp3.crdownload");
}

function draw(){
    image(video,0,0,600,530);

    fill("#00ff00");
    stroke("#ff0000");

    song_name =  toxic.isPlaying();
    console.log(song_name);

    song_arcade = arcade.isPlaying();
    console.log(song_arcade);

    if(scoreleftWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        toxic.stop();
        if(arcade == false){
            arcade.play();
        }
        else{
            console.log("Song Name:  arcade");
            document.getElementById("song_id").innerHTML = "Song Name: arcade";
        }
    }
}

function modelLoaded(){
    console.log("poseNet Is Initialized");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log("leftwrist_score =  " + scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("rightwrist_score = " + scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}