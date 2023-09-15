const questions = [
    {
    text: "Which language is primarily used for web app development?",
    options: ["C#", "Python", "JavaScript", "Swift"],
    correct: 2
},
{
    text: "Which of the following is a relational database management system?",
    options: ["Oracle", "Scala", "Perl", "Java"],
    correct: 0
},
{
    text: "In which language is memory management provided by JVM?",
    options: ["Java", "C", "C++", "Python"],
    correct: 0
},
{
    text: "What does HTML stand for?",
    options: ["Hyperlink and Text Markup Language", "High Technology Modern Language", "Hyper Text Markup Language", "Home Tool Markup Language"],
    correct: 2
}
];


let currentQuestionIndex = 0;
let userScore = 0;
let answered = false;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.text}`;
    let ans = null;
    let eleTag = null;
    let ansTag = null;
    optionsElement.innerHTML = "";
    currentQuestion.options.forEach((answer, index) => {
        const option = document.createElement("li");
        option.innerHTML = `<input type="radio" id="${index}" /><lable for="${index}">${answer}</lable>`
        option.classList.add("option");
        optionsElement.appendChild(option);

        if(index === currentQuestion.correct)
            ansTag = option 

        document.getElementById(`${index}`).addEventListener("click",()=>{
            ans = index;
            eleTag = option;
            answered = true;
            const options1 = optionsElement.getElementsByClassName("option");
            for (let option of options1) {
                option.style.pointerEvents = "none"; // Disable further clicks on options
            }
            const userAnswer = index;

    if (userAnswer === currentQuestion.correct) {
        
        userScore++;
    }
    
        
        })            
    });

    
    submitButton.style.display = "block";
    nextButton.style.display = "none";

    submitButton.addEventListener("click", () => {
        checkAnswer(ans,eleTag,ansTag);
    });
}

function checkAnswer(selectedOption, eleTagrget, ansTarget) {
    const currentQuestion = questions[currentQuestionIndex];
    console.log(selectedOption,"option")
    // const userAnswer = selectedOption;

    // if (userAnswer === currentQuestion.correct) {
        
    //     userScore++;
    // }
    
    ansTarget.classList.add("correct-answer");

    submitButton.style.display = "none";
    nextButton.style.display = "block";
   
}

function submitAnswer() {
    const options = optionsElement.getElementsByClassName("option");
    
    for (let option of options) {
        if (option.classList.contains("correct-answer")) {
            answered = true;
            break;
        }
    }

    if (answered) {
        submitButton.style.display = "block";
        nextButton.style.display = "none";
    } else {
        alert("Please select an answer!");
    }
}

function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    alert(`Quiz completed!\nYour Score: ${userScore}/${questions.length}`);
    // You can reset the quiz here if needed.
}

// Initial load
loadQuestion();