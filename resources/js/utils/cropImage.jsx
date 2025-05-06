export const getCroppedImg = (imageSrc, pixelCrop, cropWidth = 340, cropHeight = 450) => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.src = imageSrc;
        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = cropWidth;
            canvas.height = cropHeight;
            const ctx = canvas.getContext("2d");

            ctx.drawImage(
                image,
                pixelCrop.x,
                pixelCrop.y,
                pixelCrop.width,
                pixelCrop.height,
                0,
                0,
                cropWidth,
                cropHeight
            );

            canvas.toBlob((blob) => {
                if (!blob) {
                    reject(new Error("Canvas is empty"));
                    return;
                }
                resolve(blob);
            }, "image/jpeg");
        };
        image.onerror = (e) => reject(e);
    });
};
