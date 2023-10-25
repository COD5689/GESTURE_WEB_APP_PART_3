predection = "";

Webcam.set({
    width:350,
    height:300,
    image_quality:'png',
    png_quality:100
});
camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/Dzxv7IVWJ/model.json", moadelLoaded);

function moadelLoaded(){
    console.log("Model Loaded");
}

function check(){
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult); 
}

function gotResult(error, results){
    if(error){
        console.log(error);
    } else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        predection = results[0].label;
        speak();
        if(results[0].label == "amazing"){
            document.getElementById("update_emoji").innerHTML = "👌";
        }
        if(results[0].label == "best"){
            document.getElementById("update_emoji").innerHTML = "👍";
        }
        if(results[0].label == "victory"){
            document.getElementById("update_emoji").innerHTML = "✌️";
        }
    }
}

function speak(){
    var synth = window.speechSynthesis;
    speak_data1 = "The perdection is "+ predection;
    var utterThis = new SpeechSynthesisUtterance(speak_data1);
    synth.speak(utterThis);
}