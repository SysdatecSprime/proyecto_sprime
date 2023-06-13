const data = [
  {
    name: "Entregado",
    sales: 156,
  },
  {
    name: "Pendiente",
    sales: 80,
  },
  {
    name: "Respondido",
    sales: 325,
  },
];
const dataDep1 = [
  {
    name: "Entregado",
    sales: 98,
  },
  {
    name: "Pendiente",
    sales: 31,
  },
  {
    name: "Respondido",
    sales: 124,
  },
];
const dataDep2 = [
  {
    name: "Entregado",
    sales: 47,
  },
  {
    name: "Pendiente",
    sales: 14,
  },
  {
    name: "Respondido",
    sales: 56,
  },
];
const dataDep3 = [
  {
    name: "Entregado",
    sales: 27,
  },
  {
    name: "Pendiente",
    sales: 16,
  },
  {
    name: "Respondido",
    sales: 178,
  },
];

export const mailStateChartData = {
  0: data,
  1: dataDep1,
  2: dataDep2,
  3: dataDep3,
};

export const mailTableData = [
  {
      receptor: "Manuel Castillo",
      emisor: "Yormelys Yanez",
      dependencia:
          "Dependencia 1",
      status: "Respondido",
  },
  {
      receptor: "Jhons Garret",
      emisor: "Yormelys Yanez",
      dependencia:
          "Dependencia 2",
      status: "Entregado",
  },
  {
      receptor: "AndrÃ©s Daza",
      emisor: "Yormelys Yanez",
      dependencia:
          "Dependencia 2",
      status: "Pendiente",
  },
  {
      receptor: "Jairo Pitta",
      emisor: "Yormelys Yanez",
      dependencia:
          "Dependencia 3",
      status: "Pendiente",
  },
  {
      receptor: "Horacio",
      emisor: "Yormelys Yanez",
      dependencia:
          "Dependencia 2",
      status: "Entregado",
  },
  {
      receptor: "Juan Grajales",
      emisor: "Yormelys Yanez",
      dependencia:
          "Dependencia 2",
      status: "Respondido",
  },
];
