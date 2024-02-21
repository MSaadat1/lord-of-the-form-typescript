import { TextInputProps } from "../types";

const FunctionalTextInput: React.FC<TextInputProps> = ({ label, inputProps }) => {
  return (
    <div className="input-wrap">
      <label>{label}:</label>
      <input type="text" {...inputProps} />
    </div>
  );
};

export default FunctionalTextInput;
