const express = require('express');
const path = require('path');
const { defaultExam, subjectExams } = require('./questionBank');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

function findExam(slug) {
  return slug === defaultExam.slug ? defaultExam : subjectExams[slug];
}

function publicExam(exam) {
  return {
    slug: exam.slug,
    title: exam.title,
    subtitle: exam.subtitle,
    durationMinutes: exam.durationMinutes,
    totalQuestions: exam.questions.length,
    questions: exam.questions.map(({ answer, explanation, ...question }) => question)
  };
}

app.get('/api/subjects', (req, res) => {
  res.json(Object.values(subjectExams).map(({ slug, title, subtitle, durationMinutes, questions }) => ({
    slug,
    title,
    subtitle,
    durationMinutes,
    totalQuestions: questions.length
  })));
});

app.get('/api/exam', (req, res) => {
  res.json(publicExam(defaultExam));
});

app.get('/api/exam/:subject', (req, res) => {
  const exam = findExam(req.params.subject);
  if (!exam) return res.status(404).json({ error: 'Subject not found.' });
  res.json(publicExam(exam));
});

app.get('/quiz/:subject', (req, res) => {
  if (!findExam(req.params.subject) || req.params.subject === defaultExam.slug) {
    return res.status(404).send('Subject not found.');
  }
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/submit', (req, res) => {
  const body = req.body || {};
  const submittedAnswers = body.answers;

  if (!submittedAnswers || typeof submittedAnswers !== 'object' || Array.isArray(submittedAnswers)) {
    return res.status(400).json({ error: 'answers must be an object keyed by question id.' });
  }

  const subject = body.subject || defaultExam.slug;
  const exam = findExam(subject);
  if (!exam) return res.status(400).json({ error: 'Subject not found.' });

  const results = exam.questions.map((question) => {
    const submitted = submittedAnswers[question.id];
    const isAnswered = Number.isInteger(submitted);
    const correct = isAnswered && submitted === question.answer;

    return {
      id: question.id,
      topic: question.topic,
      text: question.text,
      selected: isAnswered ? submitted : null,
      correctAnswer: question.answer,
      correct,
      explanation: question.explanation
    };
  });

  const score = results.filter((result) => result.correct).length;
  const answered = results.filter((result) => result.selected !== null).length;
  const percentage = Math.round((score / exam.questions.length) * 100);

  res.json({
    subject: exam.slug,
    title: exam.title,
    score,
    total: exam.questions.length,
    percentage,
    answered,
    unanswered: exam.questions.length - answered,
    passed: percentage >= 70,
    results
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Online examination system running at http://localhost:${PORT}`);
});
