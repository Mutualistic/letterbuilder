// const PRINT_SERVICE_URL = 'https://printmenow.herokuapp.com/endpoint';
// const BASE_URL = 'https://lassediercks.github.io/sistente';

const PRINT_SERVICE_URL = 'http://localhost:3000/endpoint';
const BASE_URL = 'http://localhost:8000';

const printButton = document.querySelector('#printbutton');

let urlForPrintservice;
let params = {};

const ElementList = [
  'name',
  'title',
  'street',
  'postalcode',
  'city',
  'email',
  'storyText',
];

document.addEventListener('DOMContentLoaded', function() {
  ElementList.forEach(syncValue);

  function updatePrintLink(input) {
    params[input.id] = input.value;

    const toUrlString = (string, keyValue) =>
      string.concat(`${keyValue[0]}=${encodeURIComponent(keyValue[1])}&`);

    let paramAttach = Object.entries(params).reduce(toUrlString, '');

    urlForPrintservice = `${BASE_URL}/?${paramAttach}`;

    if (input.value) {
      printButton.removeAttribute('disabled');
    } else {
      printButton.setAttribute('disabled', true);
    }

    return urlForPrintservice;
  }

  function setTargetContent(target, value) {
    if (target.length) {
      target.forEach((el) => {
        el.innerHTML = value;
      });
    } else {
      target.innerHTML = value;
    }
  }

  function syncValue(elname) {
    let input = document.querySelector(`#${elname}`);
    let target = document.querySelectorAll(`[data-target=${elname}]`);

    if (localStorage.getItem(elname)) {
      setTargetContent(target, localStorage.getItem(elname));
      input.value = localStorage.getItem(elname);
      updatePrintLink(input);
    }

    input.addEventListener('input', function() {
      setTargetContent(target, input.value);
      localStorage.setItem(elname, input.value);
      updatePrintLink(input);
    });

    if (getValueOfParam(input.id)) {
      let val = decodeURIComponent(getValueOfParam(input.id));
      setTargetContent(target, val);
    }
  }

  function getValueOfParam(name) {
    let url = window.location.search.substring(1);
    let vars = url.split('&');

    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split('=');

      if (pair[0] == name) {
        return pair[1];
      }
    }
  }

  const checkStatus = (response) => {
    if (response.ok && response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    }
    console.log('rejected');
    return Promise.reject(response);
  };

  function createPdf(body) {
    const blob = new Blob([body], { type: 'application/pdf' });
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    // The actual download
    // var filename = "blah.pdf";
    link.href = data;
    link.download = 'letterhead.pdf';
    document.body.appendChild(link);
    link.click();
  }

  function downloadPdf(url) {
    let options = {
      method: 'POST',
      body: JSON.stringify({ url: url }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    const setLoading = () => {
      console.log('loading fired');
      printButton.setAttribute('disabled', 'true');
      printButton.classList.toggle('printbutton--loading');
    };

    fetch(PRINT_SERVICE_URL, options)
      .then(checkStatus, setLoading)
      .then((response) => response.arrayBuffer())
      .then(createPdf);
  }

  printButton.addEventListener('click', () => {
    downloadPdf(urlForPrintservice);
  });
});
