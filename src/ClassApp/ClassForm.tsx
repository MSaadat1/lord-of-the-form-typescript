import { Component } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isNameValidation } from "../utils/transformations";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import ClassPhoneInput from "./ClassPhoneInput";
import { ClassTextInput } from "./ClassText";
import { formatPhoneNumber } from "../utils/transformations";
import { Props } from "../types";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export class ClassForm extends Component<Props> {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    cityNames: "",
    phoneInput: ["", "", "", ""],
    isFormSubmitted: false,
    isValid: false as false | string,
  };

  reset = () => {
    this.setState({
      firstName: "",
      lastName: "",
      emailAddress: "",
      cityNames: "",
      phoneInput: ["", "", "", ""],
    });
  };

  handleChangePhoneInput = (input: string[]) => {
    this.setState({
      ...this.state,
      phoneInput: input,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    this.setState({
      isFormSubmitted: true,
    });
    const {
      firstName,
      lastName,
      emailAddress,
      cityNames,
      phoneInput,
      isFormSubmitted,
    } = this.state;
    const isValid: string | false = isFormSubmitted ? "true" : false;

    this.props.onSubmit(
      {
        firstName,
        lastName,
        emailAddress,
        cityNames,
        phoneInput: formatPhoneNumber(phoneInput),
      },
      isValid
    );
    if (isValid) {
      this.setState({
        isFormSubmitted: false,
      });
      this.reset();
    }
  };
  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      cityNames,
      phoneInput,
      isFormSubmitted,
    } = this.state;

    const firstNameValid = isNameValidation(firstName);
    const lastNameValid = isNameValidation(lastName);
    const emailValid = isEmailValid(emailAddress);
    const cityValid = isCityValid(cityNames);
    const phoneValid = formatPhoneNumber(phoneInput);

    const showFirstName = isFormSubmitted && !firstNameValid;
    const showLastName = isFormSubmitted && !lastNameValid;
    const showEmail = isFormSubmitted && !emailValid;
    const showCity = isFormSubmitted && !cityValid;
    const showPhone = isFormSubmitted && !phoneValid;
    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <div className="input-wrap">
          <ClassTextInput
            inputProps={{
              placeholder: "Bilbo",
              value: firstName,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ firstName: e.target.value });
              },
            }}
            label={"First Name"}
          />
        </div>

        {showFirstName && (
          <ErrorMessage message={firstNameErrorMessage} show={true} />
        )}

        {/* last name input */}
        <div className="input-wrap">
          <ClassTextInput
            inputProps={{
              placeholder: "Baggins",
              value: firstName,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ lastName: e.target.value });
              },
            }}
            label={"Last Name"}
          />
        </div>
        {showLastName && (
          <ErrorMessage message={lastNameErrorMessage} show={true} />
        )}

        {/* Email Input */}
        <div className="input-wrap">
          <ClassTextInput
            inputProps={{
              placeholder: "bilbo-baggins@adventurehobbits.net",
              value: emailAddress,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ emailAddress: e.target.value });
              },
            }}
            label={"Email"}
          />
        </div>
        {showEmail && <ErrorMessage message={emailErrorMessage} show={true} />}

        {/* City Input */}
        <div className="input-wrap">
          <ClassTextInput
            inputProps={{
              list: "cityList",
              placeholder: "Hobbiton",
              value: cityNames,
              onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                this.setState({ cityNames: e.target.value });
              },
            }}
            label={"City"}
          />
           {/* if I remove the datalist, the drop down icon won't appear inside the input after I refresh the page */}
          <datalist id="cityList">
            {allCities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
        </div>
        {showCity && <ErrorMessage message={cityErrorMessage} show={true} />}

        <div>
          <ClassPhoneInput
            phoneInput={this.state.phoneInput}
            handleChangePhone={this.handleChangePhoneInput}
          />
        </div>
        {showPhone && (
          <ErrorMessage message={phoneNumberErrorMessage} show={true} />
        )}

        <input type="submit" value="Submit" />
      </form>
    );
  }
}
