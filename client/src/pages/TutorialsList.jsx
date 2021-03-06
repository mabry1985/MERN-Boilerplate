import React, { Component } from "react";
import api from "../api";
import styled from "styled-components";
import Tutorial from './Tutorial';

const Wrapper = styled.div`
  padding: 0 40px 40px 40px;
`;

class TutorialsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorials: [],
      isLoading: false
    };
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true });

    await api.getAllTutorials().then(tutorials => {
      this.setState({
        tutorials: tutorials.data.data,
        isLoading: false
      });
    });
  };

  tutorialList() {
    return this.state.tutorials.map(tutorial => {
      return (
        <Tutorial
          tutorial={tutorial}
          key={tutorial._id}
        />
      );
    });
  }

  render() {
    const { tutorials, isLoading } = this.state;
    console.log("TCL: TutorialsList -> render -> tutorials", tutorials);

    return <Wrapper>
      <h1>Tutorials</h1>
      {this.tutorialList()}
    </Wrapper>;
  }
}

export default TutorialsList;
