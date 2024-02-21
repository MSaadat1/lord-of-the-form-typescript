export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isCityValid(city: string) {
  return /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]+$/.test(city);
}
