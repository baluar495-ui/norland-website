// frontend/src/services/api.js
const API_BASE_URL = import.meta.env.API_URL || import.meta.env.VITE_API_URL || 'https://norland-website.onrender.com/api';

console.log('🔍 API URL:', API_BASE_URL); // For debugging

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
        const response = await fetch(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`);
        if (!response.ok) {
            throw new Error('Failed to fetch products by category');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products by category:', error);
        return [];
    }
};

export const fetchCategories = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/categories`);
        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
};