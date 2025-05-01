import axios from 'axios';
import fs from 'fs';

// Define the path to the cars.json file
const carsJsonPath = '/data/cars.json';

// Create a function to fetch data from cars.json
export const fetchCarsData = async () => {
  try {
    const response = await axios.get(carsJsonPath);
    return response.data; // Return the data from the JSON file
  } catch (error) {
    console.error('Error fetching cars data:', error);
    throw error; // Throw the error to handle it in the calling function
  }
};

// export const updateCarInCarList = (vinId) => {
//   try {
//     // Read the existing cars.json file
//     const carsData = JSON.parse(fs.readFileSync(carsJsonPath, 'utf-8'));

//     // Find the index of the car to update
//     const carIndex = carsData.findIndex((car) => car.vin_id === vinId);
//     if (carIndex === -1) {
//       throw new Error(`Car with VIN ID ${vinId} not found.`);
//     }

//     // Update the car data
//     carsData[carIndex] = {
//       ...carsData[carIndex],
//       availability: 0, // Merge the updated data
//     };

//     // Write the updated data back to cars.json
//     fs.writeFileSync(carsJsonPath, JSON.stringify(carsData, null, 2), 'utf-8');

//     console.log(`Car with VIN ID ${vinId} updated successfully.`);
//     return carsData[carIndex]; // Return the updated car
//   } catch (error) {
//     console.error('Error updating car in cars.json:', error);
//     throw error;
//   }
// };
