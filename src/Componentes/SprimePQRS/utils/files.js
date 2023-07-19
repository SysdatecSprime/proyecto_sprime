export function FileListToBase64List(fileList) {
  return new Promise((resolve, reject) => {
    const base64List = [];
    for (let i = 0; i < fileList.length; i++) {
      const reader = new FileReader();
      reader.readAsDataURL(fileList[i]);
      reader.onload = () => {
        base64List.push(reader.result);
        if (base64List.length === fileList.length) {
          resolve(base64List);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
    }
  });
}

export function Base64ListToUrlList(list) {
  if (!list || list.length === 0) return [];
  return list.map((file) => {
    return base64ToUrl(file.nombre, file.base64);
  });
}

export function getFileType(fileName) {
  const extension = fileName.split(".").pop();
  let tipo;
  switch (extension) {
    case "png":
      tipo = "image/png";
      break;
    case "jpg":
    case "jpeg":
      tipo = "image/jpeg";
      break;
    case "gif":
      tipo = "image/gif";
      break;
    case "pdf":
      tipo = "application/pdf";
      break;
    case "doc":
      tipo = "text/doc";
      break;
    case "docx":
      tipo = "application/msword";
      break;
    case "xls":
      tipo = "application/vnd.ms-excel";
      break;
    case "xlsx":
      tipo =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      break;
    case "zip":
      tipo = "application/zip";
      break;
    case "rar":
      tipo = "application/x-rar-compressed";
      break;
    case "tif":
      tipo = "image/tiff";
      break;
    case "mp3":
      tipo = "audio/mpeg";
      break;
    case "mp4":
      tipo = "video/mp4";
      break;
    default:
      tipo = "application/octet-stream";
  }

  return tipo;
}

export function base64ToUrl(fileName, base64) {
  // Convertir el contenido base64 a un arreglo de bytes
  var byteCharacters = atob(base64);
  const type = getFileType(fileName);

  // Convertir el arreglo de bytes a un arreglo de tipo Uint8
  var byteNumbers = new Array(byteCharacters.length);
  for (var i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  var byteArray = new Uint8Array(byteNumbers);

  // Crear un objeto Blob con el arreglo de bytes
  var blob = new Blob([byteArray], {type});

  var url = URL.createObjectURL(blob);

  return {url, name: fileName};
}

export const validateFiles = (files, fileType) => {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!fileType.includes(file.type)) {
      return false;
    }
  }
  return true;
};
