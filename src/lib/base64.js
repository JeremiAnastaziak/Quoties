export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          resolve(reader.result)
        };
        reader.onerror = function (error) {
          reject(error);
        };
    })
}

export const getImageDimension = (imageFile) => {
    return new Promise(resolve => {
        const img = new Image;
        img.onload = function() {
            const { width, height } = img;
            resolve({ width, height });
        }
        img.src = URL.createObjectURL(imageFile);
    })
}
