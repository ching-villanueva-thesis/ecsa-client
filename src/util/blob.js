const makeBlobUrl = (data) => {
  const blob = new Blob([data], {
    type: "application/json",
  });

  return URL.createObjectURL(blob);
};

export default makeBlobUrl;
