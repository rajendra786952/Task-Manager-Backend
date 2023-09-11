function isImageFile(filename) {
    const fileExtension = filename.split('.').pop().toLowerCase();
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
    return imageExtensions.includes(fileExtension);
  }

module.exports = { isImageFile };