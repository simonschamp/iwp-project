let jsonQuery = {
  query: [
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Toimiala",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Sukupuoli",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
  ],
  response: {
    format: "json-stat2",
  },
};

let jsonQuery2 = {
  query: [
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Sukupuoli",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Ikäryhmitys",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Ammattiryhmä",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Koulutusaste",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
        ],
      },
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["ERIHAKIJAVV"],
      },
    },
  ],
  response: {
    format: "json-stat2",
  },
};

let getData = async () => {
  let url =
    "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/tyokay/statfin_tyokay_pxt_115i.px";
  let res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery),
  });
  //console.log(url);
  if (!res.ok) return;
  let data = await res.json();
  return data;
};
getData();

let getData2 = async () => {
  let url =
    "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/tyonv/statfin_tyonv_pxt_12v5.px";
  let res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery2),
  });
  //console.log(url);

  if (!res.ok) return;
  let data2 = await res.json();
  return data2;
};
getData2();

let jQuery2 = {
  query: [
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["SSS"],
      },
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["vaesto"],
      },
    },
    {
      code: "Vuosi",
      selection: {
        filter: "item",
        values: [
          "2007",
          "2008",
          "2009",
          "2010",
          "2011",
          "2012",
          "2013",
          "2014",
          "2015",
          "2016",
          "2017",
          "2018",
          "2019",
          "2020",
          "2021",
          "2022",
        ],
      },
    },
  ],
  response: {
    format: "json-stat2",
  },
};

let fetchPopData = async () => {
  let url =
    "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/vaerak/statfin_vaerak_pxt_11ra.px";
  let res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jQuery2),
  });
  //console.log(url);
  if (!res.ok) return;
  let popData = await res.json();
  //console.log(popData);
  return popData;
};
fetchPopData();

let chart;
let chartData;
let valuesPop;

let buildChart = async () => {
  let data = await getData();
  let data2 = await getData2();
  //console.log(data2);

  let popData = await fetchPopData();
  //console.log(popData);

  //let labelsPop =

  let labels = Object.values(data.dimension.Vuosi.category.label);
  let labelsPop = Object.values(popData.dimension.Vuosi.category.label);
  //console.log(labels);
  //console.log(labelsPop);

  let values = data.value;
  let unempValue = data2.value;
  valuesPop = popData.value;
  //console.log(unempValue);
  //console.log(valuesPop);

  chartData = {
    labels: labels,
    datasets: [
      {
        name: "Employed",
        type: "bar",
        values: values,
      },
      {
        name: "Unemployed",
        type: "bar",
        values: unempValue,
        //values: valuesPop,
      },
    ],
  };
  //chartData.datasets[1].values;
  //console.log(chartData.datasets[0].values);
  //console.log(chartData.datasets[1].values);
  chart = new frappe.Chart("#chart", {
    title: "Figure 2: Employed vs. Unemployed jobseekers 2007-2022",
    data: chartData,
    type: "bar",
    height: 450,
    colors: ["#69f542", "#f5ef42"],
  });
};

/*let updateBtn = document.getElementById("select-change");
updateBtn.addEventListener("click", selectionChanger);
function selectionChanger() {
  //console.log(selectChange.value);
  //console.log(chartData.datasets[1].values);
  //console.log(valuesPop);
  chartData.datasets[1].values = valuesPop;
  chart.update();}*/

/*//selectionChanger();
let downloadbtn = document.getElementById("chartDownload");
downloadbtn.addEventListener("click", () => {
  chart.export();
});*/

buildChart();
