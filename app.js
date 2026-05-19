let questions = [];
let currentQuestion = 0;
let currentFlashcard = 0;
let userAnswers = [];
let timer = null;
let secondsLeft = 0;

const STORAGE_KEY = "uapl_mock_test_progress_v2";

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

if (!Array.isArray(QUESTIONS) || QUESTIONS.length === 0) {
    console.error("QUESTIONS array is missing or empty. Check questions.js.");
}

function setupQuestions() {
    const shouldShuffle = document.getElementById("shuffleToggle").checked;
    questions = shouldShuffle ? shuffleArray(QUESTIONS) : [...QUESTIONS];
}

function saveProgress() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentQuestion,
        currentFlashcard,
        userAnswers,
        questions,
        timerEnabled: document.getElementById("timerToggle").checked,
        shuffleEnabled: document.getElementById("shuffleToggle").checked,
        secondsLeft
    }));
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;

    try {
        const data = JSON.parse(saved);

        const savedQuestionsValid =
            Array.isArray(data.questions) &&
            data.questions.length === QUESTIONS.length;

        questions = savedQuestionsValid ? data.questions : [...QUESTIONS];

        currentQuestion = Math.min(data.currentQuestion || 0, questions.length - 1);
        currentFlashcard = Math.min(data.currentFlashcard || 0, questions.length - 1);

        userAnswers =
            Array.isArray(data.userAnswers) && data.userAnswers.length === questions.length
                ? data.userAnswers
                : Array(questions.length).fill(null);

        secondsLeft = data.secondsLeft || 0;

        document.getElementById("timerToggle").checked = !!data.timerEnabled;
        document.getElementById("shuffleToggle").checked = !!data.shuffleEnabled;

        return true;
    } catch {
        localStorage.removeItem(STORAGE_KEY);
        return false;
    }
}

function startNewQuiz() {
    clearInterval(timer);
    localStorage.removeItem(STORAGE_KEY);
    setupQuestions();
    currentQuestion = 0;
    currentFlashcard = 0;
    userAnswers = Array(questions.length).fill(null);

    if (document.getElementById("timerToggle").checked) {
        secondsLeft = questions.length * 60;
        startTimer();
    } else {
        secondsLeft = 0;
        document.getElementById("timerDisplay").textContent = "Timer Off";
    }

    document.getElementById("resultCard").style.display = "none";
    document.getElementById("reviewCard").style.display = "none";
    document.getElementById("quizCard").style.display = "block";

    renderQuiz();
    renderFlashcard();
    saveProgress();
}

function startTimer() {
    clearInterval(timer);
    updateTimerDisplay();

    timer = setInterval(() => {
        secondsLeft--;
        updateTimerDisplay();
        saveProgress();

        if (secondsLeft <= 0) {
            clearInterval(timer);
            showFinalResult();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (!document.getElementById("timerToggle").checked) {
        document.getElementById("timerDisplay").textContent = "Timer Off";
        return;
    }

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    document.getElementById("timerDisplay").textContent =
        `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function switchMode(mode) {
    document.getElementById("quizPanel").classList.toggle("active", mode === "quiz");
    document.getElementById("flashPanel").classList.toggle("active", mode === "flash");
    document.getElementById("quizTab").classList.toggle("active", mode === "quiz");
    document.getElementById("flashTab").classList.toggle("active", mode === "flash");
    closeNavigation();
    renderQuiz();
    renderFlashcard();
}

function openNavigation() {
    const isQuizMode = document.getElementById("quizPanel").classList.contains("active");
    document.getElementById("quizNavPanel").classList.toggle("show", isQuizMode);
    document.getElementById("flashNavPanel").classList.toggle("show", !isQuizMode);
    document.getElementById("navOverlay").classList.add("show");
}

function closeNavigation() {
    document.getElementById("quizNavPanel").classList.remove("show");
    document.getElementById("flashNavPanel").classList.remove("show");
    document.getElementById("navOverlay").classList.remove("show");
}

function getScore() {
    return userAnswers.reduce((total, answer, index) => {
        return answer === questions[index].answer ? total + 1 : total;
    }, 0);
}

function renderQuizNav() {
    document.getElementById("quizNav").innerHTML = questions.map((question, index) => {
        let className = "nav-btn";

        if (userAnswers[index] !== null) {
            className += userAnswers[index] === question.answer ? " correct" : " wrong";
        }

        if (index === currentQuestion) className += " active";
        return `<button class="${className}" onclick="goToQuestion(${index})">${index + 1}</button>`;
    }).join("");
}

function renderFlashNav() {
    document.getElementById("flashNav").innerHTML = questions.map((question, index) => {
        const className = index === currentFlashcard ? "nav-btn active" : "nav-btn";
        return `<button class="${className}" onclick="goToFlashcard(${index})">${index + 1}</button>`;
    }).join("");
}

function renderQuiz() {
    const question = questions[currentQuestion];
    const letters = ["a", "b", "c", "d"];
    const answeredCount = userAnswers.filter(answer => answer !== null).length;

    document.getElementById("resultCard").style.display = "none";
    document.getElementById("reviewCard").style.display = "none";
    document.getElementById("quizCard").style.display = "block";
    document.getElementById("quizCounter").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById("scoreCounter").textContent = `Score: ${getScore()}`;
    document.getElementById("quizProgressBar").style.width = `${(answeredCount / questions.length) * 100}%`;

    document.getElementById("quizQuestionText").textContent = `Q${currentQuestion + 1}: ${question.question}`;
    document.getElementById("quizOptionsBox").innerHTML = question.options.map((option, index) => {
        const checked = userAnswers[currentQuestion] === index ? "checked" : "";
        const disabled = userAnswers[currentQuestion] !== null ? "disabled" : "";
        return `
            <label class="option">
                <input type="radio" name="answer" value="${index}" ${checked} ${disabled}>
                <span>${letters[index]}) ${option}</span>
            </label>
        `;
    }).join("");

    renderQuizNav();
    saveProgress();
}

function goToQuestion(index) {
    currentQuestion = index;
    renderQuiz();
    closeNavigation();
}

function checkAnswer() {
    if (userAnswers[currentQuestion] !== null) {
        Swal.fire({
            title: "Already answered",
            html: `<strong>Correct answer:</strong> ${questions[currentQuestion].options[questions[currentQuestion].answer]}<br><br>${questions[currentQuestion].explanation}`,
            icon: "info",
            confirmButtonColor: "#0d6efd"
        });
        return;
    }

    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        Swal.fire({
            title: "Choose an answer",
            text: "Please select an option before submitting.",
            icon: "warning",
            confirmButtonColor: "#0d6efd"
        });
        return;
    }

    const selectedAnswer = Number(selected.value);
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.answer;

    userAnswers[currentQuestion] = selectedAnswer;

    Swal.fire({
        title: isCorrect ? "Correct!" : "Incorrect",
        html: isCorrect
            ? question.explanation
            : `<strong>Correct answer:</strong> ${question.options[question.answer]}<br><br>${question.explanation}`,
        icon: isCorrect ? "success" : "error",
        confirmButtonText: currentQuestion === questions.length - 1 ? "Finish" : "Continue",
        confirmButtonColor: "#0d6efd"
    }).then(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuiz();
        } else {
            showFinalResult();
        }
    });
}

function showFinalResult() {
    clearInterval(timer);

    const total = questions.length;
    const finalScore = getScore();
    const percentage = Math.round((finalScore / total) * 100);

    document.getElementById("quizCard").style.display = "none";
    document.getElementById("reviewCard").style.display = "none";
    document.getElementById("resultCard").style.display = "block";
    document.getElementById("quizProgressBar").style.width = "100%";
    document.getElementById("quizCounter").textContent = `Completed ${total} questions`;
    document.getElementById("scoreCounter").textContent = `Final Score: ${finalScore}/${total}`;
    document.getElementById("finalScore").textContent = `${finalScore} / ${total} (${percentage}%)`;

    document.getElementById("finalMessage").textContent =
        percentage >= 80
            ? "Great work. You have a strong grasp of the material."
            : percentage >= 50
                ? "Good effort. Review your mistakes and try again."
                : "Keep practicing with flashcards, then retake the quiz.";

    renderQuizNav();
    saveProgress();
}

function showReview(onlyMistakes) {
    const items = questions.map((question, index) => {
        const userAnswer = userAnswers[index];
        const isCorrect = userAnswer === question.answer;

        if (onlyMistakes && isCorrect) return "";

        return `
            <div class="review-item ${isCorrect ? "correct" : "wrong"}">
                <strong>Q${index + 1}: ${question.question}</strong>
                <p>Your answer: ${userAnswer === null ? "Not answered" : question.options[userAnswer]}</p>
                <p>Correct answer: ${question.options[question.answer]}</p>
                <p>${question.explanation}</p>
            </div>
        `;
    }).join("");

    document.getElementById("resultCard").style.display = "none";
    document.getElementById("reviewCard").style.display = "block";
    document.getElementById("reviewCard").innerHTML = `
        <h2>${onlyMistakes ? "Review Mistakes" : "Review All Questions"}</h2>
        ${items || "<p>No mistakes to review. Excellent work.</p>"}
        <button onclick="showFinalResult()">Back to Result</button>
    `;
}

function renderFlashcard() {
    const question = questions[currentFlashcard];

    document.getElementById("flashcard").classList.remove("flipped");
    document.getElementById("flashCounter").textContent = `Card ${currentFlashcard + 1} of ${questions.length}`;
    document.getElementById("flashProgressBar").style.width = `${((currentFlashcard + 1) / questions.length) * 100}%`;
    document.getElementById("flashQuestionText").textContent = `Q${currentFlashcard + 1}: ${question.question}`;
    document.getElementById("flashAnswerText").textContent = question.options[question.answer];
    document.getElementById("flashExplanationText").textContent = question.explanation;

    renderFlashNav();
    saveProgress();
}

function flipCard() {
    document.getElementById("flashcard").classList.toggle("flipped");
}

function nextFlashcard() {
    currentFlashcard = currentFlashcard < questions.length - 1 ? currentFlashcard + 1 : 0;
    renderFlashcard();
}

function previousFlashcard() {
    currentFlashcard = currentFlashcard > 0 ? currentFlashcard - 1 : questions.length - 1;
    renderFlashcard();
}

function goToFlashcard(index) {
    currentFlashcard = index;
    renderFlashcard();
    closeNavigation();
}

function resetFlashcards() {
    currentFlashcard = 0;
    renderFlashcard();
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation();

    if (document.getElementById("flashPanel").classList.contains("active")) {
        if (event.key === "ArrowRight") nextFlashcard();
        if (event.key === "ArrowLeft") previousFlashcard();
        if (event.key === " ") {
            event.preventDefault();
            flipCard();
        }
    }
});

document.getElementById("timerToggle").addEventListener("change", startNewQuiz);
document.getElementById("shuffleToggle").addEventListener("change", startNewQuiz);

if (!loadProgress()) {
    setupQuestions();
    userAnswers = Array(questions.length).fill(null);
}

if (document.getElementById("timerToggle").checked && secondsLeft > 0) {
    startTimer();
} else {
    updateTimerDisplay();
}

renderQuiz();
renderFlashcard();

document.addEventListener("DOMContentLoaded", function () {
    const disclaimerLink = document.getElementById("disclaimerLink");

    if (disclaimerLink) {
        disclaimerLink.addEventListener("click", function (e) {
            e.preventDefault();
            showDisclaimer();
        });
    }
});

function showDisclaimer() {
    Swal.fire({
        title: 'Disclaimer',
        icon: 'info',
        html: `
            <div class="disclaimer-text">
                <p>
                    This project is an <b>independent educational resource</b> and is 
                    <b>not affiliated with, endorsed by, or connected to the Civil Aviation Authority of Singapore (CAAS)</b>.
                </p>
                <p>
                    All questions and materials provided are intended strictly for <b>practice and learning purposes only</b>. 
                    They are not official examination content and may not accurately reflect the structure, wording, or content of 
                    the actual CAAS theory examination.
                </p>
                <p>
                    Users are advised to refer to official CAAS publications, guidelines, and approved training providers for the 
                    most accurate, current, and authoritative information.
                </p>
            </div>
        `,
        confirmButtonText: 'I Understand',
        width: 600
    });
}

// ============================================
// FIXED LOGIN FUNCTION - THIS IS THE KEY PART
// ============================================
function checkAccess() {
    // Get the entered code
    const codeInput = document.getElementById("accessCode");
    const enteredCode = codeInput.value.trim();
    const correctCode = "UAPL2026";
    
    // Get elements
    const gate = document.getElementById("gate");
    const app = document.getElementById("app");
    const errorMsg = document.getElementById("errorMsg");
    
    // Check if code is correct
    if (enteredCode === correctCode) {
        // Clear any error message
        if (errorMsg) errorMsg.textContent = "";
        
        // Hide the gate with animation
        gate.style.transition = "opacity 0.3s ease";
        gate.style.opacity = "0";
        
        // After animation, hide gate and show app
        setTimeout(function() {
            gate.style.display = "none";
            app.style.display = "block";
            
            // Initialize the app after login
            if (typeof initializeApp === "function") {
                initializeApp();
            } else {
                // Refresh the quiz display
                renderQuiz();
                renderFlashcard();
            }
        }, 300);
    } else {
        // Show error message
        if (errorMsg) {
            errorMsg.textContent = "Invalid access code. Please try again.";
        }
        
        // Shake the modal for visual feedback
        const modal = document.querySelector(".gate-modal");
        if (modal) {
            modal.style.transform = "translateX(0)";
            setTimeout(function() { modal.style.transform = "translateX(-5px)"; }, 50);
            setTimeout(function() { modal.style.transform = "translateX(5px)"; }, 100);
            setTimeout(function() { modal.style.transform = "translateX(0)"; }, 150);
        }
        
        // Clear the input and focus
        codeInput.value = "";
        codeInput.focus();
    }
}

// Initialize app function
function initializeApp() {
    console.log("App initialized successfully");
    // Force a refresh of the quiz display
    if (typeof renderQuiz === "function") {
        renderQuiz();
        renderFlashcard();
    }
}

// Make sure checkAccess is available globally
window.checkAccess = checkAccess;
