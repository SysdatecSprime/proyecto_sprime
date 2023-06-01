export const MONTH = [
  {
    id: 1,
    value: "01",
    text: "Enero",
  },
  {
    id: 2,
    value: "02",
    text: "Febrero",
  },
  {
    id: 3,
    value: "03",
    text: "Marzo",
  },
  {
    id: 4,
    value: "04",
    text: "Abril",
  },
  {
    id: 5,
    value: "05",
    text: "Mayo",
  },
  {
    id: 6,
    value: "06",
    text: "Junio",
  },
  {
    id: 7,
    value: "07",
    text: "Julio",
  },
  {
    id: 8,
    value: "08",
    text: "Agosto",
  },
  {
    id: 9,
    value: "09",
    text: "Septiembre",
  },
  {
    id: 10,
    value: "10",
    text: "Octubre",
  },
  {
    id: 11,
    value: "11",
    text: "Noviembre",
  },
  {
    id: 12,
    value: "12",
    text: "Diciembre",
  },
];

// transformación del objeto month que muestre los meses disponibles hasta la fecha actual
const currentMonth = new Date().getMonth() + 1;

export const MONTH_CURRENT = MONTH.filter((item) => {
  return item.id <= currentMonth;
});

export const requerimientosPorDependencia = [
  {
    name: "Secretaría de Educación",
    requerimientos: 200,
  },
  {
    name: "Secretaría de Salud",
    requerimientos: 300,
  },
  {
    name: "Secretaría de Hacienda",
    requerimientos: 500,
  },
  {
    name: "Secretaría de Movilidad",
    requerimientos: 50,
  },
  {
    name: "Otros",
    requerimientos: 50,
  },
];

export const requerimientosPorDependenciaHistoria = [
  {
    "Secretaría de Educación": 100,
    "Secretaría de Salud": 200,
    "Secretaría de Hacienda": 400,
    "Secretaría de Movilidad": 80,
    Otros: 10,
    Total: 790,
    Mes: "Enero",
  },
  {
    "Secretaría de Educación": 130,
    "Secretaría de Salud": 280,
    "Secretaría de Hacienda": 310,
    "Secretaría de Movilidad": 90,
    Otros: 70,
    Total: 880,
    Mes: "Febrero",
  },
  {
    "Secretaría de Educación": 195,
    "Secretaría de Salud": 290,
    "Secretaría de Hacienda": 490,
    "Secretaría de Movilidad": 20,
    Otros: 25,
    Total: 1020,
    Mes: "Marzo",
  },
  {
    "Secretaría de Educación": 150,
    "Secretaría de Salud": 250,
    "Secretaría de Hacienda": 450,
    "Secretaría de Movilidad": 55,
    Otros: 50,
    Total: 955,
    Mes: "Abril",
  },
  {
    "Secretaría de Educación": 200,
    "Secretaría de Salud": 300,
    "Secretaría de Hacienda": 500,
    "Secretaría de Movilidad": 50,
    Otros: 50,
    Total: 1100,
    Mes: "Mayo",
  },
];

export const requerimientosRecibidosPorTipoDeSolicitud = [
  {
    name: "Petición de interés general",
    requerimientos: 500,
  },
  {
    name: "Petición de interés particular",
    requerimientos: 270,
  },
  {
    name: "Petición de documentos",
    requerimientos: 140,
  },
  {
    name: "Petición de información pública",
    requerimientos: 50,
  },
  {
    name: "Consulta",
    requerimientos: 40,
  },
  {
    name: "Reclamo",
    requerimientos: 20,
  },
  {
    name: "Sugerencia",
    requerimientos: 10,
  },
  {
    name: "Denuncia",
    requerimientos: 10,
  },
];

export const valoresAleatorios = Array(12)
  .fill(0)
  .map((_, idx) => ({
    name: `Mes ${idx + 1}`,
    "Petición de interés general": (5 + Math.random() * 2 - 0.3 * idx).toFixed(
      2
    ),
    "Petición de interés particular": (
      5 +
      Math.random() * 2 -
      0.1 * idx
    ).toFixed(2),
    "Petición de documentos": (5 + Math.random() * 2 - 0.15 * idx).toFixed(2),
    "Petición de información pública": (
      5 +
      Math.random() * 3 -
      0.15 * idx
    ).toFixed(2),
    Consulta: (5 + Math.random() * 2 - 0.15 * idx).toFixed(2),
    Reclamo: (5 + Math.random() * 2 - 0.15 * idx).toFixed(2),
    Sugerencia: (5 + Math.random() * 2 - 0.15 * idx).toFixed(2),
    Denuncia: (5 + Math.random() * 2 - 0.15 * idx).toFixed(2),
  }));

export const datosDeRequerimientosRecibidos = [
  {
    name: "Atendidos",
    requerimientos: 70,
  },
  {
    name: "En Proceso",
    requerimientos: 65,
  },
];

export const datosDeGestionRealizadaDeRequerimientos = [
  {
    name: "Atendidos",
    requerimientos: 80,
  },
  {
    name: "Cancelados",
    requerimientos: 10,
  },
  {
    name: "En Proceso",
    requerimientos: 20,
  },
];

export const datosDeEstadoRequerimientoEnProceso = [
  {
    name: "Vigentes",
    requerimientos: 40,
  },
  {
    name: "Vencidos",
    requerimientos: 10,
  },
];
