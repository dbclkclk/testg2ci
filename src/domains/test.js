import { observable, action, mobx, runInAction, configure, computed, get} from "mobx";
import LoadingState from "../constants/loading";
import Question from './question';
import QuestionState from "../constants/question";
configure({ enforceActions: "observed" });

class Test {
    @observable title = "Trivia Challenge";
    @observable questions = [];
    @observable answers = [];
    @observable inProgress = null;
    @observable state = LoadingState.NONE;
    @action
    async fetchQuestions() {
        this.state = LoadingState.LOADING;
        try {
            let results = await fetch('https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean');
            let json = await results.json();
            runInAction(() => {
                this.state = LoadingState.DONE;
                this.questions = this._processingResults(json.results);
            });
        } catch (err) {
            runInAction(() => {
                this.state = LoadingState.ERROR;
            });
        }
    }
    @action 
    goToNextQuestion () {
        let result = null;
        if (this.answers.length == 0) {
            result = this.questions[0];
        } else {
            result =  this.questions[this.answers.length];
        }
        this.inProgress = result;
    }
    @action 
    answerQuestion (value) {
        let index = 0;
        if (this.answers.length > 0) {
            index =  this.answers.length;
        }
        let question = this.questions[index];
        if (question.correct_answer.toLowerCase() === value.toString().toLowerCase())
        {
            this.answers.push(true);
        } else {
            this.answers.push(false);
        }
        this.goToNextQuestion();
    }
    @action 
    reset () {
        this.answers = [];
        this.inProgress = null;
        this.goToNextQuestion();
    }
    get getCurrentQuestion()
    {
        return this.inProgress;
    }
    @computed get getQuestionState() {
        let results = QuestionState.NOT_STARTED;
        if (this.answers.length === this.questions.length) {
            results = QuestionState.COMPLETED;
        } else if (this.answers.length > 0 || this.inProgress != null) {
            results = QuestionState.STARTED
        }
        return results;
    }
    @computed get score() {
        let total = this.answers.reduce((total, current) =>  {
            if (current) {
                total = total + 1;
            }
            return total;
        }, 0);
        return total;
    }
    _processingResults(questions) {
        let results = [];
        for (let index in questions) {
            let obj = new Question(questions[index].category, questions[index].type, questions[index].difficulty, questions[index].question,questions[index].correct_answer, questions[index].incorrect_answers);
            results.push(obj);
        }
        return results;
    }
}

export default new Test();