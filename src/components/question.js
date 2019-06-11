import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {inject, observer, Provider} from "mobx-react";
import QuestionState from "../constants/question";
import Question from "./question";
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardFooter, Button, Input, Label } from 'reactstrap';
import Helper from "../helpers/html";

@inject("testStore")
@observer 
export default class QuestionComponent extends React.Component {
  render() {
    let question = this.props.testStore.getCurrentQuestion;
    return (
             <Card>
                <CardBody>
                    <CardTitle><h2 className="text-center">{question.category}</h2></CardTitle>
                    <CardText>                    
                        {Helper.renderHTML(question.question)}
                        <br />
                        <br />
                        <span className="text-center">
                            <b>{this.props.testStore.answers.length + 1} of {this.props.testStore.questions.length}</b>
                        </span>
                    </CardText>
                </CardBody>
                <CardFooter>
                    <Button color="primary" onClick={() => this.props.testStore.answerQuestion(true)}>True</Button>{' '}
                    <Button color="danger" onClick={() => this.props.testStore.answerQuestion(false)}>False</Button>{' '}
                </CardFooter>
            </Card>
      );
  }
}

