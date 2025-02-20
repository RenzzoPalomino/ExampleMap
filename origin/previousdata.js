export const origin = [
    { id: 1, x: -3, z: 1, width: 0.5, depth: 0.5, height: 0.4, color: 0xf54242, label: 'Stand 1' },
    { id: 2, x: -2, z: 1, width: 0.8, depth: 0.8, height: 0.4, color: 0x001eff, label: 'Stand 2' },
    { id: 3, x: -1, z: 1, width: 0.8, depth: 0.8, height: 0.4, color: 0xff00ee, label: 'Stand 3' },
    { id: 4, x: -3, z: 0, width: 1, depth: 1, height: 0.5, color: 0xff7300, label: 'Stand 4' }, // Stand más grande
    { id: 5, x: -2, z: 0, width: 0.8, depth: 0.8, height: 0.4, color: 0xffee00 , label: 'Stand 5'},
    { id: 6, x: -1, z: 0, width: 0.8, depth: 0.8, height: 0.4, color: 0x00d5ff, label: 'Stand 6' }
];

export const transitionalOrigin = [
  { id: 1, x: -3, z: 1, width: 0.5, depth: 0.5, height: 0.4, color: "#f54242", label: 'Stand 1' },
  { id: 2, x: -2, z: 1, width: 0.8, depth: 0.8, height: 0.4, color: "#001eff", label: 'Stand 2' },
  { id: 3, x: -1, z: 1, width: 0.8, depth: 0.8, height: 0.4, color: "#ff00ee", label: 'Stand 3' },
  { id: 4, x: -3, z: 0, width: 1, depth: 1, height: 0.5, color: "#ff7300", label: 'Stand 4' }, // Stand más grande
  { id: 5, x: -2, z: 0, width: 0.8, depth: 0.8, height: 0.4, color: "#ffee00" , label: 'Stand 5'},
  { id: 6, x: -1, z: 0, width: 0.8, depth: 0.8, height: 0.4, color: "#00d5ff", label: 'Stand 6' }
];
// Nuevo modelo de datos
export const new_origin = [
    {
      "id": 1,
      "position": { "x": -3, "z": 1 },
      "body": { "width": 0.5, "depth": 0.5, "height": 0.4 },
      "style": {
        "label": "Stand 1",
        "nonSelected": { "color": "#f54242", "text_color": "#ffffff" },
        "selected": { "color": "#6e1f1f", "text_color": "gray" }
      }
    },
    {
      "id": 2,
      "position": { "x": -2, "z": 1 },
      "body": { "width": 0.8, "depth": 0.8, "height": 0.4 },
      "style": {
        "label": "Stand 2",
        "nonSelected": { "color": "#001eff", "text_color": "#ffffff" },
        "selected": { "color": "#000099", "text_color": "gray" }
      }
    }
  ];
//modelo de datos actualizado
export const update_origin = [
  {
    "id": 10,
    "position": { "x": 0, "z": 0.1 },
    "body": { "width": 0.1, "depth": 0.07, "height": 0.1 },
    "style": {
        "label": "G- 04  (4x3)",
        "nonSelected": { "color": "#FDE22D", "text_color": "#A5A29A" },
        "selected": { "color": "#455a64", "text_color": "gray" }
    }
  }
  ,
  {
    "id": 11,
    "position": { "x": 0.110, "z": 0.1 },
    "body": { "width": 0.1, "depth": 0.07, "height": 0.1 },
    "style": {
        "label": "G- 05  (4x3)",
        "nonSelected": { "color": "#FDE22D", "text_color": "#A5A29A" },
        "selected": { "color": "#455a64", "text_color": "gray" }
    }
  },
  {
    "id": 12,
    "position": { "x": 0.225, "z": 0.1 },
    "body": { "width": 0.1, "depth": 0.07, "height": 0.1 },
    "style": {
        "label": "G- 06  (4x3)",
        "nonSelected": { "color": "#FDE22D", "text_color": "#A5A29A" },
        "selected": { "color": "#455a64", "text_color": "gray" }
    }
  },
  {
    "id": 13,
    "position": { "x": 0.340, "z": 0.1 },
    "body": { "width": 0.1, "depth": 0.07, "height": 0.1 },
    "style": {
        "label": "G- 07  (4x3)",
        "nonSelected": { "color": "#FDE22D", "text_color": "#A5A29A" },
        "selected": { "color": "#455a64", "text_color": "gray" }
    }
  },
  {
    "id": 14,
    "position": { "x": 0.480, "z": 0.1 },
    "body": { "width": 0.115, "depth": 0.07, "height": 0.1 },
    "style": {
        "label": "G- 08  (4x3)",
        "nonSelected": { "color": "#FDE22D", "text_color": "#A5A29A" },
        "selected": { "color": "#455a64", "text_color": "gray" }
    }
  },
  {
    "id": 15,
    "position": { "x": 0.6, "z": 0.1 },
    "body": { "width": 0.115, "depth": 0.07, "height": 0.1 },
    "style": {
        "label": "H- 05  (4x3)",
        "nonSelected": { "color": "#75b4db", "text_color": "#ffffff" },
        "selected": { "color": "#455a64", "text_color": "gray" }
    }
  },
  {
    "id": 16,
    "position": { "x": 0.710, "z": 0.1 },
    "body": { "width": 0.1, "depth": 0.07, "height": 0.1 },
    "style": {
        "label": "H- 06  (4x3)",
        "nonSelected": { "color": "#75b4db", "text_color": "#ffffff" },
        "selected": { "color": "#455a64", "text_color": "gray" }
    }
  },
];


