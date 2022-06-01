export default class Order {
  constructor(parent, required) {
    this.parent = parent;
    this.required = required;
    this.inputs = this.parent.querySelectorAll("input");
    this.phoneInputs = this.parent.querySelectorAll("input[type=tel]");
  }

  init() {
    // for inputs with phone (type="tel")
    this.phoneInputs.forEach((i) => i.addEventListener("input", this.formatPhone));

    this.parent.addEventListener("submit", (event) => {
      event.preventDefault();
      this.submit();
    });
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

  submit() {
    if (this.error) this.removeError();

    // checking required fields
    if (this.required.every((f) => [...this.inputs].find((i) => i.name === f).value.trim() === "")) {
      this.showError("Пожалуйста, укажите email или телефон");
    }

    console.log("submit");
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
}
