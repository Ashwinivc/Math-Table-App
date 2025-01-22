let score = 0;
let currentQuestion = {};
let questionAnswered = false; // To track if the current question has been answered correctly

const adjectives = {
    correct: ["Awesome", "Great job", "Excellent", "Well done", "Superb"],
    incorrect: ["Try again", "Not quite", "Oops", "Close, but no", "Almost there"]
};

const adjectiveColors = ["#FF6347", "#FF4500", "#FFD700", "#32CD32", "#1E90FF"]; // Array of colors

function generateQuestion() {
    const num1 = Math.floor(Math.random() * 19) + 2; // Random number between 2 and 20
    const num2 = Math.floor(Math.random() * 19) + 2; // Random number between 2 and 20
    currentQuestion = { num1, num2, answer: num1 * num2 };

    document.getElementById("question").textContent = `${num1} x ${num2} = ?`;
    questionAnswered = false; // Reset for the new question
}

function checkAnswer() {
    if (questionAnswered) {
        nextCard();
        return;
    }

    const userAnswer = parseInt(document.getElementById("answer").value);
    const feedbackElement = document.getElementById("feedback");
    const adjectiveElement = document.getElementById("adjective");

    if (userAnswer === currentQuestion.answer) {
        score++;
        feedbackElement.textContent = "Correct!";  // Display "Correct"
        feedbackElement.className = "feedback correct";

        // Show sparkles when the answer is correct
        createSparkles();

        // Select a random adjective for correct answers
        const correctAdjective = adjectives.correct[Math.floor(Math.random() * adjectives.correct.length)];
        adjectiveElement.textContent = correctAdjective;

        // Randomly change adjective color
        adjectiveElement.style.color = adjectiveColors[Math.floor(Math.random() * adjectiveColors.length)];

        // Speak the correct adjective
        speakAdjective(correctAdjective);

        // Update score
        updateScore();
        questionAnswered = true; // Mark the question as answered correctly
    } else {
        feedbackElement.textContent = "Incorrect!";  // Display "Incorrect"
        feedbackElement.className = "feedback incorrect";

        // Select a random adjective for incorrect answers
        const incorrectAdjective = adjectives.incorrect[Math.floor(Math.random() * adjectives.incorrect.length)];
        adjectiveElement.textContent = incorrectAdjective;

        // Randomly change adjective color
        adjectiveElement.style.color = adjectiveColors[Math.floor(Math.random() * adjectiveColors.length)];

        // Speak the incorrect adjective
        speakAdjective(incorrectAdjective);
    }
}

function createSparkles() {
    for (let i = 0; i < 10; i++) {
        let sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');

        sparkle.style.top = `${Math.random() * 80 + 10}%`;
        sparkle.style.left = `${Math.random() * 80 + 10}%`;

        document.querySelector('.game-container').appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);
    }
}

function nextCard() {
    document.getElementById("answer").value = '';
    generateQuestion();
    document.getElementById("feedback").textContent = '';
    document.getElementById("adjective").textContent = ''; // Clear adjective text
}

function updateScore() {
    document.getElementById("score-value").textContent = score;
}

function speakAdjective(adjective) {
    const utterance = new SpeechSynthesisUtterance(adjective);
    utterance.rate = 1; // Adjust the speaking rate if needed
    speechSynthesis.speak(utterance);
}

// Add event listener for the Enter key
document.getElementById("answer").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkAnswer();
    }
});

// Add event listener for the "Check Answer" button
document.getElementById("check-answer").addEventListener("click", checkAnswer);

// Initialize game
generateQuestion();
