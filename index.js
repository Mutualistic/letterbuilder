document.addEventListener("DOMContentLoaded", function() {
  let nameInput = document.querySelector("#name");
  let nameTarget = document.querySelector("#nameTarget");

  nameInput.addEventListener("input", function() {
    updateValue(this.value, nameTarget);
  });

  if (localStorage.getItem(nameTarget.id)) {
    updateValue(nameInput.value, nameTarget);
  }

  let titleInput = document.querySelector("#title");
  let titleTarget = document.querySelector("#titleTarget");

  titleInput.addEventListener("input", function() {
    updateValue(this.value, titleTarget);
  });

  if (localStorage.getItem(titleTarget.id)) {
    updateValue(titleInput.value, titleTarget);
  }

  let streetInput = document.querySelector("#street");
  let streetTarget = document.querySelector("#streetTarget");

  streetInput.addEventListener("input", function() {
    updateValue(this.value, streetTarget);
  });

  if (localStorage.getItem(streetTarget.id)) {
    updateValue(streetInput.value, streetTarget);
  }

  let postalcodeInput = document.querySelector("#postalcode");
  let postalcodeTarget = document.querySelector("#postalcodeTarget");

  postalcodeInput.addEventListener("input", function() {
    updateValue(this.value, postalcodeTarget);
  });

  if (localStorage.getItem(postalcodeTarget.id)) {
    updateValue(postalcodeInput.value, postalcodeTarget);
  }

  let cityInput = document.querySelector("#city");
  let cityTarget = document.querySelector("#cityTarget");

  cityInput.addEventListener("input", function() {
    updateValue(this.value, cityTarget);
  });

  if (localStorage.getItem(cityTarget.id)) {
    updateValue(cityInput.value, cityTarget);
  }

  let emailInput = document.querySelector("#email");
  let emailTarget = document.querySelector("#emailTarget");

  emailInput.addEventListener("input", function() {
    updateValue(this.value, emailTarget);
  });

  if (localStorage.getItem(emailTarget.id)) {
    updateValue(emailInput.value, emailTarget);
  }

  function updateValue(val, target) {
    target.innerHTML = val;
    localStorage.setItem(target.id, val);
  }
});
