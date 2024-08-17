export function downloadFile(filename, data, mimeType) {
  const a = window.document.createElement('a');

  a.href = window.URL.createObjectURL(new Blob([data], { type: mimeType }));
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  document.body.removeChild(a);
}
