// Mock product service for development
// In production, this would connect to Firebase

const mockProducts = [
  {
    id: '1',
    name: 'Premium Smartphone',
    price: 599.99,
    description: 'High-end smartphone with advanced camera system and long battery life. Perfect for photography enthusiasts and power users.',
    image: 'https://via.placeholder.com/300x300?text=Smartphone',
    category: 'Electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Wireless Earbuds',
    price: 89.99,
    description: 'True wireless earbuds with noise cancellation and premium sound quality. Includes charging case with 24-hour battery life.',
    image: 'https://via.placeholder.com/300x300?text=Earbuds',
    category: 'Electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Smart Watch',
    price: 199.99,
    description: 'Fitness tracker and smartwatch with heart rate monitoring, GPS, and water resistance. Perfect for active lifestyles.',
    image: 'https://via.placeholder.com/300x300?text=SmartWatch',
    category: 'Electronics',
    inStock: true
  },
  {
    id: '4',
    name: 'Laptop Backpack',
    price: 49.99,
    description: 'Water-resistant backpack with padded laptop compartment, multiple pockets, and USB charging port. Ideal for commuters and travelers.',
    image: 'https://via.placeholder.com/300x300?text=Backpack',
    category: 'Accessories',
    inStock: true
  },
  {
    id: '5',
    name: 'Bluetooth Speaker',
    price: 79.99,
    description: 'Portable Bluetooth speaker with 360° sound, waterproof design, and 12-hour battery life. Perfect for outdoor activities.',
    image: 'https://via.placeholder.com/300x300?text=Speaker',
    category: 'Electronics',
    inStock: true
  },
  {
    id: '6',
    name: 'Desk Lamp',
    price: 34.99,
    description: 'LED desk lamp with adjustable brightness, color temperature, and flexible arm. Energy-efficient and eye-friendly.',
    image: 'https://via.placeholder.com/300x300?text=DeskLamp',
    category: 'Home',
    inStock: true
  },
  {
    id: '7',
    name: 'Coffee Maker',
    price: 129.99,
    description: 'Programmable coffee maker with thermal carafe, brew strength control, and auto-shutoff. Makes up to 12 cups.',
    image: 'https://via.placeholder.com/300x300?text=CoffeeMaker',
    category: 'Home',
    inStock: true
  },
  {
    id: '8',
    name: 'Yoga Mat',
    price: 29.99,
    description: 'Non-slip yoga mat with alignment lines, eco-friendly material, and carrying strap. Perfect for yoga, pilates, and floor exercises.',
    image: 'https://via.placeholder.com/300x300?text=YogaMat',
    category: 'Fitness',
    inStock: true
  }
];

export const getProducts = () => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockProducts);
    }, 1000);
  });
};

export const getProductById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const product = mockProducts.find(p => p.id === id);
      if (product) {
        resolve(product);
      } else {
        reject(new Error('Product not found'));
      }
    }, 500);
  });
};

export const getProductsByCategory = (category) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => p.category === category);
      resolve(products);
    }, 800);
  });
};

export const searchProducts = (query) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.description.toLowerCase().includes(query.toLowerCase())
      );
      resolve(products);
    }, 800);
  });
};
