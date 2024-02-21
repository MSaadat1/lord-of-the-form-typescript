import { Component } from "react";
import { TextInputProps } from "../types";

export  class ClassTextInput extends Component<TextInputProps>{
    render() {
        const { label, inputProps } = this.props;
        return (
          <div className="input-wrap">
            <label>{label}:</label>
            <input type="text" {...inputProps} />
          </div>
        );
      }
}