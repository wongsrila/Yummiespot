const dataResult = document.querySelector('#result');
const stopScanning = document.querySelector('#stop-scanning');
const startScanning = document.querySelector('#start-scanning');

// function onScanSuccess(decodedText) {
//   fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`)
//     .then((response) => response.json())
//     .then((data) => dataInfo(data));
// }

// function onScanFailure(error) {}

// let html5QrcodeScanner = new Html5QrcodeScanner(
//   'reader',
//   { fps: 20, qrbox: { width: 250, height: 250 } },
//   false,
// );
// html5QrcodeScanner.render(onScanSuccess, onScanFailure);

// function dataInfo(data) {
//   console.log(data);
//   dataResult.innerHTML = data.product.brands;
// }

startScanning.addEventListener('click', () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        var cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode('reader');
        html5QrCode
          .start(
            cameraId,
            {
              fps: 10,
              qrbox: { width: 250, height: 250 },
            },
            (decodedText) => {
              console.log(decodedText);
              dataResult.innerHTML = decodedText;
            },
            (errorMessage) => {},
          )
          .catch((err) => {
            console.log(err);
          });

        stopScanning.addEventListener('click', () => {
          html5QrCode
            .stop()
            .then((ignore) => {
              // QR Code scanning is stopped.
            })
            .catch((err) => {
              // Stop failed, handle it.
            });
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
