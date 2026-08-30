// frontend/src/services/api.js
const API_BASE_URL = 'http://localhost:5001/api';  // CHANGED from 5000 to 5001

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products`);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const fetchFeaturedProducts = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/featured`);
        if (!response.ok) {
            throw new Error('Failed to fetch featured products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching featured products:', error);
        return [];
    }
};

export const fetchProductById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
};

export const fetchProductsByCategory = async (category) => {
    try {
        const response = await fetch(`${API_BASE_URL}/products/category/${category}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products by category');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
};