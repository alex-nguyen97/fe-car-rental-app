import axios from 'axios';

// Define the path to the cars.json file
const carsJsonPath = '/src/data/cars.json';

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
