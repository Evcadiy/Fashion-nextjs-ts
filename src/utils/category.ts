import { useQuery } from "@tanstack/react-query";

const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      "https://fakestoreapi.com/products/categories"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const useCategories = () => {
  return useQuery<string[], Error>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
};

export default getCategories;
