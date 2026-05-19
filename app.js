// Global variables
let questions = [];
let currentQuestion = 0;
let currentFlashcard = 0;
let userAnswers = [];
let timer = null;
let secondsLeft = 0;
let isQuizComplete = false;

const STORAGE_KEY = "uapl_mock_test_v6";

// Utility functions
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupQuestions() {
    const shouldShuffle = document.getElementById("shuffleToggle").checked;
    questions = shouldShuffle ? shuffleArray([...QUESTIONS]) : [...QUESTIONS];
}

// Progress management
function saveProgress() {
    const progress = {
        currentQuestion,
        currentFlashcard,
        userAnswers,
        questions,
        timerEnabled: document.getElementById("timerToggle").checked,
        shuffleEnabled: document.getElementById("shuffleToggle").checked,
        secondsLeft,
        isQuizComplete
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;

    try {
        const data = JSON.parse(saved);
        
        if (data.questions && data.questions.length === QUESTIONS.length) {
            questions = data.questions;
            currentQuestion = Math.min(data.currentQuestion || 0, questions.length - 1);
            currentFlashcard = Math.min(data.currentFlashcard || 0, questions.length - 1);
            userAnswers = data.userAnswers || Array(questions.length).fill(null);
            secondsLeft = data.secondsLeft || 0;
            isQuizComplete = data.isQuizComplete || false;
            
            document.getElementById("timerToggle").checked = data.timerEnabled || false;
            document.getElementById("shuffleToggle").checked = data.shuffleEnabled || false;
            
            return true;
        }
    } catch (e) {
        console.warn("Failed to load progress:", e);
    }
    
    localStorage.removeItem(STORAGE_KEY);
    return false;
}

function clearProgress() {
    localStorage.removeItem(STORAGE_KEY);
    setupQuestions();
    currentQuestion = 0;
    currentFlashcard = 0;
    userAnswers = Array(questions.length).fill(null);
    isQuizComplete = false;
    
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
}

// Timer functions
function startTimer() {
    if (timer) clearInterval(timer);
    
    updateTimerDisplay();
    
    timer = setInterval(() => {
        if (secondsLeft > 0) {
            secondsLeft--;
            updateTimerDisplay();
            saveProgress();
            
            if (secondsLeft === 0) {
                clearInterval(timer);
                Swal.fire({
                    title: "Time's Up!",
                    text: "Your quiz time has expired.",
                    icon: "warning",
                    confirmButtonColor: "#0d6efd"
                }).then(() => showFinalResult());
            }
        }
    }, 1000);
}

function updateTimerDisplay() {
    const timerToggle = document.getElementById("timerToggle");
    const timerDisplay = document.getElementById("timerDisplay");
    
    if (!timerToggle.checked) {
        timerDisplay.textContent = "Timer Off";
        return;
    }
    
    if (secondsLeft <= 0) {
        timerDisplay.textContent = "0:00";
        return;
    }
    
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Quiz functions
function startNewQuiz() {
    clearProgress();
    
    if (document.getElementById("timerToggle").checked) {
        secondsLeft = questions.length * 60;
        startTimer();
    } else {
        secondsLeft = 0;
        updateTimerDisplay();
    }
    
    document.getElementById("resultCard").style.display = "none";
    document.getElementById("reviewCard").style.display = "none";
    document.getElementById("quizCard").style.display = "block";
    
    renderQuiz();
    renderFlashcard();
    saveProgress();
}

function getScore() {
    return userAnswers.reduce((score, answer, idx) => {
        return answer === questions[idx].answer ? score + 1 : score;
    }, 0);
}

function renderQuiz() {
    if (isQuizComplete) {
        showFinalResult();
        return;
    }
    
    const question = questions[currentQuestion];
    const answeredCount = userAnswers.filter(a => a !== null).length;
    const letters = ["A", "B", "C", "D"];
    
    document.getElementById("quizCounter").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById("scoreCounter").textContent = `Score: ${getScore()}`;
    document.getElementById("quizProgressBar").style.width = `${(answeredCount / questions.length) * 100}%`;
    document.getElementById("quizQuestionText").textContent = `${currentQuestion + 1}. ${question.question}`;
    
    const optionsHtml = question.options.map((opt, idx) => {
        const isChecked = userAnswers[currentQuestion] === idx;
        const isDisabled = userAnswers[currentQuestion] !== null;
        return `
            <label class="option">
                <input type="radio" name="answer" value="${idx}" ${isChecked ? "checked" : ""} ${isDisabled ? "disabled" : ""}>
                <span>${letters[idx]}) ${opt}</span>
            </label>
        `;
    }).join("");
    
    document.getElementById("quizOptionsBox").innerHTML = optionsHtml;
    renderQuizNav();
    saveProgress();
}

function renderQuizNav() {
    const navHtml = questions.map((q, idx) => {
        let classes = ["nav-btn"];
        if (userAnswers[idx] !== null) {
            classes.push(userAnswers[idx] === q.answer ? "correct" : "wrong");
        }
        if (idx === currentQuestion) classes.push("active");
        return `<button class="${classes.join(" ")}" onclick="goToQuestion(${idx})">${idx + 1}</button>`;
    }).join("");
    
    document.getElementById("quizNav").innerHTML = navHtml;
}

function goToQuestion(index) {
    currentQuestion = index;
    renderQuiz();
    closeNavigation();
}

function checkAnswer() {
    if (userAnswers[currentQuestion] !== null) {
        Swal.fire({
            title: "Already Answered",
            html: `<strong>Correct answer:</strong> ${questions[currentQuestion].options[questions[currentQuestion].answer]}<br><br>${questions[currentQuestion].explanation}`,
            icon: "info",
            confirmButtonColor: "#0d6efd"
        });
        return;
    }
    
    const selected = document.querySelector('input[name="answer"]:checked');
    if (!selected) {
        Swal.fire({
            title: "No Answer Selected",
            text: "Please select an answer before submitting.",
            icon: "warning",
            confirmButtonColor: "#0d6efd"
        });
        return;
    }
    
    const selectedAnswer = parseInt(selected.value);
    const question = questions[currentQuestion];
    const isCorrect = selectedAnswer === question.answer;
    
    userAnswers[currentQuestion] = selectedAnswer;
    
    Swal.fire({
        title: isCorrect ? "✓ Correct!" : "✗ Incorrect",
        html: `<strong>${question.options[question.answer]}</strong><br><br>${question.explanation}`,
        icon: isCorrect ? "success" : "error",
        confirmButtonText: currentQuestion === questions.length - 1 ? "See Results" : "Next Question",
        confirmButtonColor: "#0d6efd"
    }).then(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuiz();
        } else {
            showFinalResult();
        }
    });
    
    renderQuizNav();
    saveProgress();
}

function showFinalResult() {
    isQuizComplete = true;
    if (timer) clearInterval(timer);
    
    const score = getScore();
    const total = questions.length;
    const percentage = Math.round((score / total) * 100);
    
    let message = "";
    if (percentage >= 80) message = "Excellent! You've mastered the material. 🎓";
    else if (percentage >= 60) message = "Good job! Review your mistakes and try again. 📚";
    else message = "Keep practicing! Use flashcards and retake the quiz. 💪";
    
    document.getElementById("quizCard").style.display = "none";
    document.getElementById("resultCard").style.display = "block";
    document.getElementById("quizProgressBar").style.width = "100%";
    document.getElementById("finalScore").innerHTML = `<strong>${score} / ${total}</strong> (${percentage}%)`;
    document.getElementById("finalMessage").textContent = message;
    
    saveProgress();
}

function showReview(onlyMistakes) {
    const reviewItems = questions.map((q, idx) => {
        const userAnswer = userAnswers[idx];
        const isCorrect = userAnswer === q.answer;
        
        if (onlyMistakes && isCorrect) return "";
        
        return `
            <div class="review-item ${isCorrect ? "correct" : "wrong"}">
                <strong>Q${idx + 1}: ${q.question}</strong>
                <p style="margin-top: 8px;"><strong>Your answer:</strong> ${userAnswer !== null ? q.options[userAnswer] : "Not answered"}</p>
                <p><strong>Correct answer:</strong> ${q.options[q.answer]}</p>
                <p><strong>Explanation:</strong> ${q.explanation}</p>
            </div>
        `;
    }).join("");
    
    document.getElementById("resultCard").style.display = "none";
    document.getElementById("reviewCard").style.display = "block";
    document.getElementById("reviewCard").innerHTML = `
        <h2>${onlyMistakes ? "📝 Review Your Mistakes" : "📖 Review All Questions"}</h2>
        ${reviewItems || "<p>🎉 Perfect! No mistakes to review.</p>"}
        <button class="secondary-btn" onclick="showFinalResult()" style="margin-top: 20px;">← Back to Results</button>
    `;
}

// Flashcard functions
function renderFlashcard() {
    const question = questions[currentFlashcard];
    
    document.getElementById("flashcard").classList.remove("flipped");
    document.getElementById("flashCounter").textContent = `Card ${currentFlashcard + 1} of ${questions.length}`;
    document.getElementById("flashProgressBar").style.width = `${((currentFlashcard + 1) / questions.length) * 100}%`;
    document.getElementById("flashQuestionText").textContent = `${currentFlashcard + 1}. ${question.question}`;
    document.getElementById("flashAnswerText").textContent = question.options[question.answer];
    document.getElementById("flashExplanationText").textContent = question.explanation;
    
    renderFlashNav();
    saveProgress();
}

function renderFlashNav() {
    const navHtml = questions.map((_, idx) => {
        const activeClass = idx === currentFlashcard ? "active" : "";
        return `<button class="nav-btn ${activeClass}" onclick="goToFlashcard(${idx})">${idx + 1}</button>`;
    }).join("");
    
    document.getElementById("flashNav").innerHTML = navHtml;
}

function flipCard() {
    document.getElementById("flashcard").classList.toggle("flipped");
}

function nextFlashcard() {
    currentFlashcard = (currentFlashcard + 1) % questions.length;
    renderFlashcard();
}

function previousFlashcard() {
    currentFlashcard = currentFlashcard === 0 ? questions.length - 1 : currentFlashcard - 1;
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

// Navigation functions
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

function switchMode(mode) {
    const isQuiz = mode === "quiz";
    document.getElementById("quizPanel").classList.toggle("active", isQuiz);
    document.getElementById("flashPanel").classList.toggle("active", !isQuiz);
    document.getElementById("quizTab").classList.toggle("active", isQuiz);
    document.getElementById("flashTab").classList.toggle("active", !isQuiz);
    closeNavigation();
    
    if (isQuiz) {
        renderQuiz();
    } else {
        renderFlashcard();
    }
}

// Disclaimer
function showDisclaimer() {
    Swal.fire({
        title: "📜 Disclaimer",
        icon: "info",
        html: `
            <div style="text-align: left; line-height: 1.6;">
                <p><strong>Independent Educational Resource</strong></p>
                <p>This mock test is an <strong>independent educational resource</strong> and is <strong>not affiliated with, endorsed by, or connected to</strong> the Civil Aviation Authority of Singapore (CAAS).</p>
                <br>
                <p>All questions are for <strong>practice purposes only</strong> and may not reflect the actual CAAS theory examination.</p>
                <br>
                <p>Refer to official CAAS publications and approved training providers for authoritative information.</p>
            </div>
        `,
        confirmButtonText: "I Understand",
        confirmButtonColor: "#0d6efd"
    });
}

// Login / Access Gate - FIXED VERSION
function checkAccess() {
    const codeInput = document.getElementById("accessCode");
    const code = codeInput.value.trim();
    const correctCode = "UAPL2026";
    const gate = document.getElementById("gate");
    
    if (code === correctCode) {
        // Smooth transition - hide gate and show app
        gate.style.transition = "opacity 0.3s ease, transform 0.3s ease";
        gate.style.opacity = "0";
        gate.style.transform = "scale(0.95)";
        
        setTimeout(() => {
            gate.style.display = "none";
            document.getElementById("app").style.display = "block";
            initializeApp();
        }, 300);
    } else {
        // Show error message without alert popup
        const errorMsg = document.getElementById("errorMsg");
        errorMsg.textContent = "Invalid access code. Please try again.";
        errorMsg.style.color = "#d93025";
        
        // Shake animation for the modal
        const modal = document.querySelector
