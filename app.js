"use strict";

let questions = [];
let currentQuestion = 0;
let currentFlashcard = 0;
let userAnswers = [];
let timer = null;
let secondsLeft = 0;

const STORAGE_KEY = "uapl_mock_test_progress_v3";
const ACCESS_KEY = "uapl_mock_test_access_granted";
const ACCESS_CODE = "UAPL2026";

const $ = (id) => document.getElementById(id);
const getQuestionsGlobal = () => (typeof QUESTIONS !== "undefined" ? QUESTIONS : window.QUESTIONS);

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
