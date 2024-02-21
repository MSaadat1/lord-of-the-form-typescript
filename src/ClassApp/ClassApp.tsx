import { Component } from "react";
import { ClassForm } from "./ClassForm";
import { UserInformation, ClassAppState, SubmitHandler } from "../types";
import { ProfileInformation } from "../ProfileInformation";

export class ClassApp extends Component<UserInformation, ClassAppState> {
  state: ClassAppState = {
    userData: null,
  };
  handleSubmitApp: SubmitHandler = (formData, isValid) => {
    if (isValid) {
      this.setState((prevState) => ({
        userData: { ...prevState.userData, ...formData },
      }));
    } else {
      alert("Correct the input and try again!");
    }
  };
  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation userData={this.state.userData} />
        <ClassForm onSubmit={this.handleSubmitApp} />
      </>
    );
  }
}
