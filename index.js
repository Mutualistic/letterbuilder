const PRINT_SERVICE_URL = "https://printmenow.herokuapp.com";
const BASE_URL = "https://lassediercks.github.io/sistente";

const printButton = document.querySelector("#printbutton");

document.addEventListener("DOMContentLoaded", function() {
  const nameInput = document.querySelector("#name");
  const nameTarget = document.querySelector("#nameTarget");

  syncValue(nameInput, nameTarget);

  const titleInput = document.querySelector("#title");
  const titleTarget = document.querySelector("#titleTarget");

  syncValue(titleInput, titleTarget);

  const streetInput = document.querySelector("#street");
  const streetTarget = document.querySelector("#streetTarget");

  syncValue(streetInput, streetTarget);

  const postalcodeInput = document.querySelector("#postalcode");
  const postalcodeTarget = document.querySelector("#postalcodeTarget");

  syncValue(postalcodeInput, postalcodeTarget);

  const cityInput = document.querySelector("#city");
  const cityTarget = document.querySelector("#cityTarget");

  syncValue(cityInput, cityTarget);

  const emailInput = document.querySelector("#email");
  const emailTarget = document.querySelector("#emailTarget");

  syncValue(emailInput, emailTarget);

  function syncValue(input, target) {
    if (localStorage.getItem(target.id)) {
      target.innerHTML = localStorage.getItem(target.id);
    }

    input.addEventListener("input", function() {
      target.innerHTML = input.value;
      localStorage.setItem(target.id, input.value);
      updatePrintLink(input);
    });

    if (getValueOfParam(input.id)) {
      target.innerHTML = getValueOfParam(input.id).replace("ASPACE", " ");
    }
  }
});

let params = {};

const updatePrintLink = input => {
  params[input.id] = input.value;

  const toUrlString = (string, keyValue) =>
    string.concat(`${keyValue[0]}=${keyValue[1]}&`);

  let paramAttach = Object.entries(params).reduce(toUrlString, "");
  let urlForPrintservice = encodeURIComponent(
    `${BASE_URL}?${paramAttach.replace(" ", "ASPACE")}`
  );

  console.log(urlForPrintservice);

  printButton.setAttribute(
    "href",
    `${PRINT_SERVICE_URL}/${urlForPrintservice}`
  );
};

function getValueOfParam(name) {
  let url = window.location.search.substring(1);
  let vars = url.split("&");

  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");

    if (pair[0] == name) {
      return pair[1];
    }
  }
}
