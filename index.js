document.addEventListener("DOMContentLoaded", function() {
  let nameInput = document.querySelector("#name");
  let nameTarget = document.querySelector("#nameTarget");

  syncValue(nameInput, nameTarget);

  let titleInput = document.querySelector("#title");
  let titleTarget = document.querySelector("#titleTarget");

  syncValue(titleInput, titleTarget);

  let streetInput = document.querySelector("#street");
  let streetTarget = document.querySelector("#streetTarget");

  syncValue(streetInput, streetTarget);

  let postalcodeInput = document.querySelector("#postalcode");
  let postalcodeTarget = document.querySelector("#postalcodeTarget");

  syncValue(postalcodeInput, postalcodeTarget);

  let cityInput = document.querySelector("#city");
  let cityTarget = document.querySelector("#cityTarget");

  syncValue(cityInput, cityTarget);

  let emailInput = document.querySelector("#email");
  let emailTarget = document.querySelector("#emailTarget");

  syncValue(emailInput, emailTarget);

  function syncValue(input, target) {
    if (localStorage.getItem(target.id)) {
      target.innerHTML = localStorage.getItem(target.id);
    }

    input.addEventListener("input", function() {
      target.innerHTML = input.value;
      localStorage.setItem(target.id, input.value);
    });
  }
});
