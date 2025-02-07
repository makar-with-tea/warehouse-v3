// Интерфейс для продукта
export interface Product {
    id: number;
    name: string;
    description?: string;
    categoryId?: number;
    quantity: number;
    unit: string;
    imageUrl?: string;
}

// Интерфейс для категории
export interface Category {
    id: number;
    name: string;
}

// Интерфейс для профиля пользователя
export interface UserProfile {
    id: number;
    name: string;
    email: string;
    group: string;
    avatarUrl?: string;
}