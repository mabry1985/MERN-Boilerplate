import React, { Component } from "react";
import api from "../api";

import styled from "styled-components";

const Title = styled.h1.attrs({
  className: "h1"
})``;

const Wrapper = styled.div.attrs({
  className: "form-group"
})`
  margin: 0 30px;
`;

const Label = styled.label`
  margin: 5px;
`;

const InputText = styled.input.attrs({
  className: "form-control"
})`
  margin: 5px;
`;

const Button = styled.button.attrs({
  className: `btn btn-primary`
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
  className: `btn btn-danger`
})`
  margin: 15px 15px 15px 5px;
`;

class TutorialUpdate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      _id: this.props.match.params.id,
      title: ""
    };
  }

  handleChangeInputTitle = async event => {
    const title = event.target.value;
    this.setState({ title });
  };

  handleUpdateTutorial = async () => {
    const { _id, title } = this.state;
    const payload = { title };
    console.log(payload)
    await api.updateTutorialById(_id, payload).then(res => {
      window.alert(`Tutorial updated successfully`);
      this.setState({
        title: "",
      });
    });
  };

  componentDidMount = async () => {
    const { _id } = this.state;
    const tutorial = await api.getTutorialById(_id);
    this.setState({
      title: tutorial.data.data.title,
    });
  };

  render() {
    const { title } = this.state;
    return (
      <Wrapper>
        <Title>Update Tutorial</Title>

        <Label>Title: </Label>
        <InputText
          type="text"
          value={title}
          onChange={this.handleChangeInputTitle}
        />

        <Button onClick={this.handleUpdateTutorial}>Update Tutorial</Button>
        <CancelButton href={"/tutorials/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default TutorialUpdate;
