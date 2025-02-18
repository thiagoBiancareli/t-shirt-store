import {
  ShoppingCart,
  Menu,
  X,
  Instagram,
  Facebook,
  Twitter,
  Minus,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

// Product type definition
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

// Cart item type
type CartItem = Product & {
  quantity: number;
};

// Sample products data with extended descriptions
const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    description:
      "Our essential white t-shirt is crafted from 100% organic cotton, providing unmatched comfort and breathability. Perfect for any casual occasion, this versatile piece features a classic crew neck, short sleeves, and a relaxed fit that flatters every body type. The premium cotton ensures durability while maintaining its softness wash after wash.",
  },
  {
    id: 2,
    name: "Black Graphic Tee",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    description:
      "Make a statement with our urban-inspired graphic tee. This black t-shirt features a unique, artist-designed print that captures modern street style. Made from a soft cotton blend, it offers both style and comfort. The durable screen-printed design ensures the artwork stays vibrant through multiple washes.",
  },
  {
    id: 3,
    name: "Navy Blue Premium",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
    description:
      "Elevate your basics with our Navy Blue Premium t-shirt. This luxury essential is made from long-staple cotton, known for its exceptional softness and durability. The rich navy color is achieved through eco-friendly dyeing processes, and the tailored fit provides a polished look suitable for both casual and semi-formal occasions.",
  },
  {
    id: 4,
    name: "Vintage Washed Tee",
    price: 32.99,
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
    description:
      "Experience the perfect lived-in feel with our Vintage Washed Tee. Each shirt undergoes a special washing process to achieve that coveted broken-in softness from day one. The slightly faded look adds character, while the durable construction ensures this will become your new favorite tee.",
  },
  {
    id: 5,
    name: "Striped Cotton Blend",
    price: 36.99,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
    description:
      "Our Striped Cotton Blend tee combines style with comfort. The classic stripe pattern is executed in premium threads on a soft cotton-modal blend fabric. This combination provides exceptional drape and a luxurious feel against the skin. The modern fit is neither too loose nor too tight, making it perfect for any casual setting.",
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">StyleTees</h1>

            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-gray-900">
                Home
              </a>
              <a href="#products" className="text-gray-700 hover:text-gray-900">
                Products
              </a>
              <a href="#about" className="text-gray-700 hover:text-gray-900">
                About
              </a>
              <a href="#contact" className="text-gray-700 hover:text-gray-900">
                Contact
              </a>
            </div>

            <div className="flex items-center">
              <button
                className="p-2 relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-6 w-6 text-gray-700" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemCount}
                  </span>
                )}
              </button>
              <button
                className="md:hidden ml-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="block px-3 py-2 text-gray-700">
                Home
              </a>
              <a href="#products" className="block px-3 py-2 text-gray-700">
                Products
              </a>
              <a href="#about" className="block px-3 py-2 text-gray-700">
                About
              </a>
              <a href="#contact" className="block px-3 py-2 text-gray-700">
                Contact
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Product Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={() => setSelectedProduct(null)}
            >
              <div className="absolute inset-0 bg-black opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <div className="flex justify-between items-start">
                      <h3 className="text-2xl leading-6 font-bold text-gray-900 mb-4">
                        {selectedProduct.name}
                      </h3>
                      <button
                        onClick={() => setSelectedProduct(null)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-6 w-6" />
                      </button>
                    </div>

                    <div className="mt-2 space-y-4">
                      <div className="aspect-w-16 aspect-h-9">
                        <img
                          src={selectedProduct.image}
                          alt={selectedProduct.name}
                          className="w-full h-[300px] object-cover rounded-lg"
                        />
                      </div>

                      <div className="mt-4">
                        <p className="text-gray-600 text-lg leading-relaxed">
                          {selectedProduct.description}
                        </p>
                      </div>

                      <div className="mt-6 flex items-center justify-between">
                        <span className="text-3xl font-bold text-gray-900">
                          ${selectedProduct.price}
                        </span>
                        <button
                          onClick={() => {
                            addToCart(selectedProduct);
                            setSelectedProduct(null);
                          }}
                          className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shopping Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Shopping Cart
                  </h2>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => setIsCartOpen(false)}
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-500">Your cart is empty</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-4 py-4 border-b"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-20 w-20 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h3 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              ${item.price}
                            </p>
                            <div className="flex items-center space-x-2 mt-2">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-gray-600">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>${cartTotal.toFixed(2)}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <button
                        className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                        onClick={() => {
                          // Implement checkout logic here
                          alert(
                            "Checkout functionality will be implemented soon!"
                          );
                        }}
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="pt-16">
        <div className="relative h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=2000"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">
                Premium Quality T-Shirts
              </h2>
              <p className="text-xl mb-8">
                Discover our collection of comfortable and stylish t-shirts
              </p>
              <a
                href="#products"
                className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Collection
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition-transform hover:scale-105"
                onClick={() => setSelectedProduct(product)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {product.description.substring(0, 100)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-gray-800 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">About StyleTees</h2>
            <p className="text-gray-600 mb-8">
              We're passionate about creating high-quality, comfortable t-shirts
              that make you look and feel great. Our products are made from 100%
              organic cotton and produced ethically with sustainability in mind.
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto">
              <div>
                <h3 className="font-bold mb-2">Quality</h3>
                <p className="text-gray-600">Premium materials</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Sustainable</h3>
                <p className="text-gray-600">Eco-friendly</p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Ethical</h3>
                <p className="text-gray-600">Fair production</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">StyleTees</h3>
              <p className="text-gray-400">
                Premium quality t-shirts for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="text-gray-400 hover:text-white"
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">
              &copy; 2024 StyleTees. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
