export const calculateCostPrediction = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
  export const calculateWeightPrediction = (items) => {
    return items.reduce((total, item) => total + item.weight * item.quantity, 0);
  };
  
  export const inventory = {
    tiffin: {
      shape: "cuboid",
      dimensions: { length: 10, width: 5, height: 15 },
      weight: 125,
    },
    rubic: {
      shape: "cube",
      dimensions: { side: 7 },
      weight: 350,
    },
    ball: {
      shape: "sphere",
      dimensions: { radius: 4 },
      weight: 32,
    },
  };
  