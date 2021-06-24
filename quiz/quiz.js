// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const choiceD = document.getElementById("D");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
{
    question : "Biasanya resolusi piksel dinyatakan sebagai",
    imgSrc : "img/quiz.png",
    choiceA : "jumlah piksel persatuan panjang",
    choiceB : "Jumlah piksel yang bisa ditampilkan secara bersama-sama dilayar",
    choiceC : "Piksel tempat warna disimpan",
    choiceD : "Elemen gambar terkecil",
    correct : "A"
},{
    question : "Diketahui koordinat titik A (2,1) dan titik B (8,5) akan digambar sebagai garis menggunakan algoritma Bressenham. Bila titik A digunakan sebagai titik awal, maka dua titik sebelum titik B yang digambar pada layar adalah: !",
    imgSrc : "img/quiz.png",
    choiceA : "(5,7) dan (7,4)",
    choiceB : "(7,5) dan (6,5)",
    choiceC : "(6,4) dan (8,5)",
    choiceD : " (6,4) dan (7,4)",
    correct : "D"
},{
    question : "Diketahui sebuah titik pembentuk lingkaran (9,4). Dengan menggunakan konsep simetris delapan titik, maka diperoleh titik-titik pembentuk lingkaran yang lain, yaitu:",
    imgSrc : "img/quiz.png",
    choiceA : "(–4,9), (4, –9),( –4, –9), (4,9), (–9, –4), (9, –4), (–9,4)",
    choiceB : "(–4,9), (4, –9),( 4, 9), (–9, –4), (9,4), (9, –4), (–9,4)",
    choiceC : "(–4,9), (4, –9),( –4, –9), (–9, –4), (9,4), (9, –4), (4,9)",
    choiceD : "(–4,9), (4, –9),( –4, –9), (9, 4), (4,9), (9, –4), (–9,4)",
    correct : "A"
},{
    question : "Dalam konsep polygon dikenal istilah verteks. Yang dimaksud verteks adalah",
    imgSrc : "img/quiz.png",
    choiceA : "titik-titik pada polygon",
    choiceB : "Titik pertemuan tiap dua sisi polygon",
    choiceC : "titik-titik pembentuk polygon",
    choiceD : "salah semua",
    correct : "B"
},{
    question : "Diketahui sebuah polygon dan garis scan seperti gambar berikut. Global Edge Table (GET) untuk garis scan tersebut adalah",
    imgSrc : "img/s5.jpg",
    choiceA : "AB",
    choiceB : "AB dan AE4",
    choiceC : "AB dan BC",
    choiceD : "Salah semua",
    correct : "D"
},{
    question : "Yang manakah yang termasuk algoritma pembentuk garis",
    imgSrc : "img/quiz.png",
    choiceA : "Algoritma DDA",
    choiceB : "Algoritma Bubble",
    choiceC : "Algoritma FlowChart",
    choiceD : "Semuanya Benar",
    correct : "A"
},{
    question : "Atribut adalah semua parameter yang mempengaruhi bagaimana primitive grafis ditampilkan. Salah satu dari atribut output primitive garis adalah:",
    imgSrc : "img/quiz.png",
    choiceA : "sudut garis batas",
    choiceB : "Panjang Garis batas",
    choiceC : "Ukuran garis batas",
    choiceD : "Warna objek",
    correct : "C"
}
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 180; // 180s
const gaugeWidth = 180; // 180px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p style='font-size:15px;'>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
    (scorePerCent >= 60) ? "img/4.png" :
    (scorePerCent >= 40) ? "img/3.png" :
    (scorePerCent >= 20) ? "img/2.png" :
    "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    
}





















