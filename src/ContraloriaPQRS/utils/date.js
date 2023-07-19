export const strToFormattedDate = (dateStr) => {
  const dateObj = new Date(dateStr);

const day = dateObj.getDate();
const month = dateObj.getMonth() + 1;
const year = dateObj.getFullYear();

const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year.toString()}`;
return formattedDate
}

export const fechaFormateada = (fecha) => {
  const year = fecha.getFullYear();
  const month = fecha.getMonth() + 1; // Los meses van de 0 a 11, por lo que se agrega 1
  const day = fecha.getDate();

  // Formatea la fecha en una cadena con el formato 'YYYY-MM-DD'
  const fechaFormateada = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;
  return fechaFormateada;
};