import  {RefObject} from "react";

export type UserInformation = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  cityNames: string;
  phoneInput: string | string[];
};

export interface ClassAppState {
  userData: UserInformation | null;
}

export type FunctionalComponentProps = {
  phoneInput: string[];
  updateHandler: React.Dispatch<React.SetStateAction<string[]>>;
};

export type SubmitHandler = (formData: FormData, isValid: string| false) => void;

export interface Props {
  onSubmit: SubmitHandler;
}

export type FormData = {
  firstName: string;
  lastName: string;
  emailAddress: string;
  cityNames: string;
  phoneInput: string | string[];
};

type ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

export interface TextInputProps {
  inputProps: {
    placeholder: string;
    value: string;
    onChange: ChangeHandler;
    list?: string
  };
  label: string;
}

export interface PropClass {
  phoneInput: string[];
  handleChangePhone: (input: string[]) => void;
  phoneInputs?: string[]
}

export interface State {
   phoneInputs: string[];
  refs: RefObject<HTMLInputElement>[];
}