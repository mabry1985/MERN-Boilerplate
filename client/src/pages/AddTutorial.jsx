import React, { Component } from "react";
import api from "../api";

import styled from "styled-components";

const Title = styled.h3.attrs({
  className: "h3"
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

class AddTutorial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  handleChangeInputTitle = async event => {
    const title = event.target.value;
    this.setState({ title });
  };


  handleAddTutorial = async () => {
    const { title } = this.state;
    const payload = { title };

    await api.addTutorial(payload).then(res => {
      window.alert(`Tutorial added successfully`);
      this.setState({
        title: ""
      });
    });
  };

  render() {
    const { title } = this.state;
    return (
      <Wrapper>
        <Title>Create Tutorial</Title>

        <Label>Title: </Label>
        <InputText
          type="text"
          value={title}
          onChange={this.handleChangeInputTitle}
        />
 
        <Button onClick={this.handleAddTutorial}>Add Tutorial</Button>
        <CancelButton href={"/tutorials/list"}>Cancel</CancelButton>
      </Wrapper>
    );
  }
}

export default AddTutorial;
