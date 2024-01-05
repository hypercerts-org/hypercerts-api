export const jsonToBlob = (data: any) => {
  const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
  return blob;
};
