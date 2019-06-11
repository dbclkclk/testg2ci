import React from "react";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimes, faCheck} from '@fortawesome/free-solid-svg-icons';
import OverlayLoader from 'react-overlay-loading/lib/OverlayLoader';
import Style from "./css/app.css";
import {inject, observer, Provider} from "mobx-react";
import LoadingState from "./constants/loading";
import TestComponent from "./components/test";
import { Alert, Container, Row, Col } from 'reactstrap';

library.add(faTimes, faCheck);

@inject("testStore")
@observer
export default class App extends React.Component {
  constructor(props) {
    super(props);
  }
  async componentDidMount() {
    await this.props.testStore.fetchQuestions();
  }
  render() {
      let html = (<div></div>);
      if (this.props.testStore.state === LoadingState.DONE) {
        html =(<Provider testStore={this.props.testStore}><TestComponent /></Provider>);
      } else if (this.props.testStore.state === LoadingState.ERROR) {
        html = (<Alert color="danger">There was an issue fetching records</Alert>);
      }
      if (this.props.testStore.state === LoadingState.LOADING) {
      return (
         <OverlayLoader 
              color={'red'} 
              loader="ScaleLoader"
              text="Loading... Please wait!" 
              active={true} 
              backgroundColor={'black'} 
              opacity=".9">
               <Container>
                <Row>
                  <Col xs="12" sm="12">
                    <div className="loader-overlay">
                    </div>
                  </Col>
                </Row>
              </Container>
          </OverlayLoader>
      );
    } else {
       return (<Container>
                <Row>
                  <Col xs="3" sm="3">
                  </Col>
                  <Col xs="6" sm="6">
                    {html}
                  </Col>
                </Row>
        </Container>
       )
    };
  }
}