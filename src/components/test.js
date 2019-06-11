import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {inject, observer, Provider} from "mobx-react";
import QuestionState from "../constants/question";
import QuestionComponent from "./question";
import style from "../css/test.css"
import { Button, Container, Row, Col, Card, CardImg, CardText, CardBody,
  CardTitle, CardFooter, ListGroup, ListGroupItem} from 'reactstrap';
import Helper from "../helpers/html";

@inject("testStore")
@observer 
export default class TestComponent extends React.Component {
  render() {     
    let questionState = this.props.testStore.getQuestionState;
    let html = null;
    if (questionState ===QuestionState.NOT_STARTED) {
        html = (<Introduction testStore={this.props.testStore} />);
    } else if (questionState === QuestionState.STARTED) {
        html = (<Provider testStore={this.props.testStore}><QuestionComponent /></Provider>);
    } else {
        html = (<Final testStore={this.props.testStore} />);
    }
    return (
        <Container>
            <Row>
                {html}
            </Row>
        </Container>
      );
  }
}

const Introduction = ({testStore})=>{
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <h2 className="text-center">Welcome to the</h2>
                    <h3 className="text-center">{testStore.title}!</h3>
                </CardTitle>
                <CardText>
                    <span>
                        You will be presented with {testStore.questions.length} True or Flase questions.
                    </span>
                    <br />
                    <span>
                        Can you score 100%?
                    </span>
                </CardText>
            </CardBody>
            <CardFooter>
                    <Button color="primary" onClick={() => testStore.goToNextQuestion()}>BEGIN</Button>
            </CardFooter>
        </Card>
    )
};

const Final = ({testStore})=>{
    
    return (
        <Card>
            <CardBody>
                <CardTitle>
                    <h2 className="text-center">You Scored</h2>
                    <h3 className="text-center">{testStore.score}/{testStore.questions.length}</h3>
                </CardTitle>
                <CardText tag="div">
                    <ListGroup flush>
                    {testStore.questions.map((question, index) =>{
                        return ( <ListGroupItem key={index} color={testStore.answers[index] ? "success" : "danger"}><span className="float-left"><FontAwesomeIcon icon={testStore.answers[index] ? "check" : "times"} /></span>&nbsp; &nbsp;{Helper.renderHTML(question.question)}</ListGroupItem>);
                      })}
                    </ListGroup>
                </CardText>
            </CardBody>
            <CardFooter>
                <Button color="primary" onClick={() => testStore.reset()}>PLAY AGAIN?</Button>
            </CardFooter>
        </Card>
    )
};