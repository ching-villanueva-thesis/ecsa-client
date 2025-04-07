const makeBlobUrl = (data) => {
  const blob = new Blob([data], {
    type: "application/json",
  });

  return URL.createObjectURL(blob);
};

export const makeBlobImageUrl = (data) => {
  const base64Data = data.split(",")[1];

  // Decode Base64 string
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Uint8Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  // Create Blob from byte array
  return URL.createObjectURL(new Blob([byteNumbers], { type: "image/png" }));
};

export default makeBlobUrl;
