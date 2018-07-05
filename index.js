const PRINT_SERVICE_URL = 'https://printmenow.herokuapp.com/endpoint';
const BASE_URL = 'https://lassediercks.github.io/Mutualistic';

// For local debugging
// const PRINT_SERVICE_URL = 'http://localhost:3000/endpoint';
// const BASE_URL = 'http://localhost:8000/';

const PAPER_URL = 'paper.html';
const STORY_URL = 'story.html';

const downloadLetterheadButton = document.querySelector(
  '#downloadLetterheadButton',
);

const downloadStoryButton = document.querySelector('#downloadStoryButton');

let printParams;
let params = {};

const ElementList = [
  'name',
  'street',
  'postalcode',
  'city',
  'email',
  'storyText',
  'letterRecieverName',
  'letterRecieverStreet',
  'letterRecieverPostalCode',
  'letterRecieverCity',
  'letterSubject',
  'letterDate',
  'letterContent',
];

document.addEventListener('DOMContentLoaded', function() {
  const populateTargetsFromUrlParams = (element, target, input) => {
    const val = getValueOfParam(element);

    setTargetContent(target, decodeURIComponent(val));

    if (input) {
      localStorage.setItem(element, val);
      input.value = val;
    }
  };

  function updatePrintParams(input) {
    params[input.id] = input.value;

    const toUrlString = (string, keyValue) =>
      string.concat(`${keyValue[0]}=${encodeURIComponent(keyValue[1])}&`);

    let paramAttach = Object.entries(params).reduce(toUrlString, '');

    printParams = `?${paramAttach}`;

    if (input.value || downloadLetterheadButton) {
      downloadLetterheadButton.removeAttribute('disabled');
    } else {
      downloadLetterheadButton.setAttribute('disabled', true);
    }

    return printParams;
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
      if (input) {
        input.value = localStorage.getItem(elname);
        updatePrintParams(input);
      }
    }

    if (input) {
      input.addEventListener('input', function() {
        setTargetContent(target, input.value);
        localStorage.setItem(elname, input.value);
        updatePrintParams(input);
      });
    }

    if (getValueOfParam(elname)) {
      populateTargetsFromUrlParams(elname, target, input);
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

  function createFile(body, type) {
    let types = {
      pdf: 'application/pdf',
      png: 'image/png',
    };

    const blob = new Blob([body], { type: types[type] });
    const data = window.URL.createObjectURL(blob);

    const link = document.createElement('a');

    // The actual download
    // var filename = "blah.pdf";
    link.href = data;
    link.download = `Mutualistic.${type}`;
    document.body.appendChild(link);
    link.click();
  }

  function fireDownload(url, type) {
    let options = {
      method: 'POST',
      body: JSON.stringify({ url: url, type: type }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    const setLoading = () => {
      downloadLetterheadButton.setAttribute('disabled', 'true');
      downloadLetterheadButton.classList.toggle('printbutton--loading');
    };

    fetch(PRINT_SERVICE_URL, options)
      .then(checkStatus, setLoading)
      .then((response) => response.arrayBuffer())
      .then((file) => createFile(file, type));
  }

  if (downloadLetterheadButton) {
    downloadLetterheadButton.addEventListener('click', () => {
      fireDownload(`${BASE_URL}/${PAPER_URL}${printParams}`, 'pdf');
    });
  }

  if (downloadStoryButton) {
    downloadStoryButton.addEventListener('click', () => {
      fireDownload(`${BASE_URL}/${STORY_URL}${printParams}`, 'png');
    });
  }

  ElementList.forEach(syncValue);
});
