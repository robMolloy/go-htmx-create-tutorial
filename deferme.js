console.log(`loaded at ${new Date().toLocaleTimeString()}`);

const isValidEmailValue = (val) => {
  if (!val.includes("@")) return "email value must contain an @ symbol.";
  const minLength = 5;
  if (val.length < minLength)
    return `email value must be at least ${minLength} characters.`;
  return true;
};
const isValidNameValue = (val) => {
  const minLength = 3;
  if (val.length < minLength)
    return `name value must be at least ${minLength} characters.`;
  return true;
};

const validateNameInput = () => {
  const formElement = document.getElementById("add-contact-form");
  const nameInput = formElement.querySelector('[name="name"]');
  const nameErrorElm = formElement.querySelector('[name="name-error"]');

  const nameError = isValidNameValue(nameInput.value);
  nameErrorElm.innerHTML = nameError === true ? "" : nameError;
};

const validateEmailInput = () => {
  const formElement = document.getElementById("add-contact-form");
  const emailInput = formElement.querySelector('[name="email"]');
  const emailErrorElm = formElement.querySelector('[name="email-error"]');

  const emailError = isValidEmailValue(emailInput.value);
  emailErrorElm.innerHTML = emailError === true ? "" : emailError;
};

const validateForm = () => {
  const formElement = document.getElementById("add-contact-form");
  const nameElement = formElement.querySelector("[name='name']");
  const emailElement = formElement.querySelector("[name='email']");
  validateEmailInput();
  validateNameInput();
  const isDataValidObj = {
    name: isValidNameValue(nameElement.value),
    email: isValidEmailValue(emailElement.value),
  };

  const isValid = Object.values(isDataValidObj).every((x) => x === true);
  return isValid;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const formElement = document.getElementById("add-contact-form");
  const nameElement = formElement.querySelector("[name='name']");
  const emailElement = formElement.querySelector("[name='email']");

  const data = { name: nameElement.value, email: emailElement.value };

  const isValid = validateForm();

  if (isValid) {
    /************** Send to BE *******************/
    // Add to db
    // on success create html string and send back
    const htmlString = `<li class="mb-1 bg-red-100">${data.name} - ${data.email}</li>`;
    /*********** Send back to FE *****************/

    const contactListElement = document.getElementById("contact-list");
    contactListElement.insertAdjacentHTML("beforeend", htmlString);
    nameElement.value = "";
    emailElement.value = "";
  }
};
