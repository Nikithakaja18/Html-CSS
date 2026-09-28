const state = { exam: null, current: 0, answers: {}, secondsLeft: 0, timerId: null };
const $ = (selector) => document.querySelector(selector);
const views = { landing: $('#landing-view'), exam: $('#exam-view'), result: $('#result-view') };

async function loadExam(subject) {
  const response = await fetch(`/api/exam/${encodeURIComponent(subject)}`);
  if (!response.ok) throw new Error('Unable to load the assessment.');
  state.exam = await response.json();
}

async function loadSubjects() {
  const response = await fetch('/api/subjects');
  if (!response.ok) throw new Error('Unable to load subjects.');
  const subjects = await response.json();
  const grid = $('#subject-grid');
  grid.innerHTML = '';

  subjects.forEach((subject) => {
    const button = document.createElement('a');
    button.className = 'subject-card';
    button.href = `/quiz/${encodeURIComponent(subject.slug)}`;
    button.setAttribute('aria-label', `Start ${subject.title} assessment`);

    const title = document.createElement('span');
    title.className = 'subject-card-title';
    title.textContent = subject.title;
    const details = document.createElement('span');
    details.className = 'subject-card-details';
    details.textContent = `${subject.totalQuestions} questions · ${subject.durationMinutes} min`;
    const arrow = document.createElement('span');
    arrow.className = 'subject-card-arrow';
    arrow.setAttribute('aria-hidden', 'true');
    arrow.textContent = '→';

    button.append(title, details, arrow);
    grid.appendChild(button);
  });
}

async function startSubject(subject) {
  const errorMessage = $('#subject-error');
  errorMessage.classList.add('hidden');

  try {
    await loadExam(subject);
    state.current = 0;
    state.answers = {};
    $('#exam-title').textContent = state.exam.title;
    $('#exam-eyebrow').textContent = `Assessment / ${state.exam.totalQuestions} questions`;
    showView('exam');
    renderQuestion();
    startTimer();
  } catch (error) {
    errorMessage.textContent = error.message;
    errorMessage.classList.remove('hidden');
    showView('landing');
  }
}

function showView(name) {
  Object.values(views).forEach((view) => view.classList.add('hidden'));
  views[name].classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function formatTime(seconds) {
  const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
  const remaining = String(seconds % 60).padStart(2, '0');
  return `${minutes}:${remaining}`;
}

function renderMap() {
  const map = $('#question-map');
  map.innerHTML = '';
  state.exam.questions.forEach((question, index) => {
    const button = document.createElement('button');
    button.className = 'map-button';
    if (index === state.current) button.classList.add('active');
    if (state.answers[question.id] !== undefined) button.classList.add('answered');
    button.textContent = String(index + 1).padStart(2, '0');
    button.setAttribute('aria-label', `Go to question ${index + 1}`);
    button.addEventListener('click', () => { state.current = index; renderQuestion(); });
    map.appendChild(button);
  });
  const answered = Object.keys(state.answers).length;
  $('#answered-count').textContent = `${answered} / ${state.exam.totalQuestions}`;
  $('#progress-bar').style.width = `${((state.current + 1) / state.exam.totalQuestions) * 100}%`;
}

function renderQuestion() {
  const question = state.exam.questions[state.current];
  $('#question-topic').textContent = question.topic.toUpperCase();
  $('#question-difficulty').textContent = question.difficulty.toUpperCase();
  $('#question-number').textContent = String(state.current + 1).padStart(2, '0');
  $('#question-text').textContent = question.text;
  $('#answer-list').innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'answer-option';
    if (state.answers[question.id] === index) button.classList.add('selected');
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${option}</span>`;
    button.addEventListener('click', () => {
      state.answers[question.id] = index;
      renderQuestion();
    });
    $('#answer-list').appendChild(button);
  });
  $('#back-button').style.visibility = state.current === 0 ? 'hidden' : 'visible';
  $('#next-button').innerHTML = state.current === state.exam.totalQuestions - 1 ? 'Submit assessment <span aria-hidden="true">&#8594;</span>' : 'Next question <span aria-hidden="true">&#8594;</span>';
  renderMap();
}

function startTimer() {
  clearInterval(state.timerId);
  state.secondsLeft = state.exam.durationMinutes * 60;
  $('#timer').textContent = formatTime(state.secondsLeft);
  state.timerId = setInterval(() => {
    state.secondsLeft -= 1;
    $('#timer').textContent = formatTime(Math.max(0, state.secondsLeft));
    if (state.secondsLeft <= 60) $('#timer').style.color = 'var(--coral)';
    if (state.secondsLeft <= 0) { clearInterval(state.timerId); submitExam(); }
  }, 1000);
}

async function submitExam() {
  clearInterval(state.timerId);
  const response = await fetch('/api/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject: state.exam.slug, answers: state.answers }) });
  if (!response.ok) throw new Error('Unable to submit the assessment.');
  const result = await response.json();
  renderResult(result);
}

function renderResult(result) {
  $('.result-header .eyebrow').textContent = `Assessment complete / ${result.title}`;
  $('#result-percentage').textContent = `${result.percentage}%`;
  $('#result-status').textContent = result.passed ? 'PASSED' : 'KEEP PRACTICING';
  $('#result-status').style.color = result.passed ? 'var(--green)' : 'var(--coral)';
  $('#result-message').textContent = result.passed ? `Strong work. You have a solid grasp of ${result.title}.` : 'A useful first pass. Review the breakdown below and try again when ready.';
  $('#correct-stat').textContent = `${result.score} / ${result.total}`;
  $('#answered-stat').textContent = `${result.answered} / ${result.total}`;
  $('#score-stat').textContent = `${result.score} points`;
  $('#review-list').innerHTML = result.results.map((item, index) => {
    const selected = item.selected === null ? 'Not answered' : `Option ${String.fromCharCode(65 + item.selected)}`;
    const correct = `Option ${String.fromCharCode(65 + item.correctAnswer)}`;
    return `<article class="review-item ${item.correct ? '' : 'incorrect'}"><div class="review-top"><span>${String(index + 1).padStart(2, '0')} / ${item.topic}</span><strong>${item.correct ? 'Correct' : 'Review'}</strong></div><p>${item.text}</p><small>Your answer: ${selected} &nbsp;&middot;&nbsp; Correct answer: ${correct}<br>${item.explanation}</small></article>`;
  }).join('');
  showView('result');
}

$('#back-button').addEventListener('click', () => { if (state.current > 0) { state.current -= 1; renderQuestion(); } });
$('#next-button').addEventListener('click', () => { if (state.current < state.exam.totalQuestions - 1) { state.current += 1; renderQuestion(); } else { submitExam(); } });
$('#restart-button').addEventListener('click', () => { state.current = 0; state.answers = {}; showView('exam'); renderQuestion(); startTimer(); });

async function initialize() {
  const match = window.location.pathname.match(/^\/quiz\/([^/]+)\/?$/);
  if (match) {
    await startSubject(decodeURIComponent(match[1]));
    return;
  }

  try {
    await loadSubjects();
  } catch (error) {
    $('#subject-error').textContent = error.message;
    $('#subject-error').classList.remove('hidden');
  }
}

initialize();
