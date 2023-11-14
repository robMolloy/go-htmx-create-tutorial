console.log(`loaded at ${new Date().toLocaleTimeString()}`);

const delay = (val) => {
  return new Promise((res) => {
    setTimeout(() => {
      res(true);
    }, val);
  });
};

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
  const nameInput = formElement.querySelector("[name='name']");
  const nameErrorElm = formElement.querySelector("[name='name-error']");

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
  const nameElement = formElement.querySelector('[name="name"]');
  const emailElement = formElement.querySelector('[name="email"]');
  validateEmailInput();
  validateNameInput();
  const isDataValidObj = {
    name: isValidNameValue(nameElement.value),
    email: isValidEmailValue(emailElement.value),
  };

  const isValid = Object.values(isDataValidObj).every((x) => x === true);
  return isValid;
};

const submitData = async () => {
  const formElement = document.getElementById("add-contact-form");
  const nameElement = formElement?.querySelector("[name='name']");
  const emailElement = formElement?.querySelector("[name='email']");

  const data = { Name: nameElement?.value, Email: emailElement.value };
  console.log(`contacts.js:${/*LL*/ 65}`, { data });

  /************** Send to BE *******************/
  // BE validation
  // on success add to db etc then create html
  await delay(1000);
  const response = await fetch(`http://localhost:3002/add-contact`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const htmlString = await response.text();
  return htmlString;
  /*********** Send back to FE *****************/
};

const showFormLoadingSpinner = () => {
  const formElement = document.getElementById("add-contact-form");
  const spinnerElement = formElement?.querySelector("[name='spinner']");

  spinnerElement.classList.remove("hidden");
};

const hideFormLoadingSpinner = () => {
  const formElement = document.getElementById("add-contact-form");
  const spinnerElement = formElement?.querySelector("[name='spinner']");

  spinnerElement.classList.add("hidden");
};

const addHtmlToList = (htmlString) => {
  const contactListElement = document.getElementById("contact-list");
  contactListElement?.insertAdjacentHTML("beforeend", htmlString);
};

const resetForm = () => {
  const formElement = document.getElementById("add-contact-form");
  const nameElement = formElement?.querySelector("[name='name']");
  const emailElement = formElement?.querySelector("[name='email']");

  nameElement.focus();
  nameElement.value = "";
  emailElement.value = "";
};

const disableForm = () => {
  const formElement = document.getElementById("add-contact-form");
  const nameElement = formElement?.querySelector("[name='name']");
  const emailElement = formElement?.querySelector("[name='email']");
  nameElement.disabled = true;
  emailElement.disabled = true;
};

const enableForm = () => {
  const formElement = document.getElementById("add-contact-form");
  const nameElement = formElement?.querySelector("[name='name']");
  const emailElement = formElement?.querySelector("[name='email']");
  nameElement.disabled = false;
  emailElement.disabled = false;
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validateForm();

  if (isValid) {
    disableForm();
    showFormLoadingSpinner();

    const htmlString = await submitData();
    addHtmlToList(htmlString);

    enableForm();
    resetForm();
    hideFormLoadingSpinner();
  }
};
