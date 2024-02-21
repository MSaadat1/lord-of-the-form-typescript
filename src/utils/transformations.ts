export const isNameValidation = (name:string) => {
    return /^[a-zA-Z]+$/.test(name) && name.length > 2;
}

export const formatPhoneNumber = (phone: string[]): string => {
    if (phone.every((part: string) => part !== "" && /^\d+$/.test(part))) {
        return phone.join("-");
      } else {
        return "";
      }
}