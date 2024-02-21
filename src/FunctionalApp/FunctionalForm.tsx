import { useState } from "react";
import { ErrorMessage } from "../ErrorMessage";
import { isNameValidation } from "../utils/transformations";
import { isEmailValid } from "../utils/validations";
import { isCityValid } from "../utils/validations";
import { allCities } from "../utils/all-cities";
import { formatPhoneNumber } from "../utils/transformations";
import { Props } from "../types";
import FunctionalPhoneInputs from "./FunctionalPhoneInput";
import FunctionalTextInput from "./FunctionalTextInput";

const firstNameErrorMessage = "First name must be at least 2 characters long";
const lastNameErrorMessage = "Last name must be at least 2 characters long";
const emailErrorMessage = "Email is Invalid";
const cityErrorMessage = "State is Invalid";
const phoneNumberErrorMessage = "Invalid Phone Number";

export const FunctionalForm: React.FC<Props> = ({ onSubmit }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [cityNames, setCityNames] = useState<string>("");
  const [phoneInput, setPhoneInput] = useState<string[]>(["", "", "", ""]);

  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const reset: () => void = () => {
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setCityNames("");
    setPhoneInput(["", "", "", ""]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const isValid =
      firstNameValid && lastNameValid && emailValid && cityValid && phoneValid;

    onSubmit(
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
      setIsFormSubmitted(false);
      reset();
    }
  };

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
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            placeholder: "Bilbo",
            value: firstName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setFirstName(e.target.value);
            },
          }}
          label={"First Name"}
        />
      </div>

      {showFirstName && (
        <ErrorMessage message={firstNameErrorMessage} show={true} />
      )}

      {/* last name input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            placeholder: "Baggins",
            value: lastName,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setLastName(e.target.value);
            },
          }}
          label={"Last Name"}
        />
      </div>

      {showLastName && (
        <ErrorMessage message={lastNameErrorMessage} show={true} />
      )}

      {/* Email Input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            placeholder: "bilbo-baggins@adventurehobbits.net",
            value: emailAddress,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setEmailAddress(e.target.value);
            },
          }}
          label={"Email"}
        />
      </div>

      {showEmail && <ErrorMessage message={emailErrorMessage} show={true} />}
      {/* City Input */}
      <div>
        <FunctionalTextInput
          inputProps={{
            list: "cityList",
            placeholder: "Hobbiton",
            value: cityNames,
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setCityNames(e.target.value);
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
        <FunctionalPhoneInputs
          phoneInput={phoneInput}
          updateHandler={setPhoneInput}
        />
      </div>

      {showPhone && (
        <ErrorMessage message={phoneNumberErrorMessage} show={true} />
      )}

      <input type="submit" value="Submit" />
    </form>
  );
};
