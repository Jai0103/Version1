"use strict";

let questions = [];
let currentQuestion = 0;
let currentFlashcard = 0;
let userAnswers = [];
let timer = null;
let secondsLeft = 0;

const STORAGE_KEY = "uapl_mock_test_progress_v3";
const ACCESS_KEY = "uapl_mock_test_access_granted";
const ACCESS_CODE_HASH = "8a50eaec8a2f8f1619c4a58c8b16a5e22b667e6e2ee8d3928812993e75d4b5eb";

const $ = (id) => document.getElementById(id);
const getQuestionsGlobal = () => (typeof QUESTIONS !== "undefined" ? QUESTIONS : window.QUESTIONS);

function notify(options) {
    if (window.Swal && typeof window.Swal.fire === "function") {
        return window.Swal.fire(options);
    }

    const message = options.text || options.title || "Notice";
    window.alert(message);
    return Promise.resolve();
}

async function sha256(text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    return hashArray
        .map((byte) => byte.toString(16).padStart(2, "0"))
        .join("");
}

function refreshIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
        window.lucide.createIcons();
    }
}

function hasQuestions() {
    const source = getQuestionsGlobal();
    return Array.isArray(source) && source.length > 0;
}

function getQuestionBank() {
    return getQuestionsGlobal() || [];
}

function shuffleArray(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function setVisible(element, visible) {
    if (!element) return;
    element.hidden = !visible;
}

function setupQuestions() {
    const source = getQuestionBank();
    const shouldShuffle = $("shuffleToggle")?.checked;
    questions = shouldShuffle ? shuffleArray(source) : [...source];
}

function saveProgress() {
    if (!questions.length) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentQuestion,
        currentFlashcard,
        userAnswers,
        questions,
        timerEnabled: $("timerToggle").checked,
        shuffleEnabled: $("shuffleToggle").checked,
        secondsLeft
    }));
}

function loadProgress() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return false;

    try {
        const data = JSON.parse(saved);
        const source = getQuestionBank();
        const savedQuestionsValid = Array.isArray(data.questions) && data.questions.length === source.length;

        questions = savedQuestionsValid ? data.questions : [...source];
        currentQuestion = Math.min(Number(data.currentQuestion) || 0, questions.length - 1);
        currentFlashcard = Math.min(Number(data.currentFlashcard) || 0, questions.length - 1);
        userAnswers = Array.isArray(data.userAnswers) && data.userAnswers.length === questions.length
            ? data.userAnswers
            : Array(questions.length).fill(null);
        secondsLeft = Number(data.secondsLeft) || 0;

        $("timerToggle").checked = Boolean(data.timerEnabled);
        $("shuffleToggle").checked = Boolean(data.shuffleEnabled);

        return true;
    } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
        return false;
    }
}

function startNewQuiz() {
    if (!hasQuestions()) {
        showQuestionBankError();
        return;
    }

    clearInterval(timer);
    localStorage.removeItem(STORAGE_KEY);

    setupQuestions();
    currentQuestion = 0;
    currentFlashcard = 0;
    userAnswers = Array(questions.length).fill(null);
    secondsLeft = $("timerToggle").checked ? questions.length * 60 : 0;

    setVisible($("resultCard"), false);
    setVisible($("reviewCard"), false);
    setVisible($("quizCard"), true);

    if ($("timerToggle").checked) {
        startTimer();
    } else {
        updateTimerDisplay();
    }

    renderQuiz();
    renderFlashcard();
    saveProgress();
}

function startTimer() {
    clearInterval(timer);
    updateTimerDisplay();

    timer = setInterval(() => {
        secondsLeft = Math.max(0, secondsLeft - 1);
        updateTimerDisplay();
        saveProgress();

        if (secondsLeft <= 0) {
            clearInterval(timer);
            showFinalResult();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (!$("timerToggle").checked) {
        $("timerDisplay").textContent = "Timer Off";
        return;
    }

    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;
    $("timerDisplay").textContent = `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function switchMode(mode) {
    const isQuiz = mode === "quiz";

    $("quizPanel").classList.toggle("active", isQuiz);
    $("flashPanel").classList.toggle("active", !isQuiz);
    $("quizTab").classList.toggle("active", isQuiz);
    $("flashTab").classList.toggle("active", !isQuiz);
    $("quizTab").setAttribute("aria-selected", String(isQuiz));
    $("flashTab").setAttribute("aria-selected", String(!isQuiz));

    closeNavigation();

    if (questions.length) {
        renderQuiz();
        renderFlashcard();
    }

    refreshIcons();
}

function openNavigation() {
    const isQuizMode = $("quizPanel").classList.contains("active");

    $("quizNavPanel").classList.toggle("show", isQuizMode);
    $("flashNavPanel").classList.toggle("show", !isQuizMode);
    $("navOverlay").classList.add("show");
}

function closeNavigation() {
    $("quizNavPanel").classList.remove("show");
    $("flashNavPanel").classList.remove("show");
    $("navOverlay").classList.remove("show");
}

function getScore() {
    return userAnswers.reduce((total, answer, index) => {
        return answer === questions[index]?.answer ? total + 1 : total;
    }, 0);
}

function renderQuizNav() {
    $("quizNav").innerHTML = questions.map((question, index) => {
        const state = userAnswers[index] === null
            ? ""
            : userAnswers[index] === question.answer ? " correct" : " wrong";
        const active = index === currentQuestion ? " active" : "";

        return `<button class="nav-btn${state}${active}" type="button" onclick="goToQuestion(${index})">${index + 1}</button>`;
    }).join("");
}

function renderFlashNav() {
    $("flashNav").innerHTML = questions.map((_, index) => {
        const active = index === currentFlashcard ? " active" : "";

        return `<button class="nav-btn${active}" type="button" onclick="goToFlashcard(${index})">${index + 1}</button>`;
    }).join("");
}

function renderQuiz() {
    if (!questions.length) {
        showQuestionBankError();
        return;
    }

    const question = questions[currentQuestion];
    const letters = ["A", "B", "C", "D"];
    const answeredCount = userAnswers.filter((answer) => answer !== null).length;
    const accuracy = answeredCount > 0 ? Math.round((getScore() / answeredCount) * 100) : 0;
    const submitButton = $("quizCard").querySelector(".primary-btn");

    setVisible($("resultCard"), false);
    setVisible($("reviewCard"), false);
    setVisible($("quizCard"), true);

    if (submitButton) submitButton.hidden = false;

    $("quizCounter").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    $("scoreCounter").textContent = `Score: ${getScore()}`;
    $("answeredCounter").textContent = `Answered ${answeredCount} / ${questions.length}`;
    $("accuracyCounter").textContent = `Accuracy ${accuracy}%`;
    $("quizProgressBar").style.width = `${(answeredCount / questions.length) * 100}%`;
    $("answerFeedback").hidden = true;
    $("answerFeedback").innerHTML = "";
    $("quizQuestionText").textContent = `Q${currentQuestion + 1}: ${question.question}`;

    $("quizOptionsBox").innerHTML = question.options.map((option, index) => {
        const checked = userAnswers[currentQuestion] === index ? "checked" : "";
        const disabled = userAnswers[currentQuestion] !== null ? "disabled" : "";

        return `
            <label class="option">
                <input type="radio" name="answer" value="${index}" ${checked} ${disabled}>
                <span><b>${letters[index] || index + 1}</b>${option}</span>
            </label>
        `;
    }).join("");

    renderQuizNav();
    saveProgress();
    refreshIcons();
}

function goToQuestion(index) {
    currentQuestion = index;
    renderQuiz();
    closeNavigation();
}

function checkAnswer() {
    if (!questions.length) {
        showQuestionBankError();
        return;
    }

    const question = questions[currentQuestion];

    if (userAnswers[currentQuestion] !== null) {
        notify({
            title: "Already answered",
            html: `<strong>Correct answer:</strong> ${question.options[question.answer]}<br><br>${question.explanation}`,
            icon: "info",
            confirmButtonColor: "#174ea6"
        });
        return;
    }

    const selected = document.querySelector('input[name="answer"]:checked');

    if (!selected) {
        notify({
            title: "Choose an answer",
            text: "Please select an option before submitting.",
            icon: "warning",
            confirmButtonColor: "#174ea6"
        });
        return;
    }

    const selectedAnswer = Number(selected.value);
    const isCorrect = selectedAnswer === question.answer;
    const feedback = $("answerFeedback");

    userAnswers[currentQuestion] = selectedAnswer;

    document.querySelectorAll('input[name="answer"]').forEach((input) => {
        input.disabled = true;
    });

    feedback.hidden = false;
    feedback.className = `answer-feedback ${isCorrect ? "correct" : "wrong"}`;
    feedback.innerHTML = isCorrect
        ? `<strong>Correct.</strong><p>${question.explanation}</p>`
        : `<strong>Incorrect.</strong><p><b>Correct answer:</b> ${question.options[question.answer]}</p><p>${question.explanation}</p>`;

    renderQuizNav();
    saveProgress();

    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuiz();
        } else {
            showFinalResult();
        }
    }, 1400);
}

function showFinalResult() {
    if (!questions.length) {
        showQuestionBankError();
        return;
    }

    clearInterval(timer);

    const total = questions.length;
    const finalScore = getScore();
    const percentage = Math.round((finalScore / total) * 100);

    setVisible($("quizCard"), false);
    setVisible($("reviewCard"), false);
    setVisible($("resultCard"), true);

    $("quizProgressBar").style.width = "100%";
    $("quizCounter").textContent = `Completed ${total} questions`;
    $("scoreCounter").textContent = `Final Score: ${finalScore}/${total}`;
    $("answeredCounter").textContent = `Answered ${userAnswers.filter((answer) => answer !== null).length} / ${total}`;
    $("accuracyCounter").textContent = `Accuracy ${percentage}%`;
    $("finalScore").textContent = `${finalScore} / ${total} (${percentage}%)`;

    $("finalMessage").textContent = percentage >= 80
        ? "Great work. You have a strong grasp of the material."
        : percentage >= 50
            ? "Good effort. Review your mistakes and try again."
            : "Keep practicing with flashcards, then retake the quiz.";

    renderQuizNav();
    saveProgress();
    refreshIcons();
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

    setVisible($("resultCard"), false);
    setVisible($("quizCard"), false);
    setVisible($("reviewCard"), true);

    $("reviewCard").innerHTML = `
        <div class="review-header">
            <div>
                <p class="eyebrow">Review</p>
                <h2>${onlyMistakes ? "Mistakes" : "All Questions"}</h2>
            </div>
            <button class="secondary-btn" type="button" onclick="showFinalResult()">
                <i data-lucide="arrow-left"></i>
                <span>Back</span>
            </button>
        </div>
        ${items || "<p>No mistakes to review. Excellent work.</p>"}
    `;

    refreshIcons();
}

function renderFlashcard() {
    if (!questions.length) {
        showQuestionBankError();
        return;
    }

    const question = questions[currentFlashcard];

    $("flashcard").classList.remove("flipped");
    $("flashCounter").textContent = `Card ${currentFlashcard + 1} of ${questions.length}`;
    $("flashProgressBar").style.width = `${((currentFlashcard + 1) / questions.length) * 100}%`;
    $("flashQuestionText").textContent = `Q${currentFlashcard + 1}: ${question.question}`;
    $("flashAnswerText").textContent = question.options[question.answer];
    $("flashExplanationText").textContent = question.explanation;

    renderFlashNav();
    saveProgress();
}

function flipCard() {
    if (!questions.length) return;
    $("flashcard").classList.toggle("flipped");
}

function nextFlashcard() {
    if (!questions.length) return;
    currentFlashcard = currentFlashcard < questions.length - 1 ? currentFlashcard + 1 : 0;
    renderFlashcard();
}

function previousFlashcard() {
    if (!questions.length) return;
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

function showDisclaimer() {
    const gateModal = document.querySelector(".gate-modal");

    if (gateModal) {
        gateModal.style.display = "none";
    }

    notify({
        title: "Disclaimer",
        icon: "info",
        html: `
            <div class="disclaimer-text">
                <p>This project is an <b>independent educational resource</b> and is <b>not affiliated with, endorsed by, or connected to the Civil Aviation Authority of Singapore (CAAS)</b>.</p>
                <p>All questions and materials are intended strictly for <b>practice and learning purposes only</b>. They are not official examination content and may not accurately reflect the structure, wording, or content of the actual CAAS theory examination.</p>
                <p>Users should refer to official CAAS publications, guidelines, and approved training providers for the most accurate, current, and authoritative information.</p>
            </div>
        `,
        confirmButtonText: "I Understand",
        confirmButtonColor: "#174ea6",
        width: 620,
        willClose: () => {
            if (gateModal && !$("gate").hidden) {
                gateModal.style.display = "";
            }
        }
    });
}

function showQuestionBankError() {
    clearInterval(timer);
    questions = [];
    userAnswers = [];

    setVisible($("quizCard"), true);
    setVisible($("resultCard"), false);
    setVisible($("reviewCard"), false);

    $("quizCounter").textContent = "Setup Required";
    $("timerDisplay").textContent = "Timer Off";
    $("scoreCounter").textContent = "0 questions";
    $("answeredCounter").textContent = "Answered 0 / 0";
    $("accuracyCounter").textContent = "Accuracy 0%";
    $("quizProgressBar").style.width = "0%";
    $("quizQuestionText").textContent = "Question bank not loaded";
    $("quizOptionsBox").innerHTML = `
        <div class="setup-note">
            <p>Place your existing <strong>questions.js</strong> file in the same folder as <strong>index.html</strong>.</p>
            <p>The file must define <strong>const QUESTIONS = [...]</strong>. Your pasted question array is fine; it just needs to be saved as <strong>questions.js</strong>.</p>
        </div>
    `;

    const submitButton = $("quizCard").querySelector(".primary-btn");
    if (submitButton) submitButton.hidden = true;

    $("quizNav").innerHTML = "";
    $("flashNav").innerHTML = "";
    $("flashQuestionText").textContent = "Question bank not loaded";
    $("flashAnswerText").textContent = "Add questions.js beside index.html.";
    $("flashExplanationText").textContent = "";
}

function grantAccess() {
    localStorage.setItem(ACCESS_KEY, "true");
    $("gate").classList.add("leaving");

    setTimeout(() => {
        setVisible($("gate"), false);
        setVisible($("app"), true);
        initializeApp();
    }, 220);
}

async function checkAccess() {
    const codeInput = $("accessCode");
    const errorMsg = $("errorMsg");
    const enteredHash = await sha256(codeInput.value.trim());

    if (enteredHash === ACCESS_CODE_HASH) {
        errorMsg.textContent = "";
        grantAccess();
        return;
    }

    errorMsg.textContent = "Invalid access code. Please try again.";
    codeInput.value = "";
    codeInput.focus();
    $("gateForm").classList.remove("shake");
    void $("gateForm").offsetWidth;
    $("gateForm").classList.add("shake");
}

function initializeApp() {
    if (!hasQuestions()) {
        console.warn("QUESTIONS array is missing or empty. Check questions.js.");
        showQuestionBankError();
        return;
    }

    if (!loadProgress()) {
        setupQuestions();
        userAnswers = Array(questions.length).fill(null);
    }

    if ($("timerToggle").checked && secondsLeft > 0) {
        startTimer();
    } else {
        updateTimerDisplay();
    }

    renderQuiz();
    renderFlashcard();
    refreshIcons();
}

document.addEventListener("DOMContentLoaded", () => {
    refreshIcons();

    $("gateForm").addEventListener("submit", (event) => {
        event.preventDefault();
        checkAccess();
    });

    $("timerToggle").addEventListener("change", startNewQuiz);
    $("shuffleToggle").addEventListener("change", startNewQuiz);

    $("disclaimerLink").addEventListener("click", (event) => {
        event.preventDefault();
        showDisclaimer();
    });

    const gateDisclaimerLink = $("gateDisclaimerLink");
    if (gateDisclaimerLink) {
        gateDisclaimerLink.addEventListener("click", (event) => {
            event.preventDefault();
            showDisclaimer();
        });
    }

    $("flashcard").addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            event.stopPropagation();
            flipCard();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeNavigation();

        if (!$("flashPanel").classList.contains("active")) return;

        if (event.key === "ArrowRight") nextFlashcard();
        if (event.key === "ArrowLeft") previousFlashcard();

        if (event.key === " ") {
            event.preventDefault();
            flipCard();
        }
    });

    if (localStorage.getItem(ACCESS_KEY) === "true") {
        setVisible($("gate"), false);
        setVisible($("app"), true);
        initializeApp();
    } else {
        $("accessCode").focus();
    }
});

window.checkAccess = checkAccess;
window.startNewQuiz = startNewQuiz;
window.switchMode = switchMode;
window.openNavigation = openNavigation;
window.closeNavigation = closeNavigation;
window.goToQuestion = goToQuestion;
window.checkAnswer = checkAnswer;
window.showReview = showReview;
window.showFinalResult = showFinalResult;
window.flipCard = flipCard;
window.nextFlashcard = nextFlashcard;
window.previousFlashcard = previousFlashcard;
window.goToFlashcard = goToFlashcard;
window.resetFlashcards = resetFlashcards;
