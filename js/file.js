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
  //console.log(url);
  if (!res.ok) return;
  let data = await res.json();
  //console.log(data);
  return data;
};

fetchData();

let buildChart = async () => {
  let data = await fetchData();
  //console.log(data);

  let parties = Object.values(data.dimension.Puolue.category.label);
  let labels = Object.values(data.dimension.Vuosi.category.label);
  let values = data.value;

  //console.log(parties);
  //console.log(labels);
  //console.log(values);

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
  //console.log(parties);
  let chartData = {
    labels: labels,
    datasets: parties,
  };
  let chart = new frappe.Chart("#chart", {
    title:
      "Figure 1: Finnish municipal elections, support for parties, 1976-2021",
    data: chartData,
    //type: "bar",
    type: "line",
    height: 400,
    colors: [
      "#f54b4b",
      "#ffde55",
      "#006288",
      "#349a2b",
      "#61bf1a",
      "#f00a64",
      "#ffdd93",
      "#0135a5",
    ],
  });
};
buildChart();
