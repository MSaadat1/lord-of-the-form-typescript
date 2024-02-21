import { useState } from "react";
import { ProfileInformation } from "../ProfileInformation";
import { FunctionalForm } from "./FunctionalForm";
import { SubmitHandler, UserInformation } from "../types";

export const FunctionalApp = () => {
  const [userData, setUserData] = useState<UserInformation | null>(null);
  const handleSubmitApp: SubmitHandler = (formData, isValid) => {
    if (isValid) {
      setUserData(formData);
    } else {
      alert("Correct the input and try again!");
    }
  };
  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={userData} />
      <FunctionalForm onSubmit={handleSubmitApp} />
    </>
  );
};
