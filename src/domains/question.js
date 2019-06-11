export default class Question {
  category = "";
  type = "";
  difficulty = "";
  question = "";
  correct_answer = false;
  incorrect_answers = [];
  constructor(category, type, difficulty, question, correctAnswer, incorrectAnswers) {
    this.category = category;
    this.type = type;
    this.difficulty = difficulty;
    this.question = question;
    this.correct_answer = correctAnswer;
    this.incorrect_answers = incorrectAnswers;
  }
}