let jsonQuery = {
  query: [
    {
      code: "Alue",
      selection: {
        filter: "item",
        values: ["000000"],
      },
    },
    {
      code: "Puolue",
      selection: {
        filter: "item",
        values: ["03", "01", "04", "02", "05", "06", "07", "08"],
      },
    },
    {
      code: "Tiedot",
      selection: {
        filter: "item",
        values: ["aanet_yht"],
      },
    },
  ],
  response: {
    format: "json-stat2",
  },
};

let fetchData = async () => {
  let url =
    "https://statfin.stat.fi:443/PxWeb/api/v1/en/StatFin/kvaa/statfin_kvaa_pxt_12g3.px";
  let res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(jsonQuery),
  });

  if (!res.ok) return;
  let data = await res.json();

  return data;
};
fetchData();

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

  if (!res.ok) return;
  let popData = await res.json();

  return popData;
};
fetchPopData();

let chart;
let labelsPop;
let valuesPop;
let chartData;

let buildChart = async () => {
  let data = await fetchData();

  let popData = await fetchPopData();

  let parties = Object.values(data.dimension.Puolue.category.label);

  let labels = Object.values(data.dimension.Vuosi.category.label);
  labelsPop = Object.values(popData.dimension.Vuosi.category.label);

  let values = data.value;
  valuesPop = popData.value;

  parties.forEach((party, index) => {
    let partyVote = [];
    for (let i = 0; i < 12; i++) {
      partyVote.push(values[i * 8 + index]);
    }
    parties[index] = {
      name: party,
      values: partyVote,
    };
  });

  chartData = {
    labels: labels,
    datasets: parties,
  };

  chart = new frappe.Chart("#chart", {
    //maintainAspectRatio: false,
    title:
      "Figure 1: Finnish municipal elections, support for parties, 1976-2021",
    data: chartData,
    //type: "bar",
    type: "axis-mixed",
    height: 400,
    colors: [
      "#f54b4b",
      "#006288",
      "#349a2b",
      "#ffde55",
      "#61bf1a",
      "#f00a64",
      "#ffdd93",
      "#0135a5",
    ],
  });
};

buildChart();

let downloadbtn = document.getElementById("chartDownload");
downloadbtn.addEventListener("click", () => {
  chart.export();
});
