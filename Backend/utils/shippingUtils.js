// Constants for unit conversion
const CONSTANTS = {
    CM_TO_INCH: 0.393701,
    FT_TO_INCH: 12.0,
    G_TO_KG: 0.001,
    POUNDS_TO_KG: 0.453592,
  };
  
  // Inventory configuration
  const INVENTORY = {
    lengths: [10, 12, 14, 16, 18],
    breadths: [8, 10, 12, 14, 16],
    heights: [6, 8, 10, 12, 14],
    weightLimits: [30, 38, 46, 60, 76],
    availableQuantities: [50, 40, 30, 20, 10],
  };
  
  // Product Dimensions class
  class ProductDimensions {
    constructor(length = 0, breadth = 0, height = 0) {
      this.length = length;
      this.breadth = breadth;
      this.height = height;
    }
  }
  
  // Convert value to inches
  function convertToInches(value, fromUnit) {
    switch (fromUnit) {
      case "cm": return value * CONSTANTS.CM_TO_INCH;
      case "ft": return value * CONSTANTS.FT_TO_INCH;
      default: return value; // Assume value is already in inches
    }
  }
  
  // Convert value to kilograms
  function convertToKg(value, fromUnit) {
    switch (fromUnit) {
      case "g": return value * CONSTANTS.G_TO_KG;
      case "pounds": return value * CONSTANTS.POUNDS_TO_KG;
      default: return value; // Assume value is already in kilograms
    }
  }
  
  // Calculate dimensions based on shape
  function calculateDimensions(shape, dimensions, unit) {
    switch (shape.toLowerCase()) {
      case "cube":
        const side = convertToInches(dimensions.length, unit);
        return new ProductDimensions(side, side, side);
  
      case "cuboid":
        return new ProductDimensions(
          convertToInches(dimensions.length, unit),
          convertToInches(dimensions.breadth, unit),
          convertToInches(dimensions.height, unit)
        );
  
      case "cylinder":
        const diameter = convertToInches(dimensions.diameter, unit);
        const height = convertToInches(dimensions.height, unit);
        return new ProductDimensions(diameter, diameter, height);
  
      case "sphere":
        const radius = convertToInches(dimensions.radius, unit);
        return new ProductDimensions(radius * 2, radius * 2, radius * 2);
  
      default:
        return null; // Invalid shape
    }
  }
  
  // Calculate optimal packing
  function calculateOptimalPacking(productDims, weightPerProduct, quantity) {
    let bestCarton = null;
  
    for (let i = 0; i < INVENTORY.lengths.length; i++) {
      const carton = {
        length: INVENTORY.lengths[i],
        breadth: INVENTORY.breadths[i],
        height: INVENTORY.heights[i],
        weightLimit: INVENTORY.weightLimits[i],
        availableQuantity: INVENTORY.availableQuantities[i],
      };
  
      // Check if the product fits in the carton
      if (
        productDims.length <= carton.length &&
        productDims.breadth <= carton.breadth &&
        productDims.height <= carton.height
      ) {
        const productsPerCarton = Math.floor(carton.length / productDims.length) *
          Math.floor(carton.breadth / productDims.breadth) *
          Math.floor(carton.height / productDims.height);
  
        const totalWeight = weightPerProduct * productsPerCarton;
  
        // Check weight limits
        if (totalWeight <= carton.weightLimit) {
          const cartonsRequired = Math.ceil(quantity / productsPerCarton);
  
          // Choose the best carton (e.g., smallest or first fit)
          if (!bestCarton || cartonsRequired < bestCarton.cartonsRequired) {
            bestCarton = {
              cartonSize: {
                length: carton.length,
                breadth: carton.breadth,
                height: carton.height,
              },
              orientation: "Length-wise",
              arrangement: {
                lengthwise: Math.floor(carton.length / productDims.length),
                breadthwise: Math.floor(carton.breadth / productDims.breadth),
                heightwise: Math.floor(carton.height / productDims.height),
                productsPerCarton,
              },
              weight: {
                perCarton: totalWeight,
                limit: carton.weightLimit,
              },
              cartonsRequired,
              distribution: [
                {
                  size: `${carton.length}x${carton.breadth}x${carton.height}`,
                  quantity: cartonsRequired,
                  available: carton.availableQuantity,
                },
              ],
            };
          }
        }
      }
    }
  
    // Return result
    if (bestCarton) {
      return { success: true, ...bestCarton };
    } else {
      return { success: false, error: "No suitable carton found." };
    }
  }
  
  module.exports = {
    CONSTANTS,
    INVENTORY,
    ProductDimensions,
    convertToInches,
    convertToKg,
    calculateDimensions,
    calculateOptimalPacking,
  };
  