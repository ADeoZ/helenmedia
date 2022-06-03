export default class Order {
  constructor(parent, required) {
    this.parent = parent;
    this.required = required;
    this.inputs = this.parent.querySelectorAll("input");
    this.buttons = this.parent.querySelectorAll("button");
    this.phoneInputs = this.parent.querySelectorAll("input[type=tel]");
  }

  init() {
    // for inputs with phone (type="tel")
    this.phoneInputs.forEach((input) => input.addEventListener("input", this.formatPhone));

    this.parent.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submit();
    });
  }

  submit() {
    if (this.error) this.removeError();

    if (this.checkingFields()) {
      this.showError("Пожалуйста, укажите email или телефон");
      return;
    }

    // try to sending
    this.sendForm()
      .then((response) => {
        if (response['result'] === 'success') {
          this.disableFields();
          this.showSuccess();
        } else {
          throw Error;
        }
      })
      .catch(() => {
        this.showError("Ошибка отправки");
      });
  }

  // checking required fields
  checkingFields() {
    return this.required.every((f) => [...this.inputs].find((i) => i.name === f).value.trim() === "");
  }

  // sending form
  async sendForm() {
    const formData = new FormData();
    this.inputs.forEach(input => formData.append(input.name, input.value));

    const response = await fetch('https://frontden.com/php/formSending.php', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      return response.json();
    } else {
      throw Error("Ошибка статуса ответа");
    }
  }

  // success block
  showSuccess() {
    // create element
    const success = document.createElement("div");
    success.classList.add("form__success");
    success.innerHTML = "Сообщение отправлено.<br>Скоро свяжемся!";

    // replace element
    this.parent.append(success);
  }

  // error block
  showError(text) {
    // create element
    this.error = document.createElement("div");
    this.error.classList.add("form__error");
    this.error.innerText = text;

    // apply element
    this.parent.append(this.error);
  }

  removeError() {
    this.error.remove();
  }

  // clearing fields
  clearFields() {
    this.inputs.forEach(input => input.value = "");
  }

  // disabling fields
  disableFields() {
    this.inputs.forEach(input => input.disabled = true);
    this.buttons.forEach(button => button.remove());
  }

  // formatting phone to (999) 999-99-99
  formatPhone(event) {
    // allow only digits
    event.target.value = event.target.value.replace(/\D/g, "");

    // formatting
    const input = event.target.value;
    const areaCode = input.substring(0, 3);
    const first = input.substring(3, 6);
    const middle = input.substring(6, 8);
    const last = input.substring(8, 10);

    if (input.length > 8) {
      event.target.value = `(${areaCode}) ${first}-${middle}-${last}`;
    } else if (input.length > 6) {
      event.target.value = `(${areaCode}) ${first}-${middle}`;
    } else if (input.length > 3) {
      event.target.value = `(${areaCode}) ${first}`;
    } else if (input.length > 0) {
      event.target.value = `(${areaCode}`;
    }
  }
}
