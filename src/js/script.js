// function onScanSuccess(qrCodeMessage) {
//   document.getElementById('result').innerHTML =
//     '<span class="result">' + qrCodeMessage + '</span>';
// }

// function onScanFailure(error) {}

// let html5QrcodeScanner = new Html5QrcodeScanner(
//   'reader',
//   { fps: 10, qrbox: { width: 250, height: 250 } },
//   false,
// );
// html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// BARCODE API
function onScanSuccess(decodedText, decodedResult) {
  // console.log(`Code matched = ${decodedText}`, decodedResult);
  fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`)
    .then((response) => response.json())
    .then((data) => console.log(data));
}

function onScanFailure(error) {
  // console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  'reader',
  { fps: 20, qrbox: { width: 250, height: 250 } },
  false,
);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// FOOD API
