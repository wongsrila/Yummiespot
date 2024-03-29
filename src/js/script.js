const dataResult = document.querySelector('#result');
const stopScanning = document.querySelector('#stop-scanning');
const startScanning = document.querySelector('#start-scanning');

function dataInfo(data) {
  if (data.status === 0) {
    dataResult.innerHTML = 'bestaat niet swa';
  } else {
    dataResult.innerHTML = data.product.product_name;
  }
}

startScanning.addEventListener('click', () => {
  Html5Qrcode.getCameras()
    .then((devices) => {
      if (devices && devices.length) {
        const cameraId = devices[0].id;
        const html5QrCode = new Html5Qrcode('reader');
        html5QrCode
          .start(
            cameraId,
            {
              fps: 20,
              qrbox: { width: 600, height: 400 },
              facingMode: 'environment',
            },
            (decodedText) => {
              fetch(
                `https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`,
              )
                .then((response) => response.json())
                .then((data) => dataInfo(data))
                .catch((error) => {
                  console.error('There was an error!', error);
                });
            },
            (errorMessage) => {
              // console.error(errorMessage);
            },
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
