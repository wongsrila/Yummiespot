function onScanSuccess(qrCodeMessage) {
  // handle the scanned code as you like, for example:
  document.getElementById('result').innerHTML =
    '<span class="result">' + qrCodeMessage + '</span>';
}

function onScanFailure(error) {
  // handle scan failure, usually better to ignore and keep scanning.
  // for example:
  // console.warn(`Code scan error = ${error}`);
}

let html5QrcodeScanner = new Html5QrcodeScanner(
  'reader',
  { fps: 10, qrbox: { width: 250, height: 250 } },
  /* verbose= */ false,
);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
