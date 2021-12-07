// import { request } from "umi";

export function getResultData() {
  return JSON.parse(`
  {
    "fields": {
      "rows": [
        "f1",
        "f2",
        "f3",
        "f4",
        "f5"
      ],
      "columns": [
        "p1",
        "p2",
        "p3"
      ],
      "values": [
        "v"
      ],
      "valueInCols": true
    },
    "meta": [
      {
        "field": "v",
        "name": " "
      },
      {
        "field": "f1",
        "name": ""
      },
      {
        "field": "f2",
        "name": ""
      },
      {
        "field": "f3",
        "name": ""
      },
      {
        "field": "f4",
        "name": ""
      },
      {
        "field": "f5",
        "name": ""
      },
      {
        "field": "p1",
        "name": ""
      },
      {
        "field": "p2",
        "name": ""
      },
      {
        "field": "p3",
        "name": ""
      }
    ],
    "data": [
      {
        "v": 2.8881E-08,
        "f1": "Resources",
        "f2": "Energy resources",
        "f3": "Non renewable energy resources",
        "f4": "Crude oil (resource)",
        "f5": "Oil sand (10% bitumen) (in MJ)",
        "p1": "Tutorial Model <LC>",
        "p2": "Tutorial End of Life Model <LC>",
        "p3": "DE: EAF Steel billet / Slab / Bloom ts <p-agg>"
      },
      {
        "v": 2.5215E-09,
        "f1": "Resources",
        "f2": "Energy resources",
        "f3": "Non renewable energy resources",
        "f4": "Crude oil (resource)",
        "f5": "Oil sand (100% bitumen) (in MJ)",
        "p1": "Tutorial Model <LC>",
        "p2": "Tutorial End of Life Model <LC>",
        "p3": "DE: EAF Steel billet / Slab / Bloom ts <p-agg>"
      },
      {
        "v": 5.1783E-07,
        "f1": "Resources",
        "f2": "Energy resources",
        "f3": "Non renewable energy resources",
        "f4": "Crude oil (resource)",
        "f5": "Oil sand (10% bitumen) (in MJ)",
        "p1": "Tutorial Model <LC>",
        "p2": "DE: BF Steel billet / slab / bloom ts <p-agg>",
        "p3": "-"
      },
      {
        "v": 4.5209E-08,
        "f1": "Resources",
        "f2": "Energy resources",
        "f3": "Non renewable energy resources",
        "f4": "Crude oil (resource)",
        "f5": "Oil sand (100% bitumen) (in MJ)",
        "p1": "Tutorial Model <LC>",
        "p2": "DE: BF Steel billet / slab / bloom ts <p-agg>",
        "p3": "-"
      },
      {
        "v": 3.2300E-14,
        "f1": "Resources",
        "f2": "Land use",
        "f3": "Material resources",
        "f4": "Non renewable elements",
        "f5": "Antimony",
        "p1": "Tutorial Model <LC>",
        "p2": "Tutorial End of Life Model <LC>",
        "p3": "DE: EAF Steel billet / Slab / Bloom ts <p-agg>"
      },
      {
        "v": 9.9217E-15,
        "f1": "Resources",
        "f2": "Land use",
        "f3": "Material resources",
        "f4": "Non renewable elements",
        "f5": "Antimony",
        "p1": "Tutorial Model <LC>",
        "p2": "DE: BF Steel billet / slab / bloom ts <p-agg>",
        "p3": "-"
      }
    ],
    "totalData": [
    ]
  }
  `);
  // return request<any>(
  //   `https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json`,
  //   {
  //     method: 'GET',
  //   },
  // );
}
