import React from "react";
import api from "../api";
import styled from "styled-components";

const Update = styled.div`
  color: #ef9b0f;
  cursor: pointer;
`;

const Delete = styled.div`
  color: #ff0000;
  cursor: pointer;
`;

const Tutorial = props => {
  const { title, _id } = props.tutorial;

  const deleteTutorial = event => {
    event.preventDefault();

    if (
      window.confirm(`Do you want to delete the tutorial ${title} permanently?`)
    ) {
      api.deleteTutorialById(_id);
      window.location.reload();
    }
  };
  
  const updateTutorial = e => {
    e.preventDefault();

    window.location.href = `/tutorials/update/${_id}`;
  };

  return (
    <div className="container">
      <h5>{title}</h5>
      <Update onClick={updateTutorial}>Update</Update>
      <Delete onClick={deleteTutorial}>Delete</Delete>
    </div>
  );
};

export default Tutorial