song=""
function preLoad(){
song=loadSound("music.mp3")
}

scoreRightWist=0
scoreLeftWist=0
RightWistx=0
RightWisty=0
LeftWistx=0
LeftWisty=0

function setup(){
    canvas=createCanvas(600,500)
    canvas.center()

    video=createCapture(VIDEO)
    // video.hide()

    poseNet=ml5.poseNet(video,modelLoaded)
    poseNet.on("pose",gotPoses)

}

function modelLoaded(){
console.log("PoseNet foi iniciado.")
}

function gotPoses(){
if(results.length>0){
    console.log(results)
    scoreRightWist=results[0].pose.keypoints[10].score
    scoreLeftWist=results[0].pose.keypoints[10].score
console.log("Score Right Wist=  "+scoreRightWist + "Score Left Wist=  " + scoreLeftWist)
RightWistx=results[0].pose.rightWist.x
RightWisty=results[0].pose.rightWist.y
console.log(" Right Wist x=  "+ RightWistx +" Right Wist y= " + RightWisty)

LeftWistx=results[0].pose.leftWist.x
LefttWisty=results[0].pose.leftWist.y
console.log(" Left Wist x=  "+ LeftWistx +" Left Wist y= " + LeftWisty)

}
}

function draw(){
image(video,0,0,600,500)
stoke("#ff0000")
fill("#ff0000")
if(scoreRightWist>0.2){
    circle(RightWistx,RightWisty,20)
    if(RightWisty>0 && RightWisty<=100){
        document.getElementById("speed").innerHTML= "Velocidade= 0.5x"
        song.rate(0.5)

    }
    else if(RightWisty>100 && RightWisty<=200){
        document.getElementById("speed").innerHTML= "Velocidade= 1.0x"
        song.rate(1.0)

    }

    else if(RightWisty>200 && RightWisty<=300){
        document.getElementById("speed").innerHTML= "Velocidade= 1.5x"
        song.rate(1.5)

    }

    else if(RightWisty>300 && RightWisty<=400){
        document.getElementById("speed").innerHTML= "Velocidade= 2.0x"
        song.rate(2.0)

    }

    else if(RightWisty>400){
        document.getElementById("speed").innerHTML= "Velocidade= 2.5x"
        song.rate(2.5)

    }
}


if(scoreLeftWist>0.2){
circle(LeftWistx,LeftWisty,20)
InNumberleftWristY = Number(leftWristY); //transformando a coordenada y em número
remove_decimals = floor(InNumberleftWristY);
volume=remove_decimals/500// dividir a variável remove_decimals por 500, pois a função setVolume() recebe 
//valores entre 0 e 1. Então dividir as coordenadas y de leftWrist por 500 nos ajudará a obter um
//valor entre 0 e 1. Depois de dividir a variável remove_decimals por 500, armazene o resultado
 //em uma nova variável.

 document.getElementById("volume").innerHTML="Volume"+volume
 song.setVolume(volume)
}


}


function play(){
    song.play()
 song.setVolume(1)
 song.rate(1)
}
