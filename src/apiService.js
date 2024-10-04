
import axios from "axios";


const API_BASE_URL = 'https://carriomotors.io.vn/api';

// Banner
export const fetchBannerData = async (page) => {
  try {
    const response = await fetch(`${API_BASE_URL}/get_banner.php?page=${page}`);
    const data = await response.json();
    return data.map((banner) => ({
      src: banner.image_url,
      alt: banner.title,
    }));
  } catch (error) {
    console.error('Error fetching banner data:', error);
    return [];
  }
};

// Vehicle
export const fetchCars = async () => {
  try {
    const response = await axios.get(
      "https://carriomotors.io.vn/api/get_vehicle.php"
    );
    console.log("Raw response:", response);
    const carsData = response.data.data;
    console.log("Parsed cars data:", carsData);
    if (Array.isArray(carsData)) {
      return carsData;
    } else {
      console.error("Data is not an array:", carsData);
      return [];
    }
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};
