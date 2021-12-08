import { request } from 'umi';

export function getResultData() {
  return request<any>(
    `https://gw.alipayobjects.com/os/bmw-prod/2a5dbbc8-d0a7-4d02-b7c9-34f6ca63cff6.json`,
    {
      method: 'GET',
    },
  );
}
export function getResultData1() {
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
      "valueInCols": false
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
        "f2": "Material resources",
        "f3": "Non renewable elements",
        "f4": "Antimony",
        "p1": "Tutorial Model <LC>",
        "p2": "Tutorial End of Life Model <LC>",
        "p3": "DE: EAF Steel billet / Slab / Bloom ts <p-agg>"
      },
      {
        "v": 9.9217E-15,
        "f1": "Resources",
        "f2": "Material resources",
        "f3": "Non renewable elements",
        "f4": "Antimony",
        "p1": "Tutorial Model <LC>",
        "p2": "DE: BF Steel billet / slab / bloom ts <p-agg>",
        "p3": "-"
      }
    ],
    "totalData": [
    ]
  }
  `);
}
export function getResultData2() {
  return JSON.parse(`
  {
    "fields": {
      "rows": [],
      "columns": [
        "p1",
        "p2",
        "p3"
      ],
      "values": [
        "if",
        "if1",
        "if1-1",
        "if1-1-1",
        "if1-1-1-1",
        "if1-1-1-1-1",
        "if1-1-1-1-2",
        "if1-2",
        "if1-2-1",
        "if1-2-1-1"
      ],
      "valueInCols": false,
      "customTreeItems": [
        {
          "title": "Inputs",
          "key": "if",
          "children": [
            {
                "title": "Resources",
                "key": "ifl",
                "children": [
                {
                  "title": "Energy resources",
                  "key": "if1-1",
                  "children": [
                    {
                      "title": "Non renewable energy resources",
                        "key": "if1-1-1",
                        "children": [
                        {
                          "title": "Crude oil (resource)",
                          "key": "if1-1-1-1",
                          "children": [
                            {
                            "title": "Oil sand (10% bitumen) (in MJ)",
                            "key": "if1-1-1-1-1"
                            },
                            {
                              "title": "Oil sand (100% bitumen) (in MJ)",
                              "key": "if1-1-1-1-2"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  "title": "Material resources",
                  "key": "if1-2",
                  "children": [
                    {
                      "title": "Non renewable elements",
                        "key": "if1-2-1",
                        "children": [
                        {
                          "title": "Antimony",
                          "key": "if1-2-1-1"
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "meta": [
      {
        "field": "p1",
        "name": " "
      },
      {
        "field": "p2",
        "name": " "
      },
      {
        "field": "p3",
        "name": " "
      }
    ],
    "data": [
      {
        "if1-1-1-1-1": 2.8881E-08,
        "p1": "Tutorial Model <LC>",
        "p2": "Tutorial End of Life Model <LC>",
        "p3": "DE: EAF Steel billet / Slab / Bloom ts <p-agg>"
      },
      {
        "if1-1-1-1-2": 2.5215E-09,
        "p1": "Tutorial Model <LC>",
        "p2": "Tutorial End of Life Model <LC>",
        "p3": "DE: EAF Steel billet / Slab / Bloom ts <p-agg>"
      },
      {
        "if1-1-1-1-1": 5.1783E-07,
        "p1": "Tutorial Model <LC>",
        "p2": "DE: BF Steel billet / slab / bloom ts <p-agg>",
        "p3": " "
      },
      {
        "if1-1-1-1-2": 4.5209E-08,
        "p1": "Tutorial Model <LC>",
        "p2": "DE: BF Steel billet / slab / bloom ts <p-agg>",
        "p3": " "
      },
      {
        "if1-2-1-1": 3.2300E-14,
        "p1": "Tutorial Model <LC>",
        "p2": "Tutorial End of Life Model <LC>",
        "p3": "DE: EAF Steel billet / Slab / Bloom ts <p-agg>"
      },
      {
        "if1-2-1-1": 9.9217E-15,
        "p1": "Tutorial Model <LC>",
        "p2": "DE: BF Steel billet / slab / bloom ts <p-agg>",
        "p3": " "
      }
    ]
  }
  `);
}
