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
  CreditCard,
  MessageCircle,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

// Types
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
};

type CartItem = Product & {
  quantity: number;
};

type ShippingMethod = {
  id: string;
  name: string;
  price: number;
  estimatedDays: string;
};

type PaymentMethod = {
  id: string;
  name: string;
  icon: React.ReactNode;
  installments: boolean;
};

type CheckoutStep =
  | "cart"
  | "details"
  | "shipping"
  | "payment"
  | "confirmation";

type CustomerDetails = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

// Sample data
const products: Product[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
    description:
      "Our essential white t-shirt is crafted from 100% organic cotton, providing unmatched comfort and breathability.",
  },
  {
    id: 2,
    name: "Black Graphic Tee",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800",
    description: "Urban style graphic t-shirt with modern design",
  },
  {
    id: 3,
    name: "Navy Blue Premium",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
    description: "Premium quality navy blue t-shirt for everyday wear",
  },
];

const shippingMethods: ShippingMethod[] = [
  {
    id: "express",
    name: "Express Delivery",
    price: 15.99,
    estimatedDays: "1-2 business days",
  },
  {
    id: "standard",
    name: "Standard Shipping",
    price: 7.99,
    estimatedDays: "3-5 business days",
  },
  {
    id: "economy",
    name: "Economy Shipping",
    price: 4.99,
    estimatedDays: "5-7 business days",
  },
];

const paymentMethods: PaymentMethod[] = [
  {
    id: "credit",
    name: "Credit Card",
    icon: <CreditCard className="h-6 w-6" />,
    installments: true,
  },
  {
    id: "pix",
    name: "PIX",
    icon: <CheckCircle2 className="h-6 w-6" />,
    installments: false,
  },
  {
    id: "boleto",
    name: "Boleto",
    icon: <AlertCircle className="h-6 w-6" />,
    installments: false,
  },
];

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("cart");
  const [selectedShipping, setSelectedShipping] = useState<string>("standard");
  const [selectedPayment, setSelectedPayment] = useState<string>("credit");
  const [installments, setInstallments] = useState<number>(1);
  const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([{ text: "Olá! Como posso ajudar você hoje?", sender: "bot" }]);

  // Cart functions
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

  // Calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shippingCost =
    shippingMethods.find((method) => method.id === selectedShipping)?.price ||
    0;
  const total = subtotal + shippingCost;

  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Chat functions
  const handleChatSubmit = (message: string) => {
    setChatMessages((prev) => [...prev, { text: message, sender: "user" }]);

    // Simple bot response - in a real app, this would be more sophisticated
    setTimeout(() => {
      const botResponse = {
        text: `Obrigado pela sua mensagem! Um de nossos atendentes responderá em breve.`,
        sender: "bot" as const,
      };
      setChatMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  // Checkout steps rendering
  const renderCheckoutStep = () => {
    switch (checkoutStep) {
      case "details":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Dados Pessoais</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nome Completo
                </label>
                <input
                  type="text"
                  value={customerDetails.name}
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      name: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={customerDetails.email}
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      email: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={customerDetails.phone}
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      phone: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Endereço
                </label>
                <input
                  type="text"
                  value={customerDetails.address}
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      address: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Cidade
                  </label>
                  <input
                    type="text"
                    value={customerDetails.city}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        city: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={customerDetails.state}
                    onChange={(e) =>
                      setCustomerDetails({
                        ...customerDetails,
                        state: e.target.value,
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CEP
                </label>
                <input
                  type="text"
                  value={customerDetails.zipCode}
                  onChange={(e) =>
                    setCustomerDetails({
                      ...customerDetails,
                      zipCode: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                />
              </div>
            </div>
            <button
              onClick={() => setCheckoutStep("shipping")}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Continuar para Entrega
            </button>
          </div>
        );

      case "shipping":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Método de Entrega</h3>
            <div className="space-y-4">
              {shippingMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedShipping === method.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedShipping(method.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{method.name}</h4>
                      <p className="text-sm text-gray-500">
                        {method.estimatedDays}
                      </p>
                    </div>
                    <div className="text-lg font-semibold">
                      ${method.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setCheckoutStep("payment")}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Continuar para Pagamento
            </button>
          </div>
        );

      case "payment":
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Forma de Pagamento</h3>
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className={`p-4 border rounded-lg cursor-pointer ${
                    selectedPayment === method.id
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => setSelectedPayment(method.id)}
                >
                  <div className="flex items-center space-x-3">
                    {method.icon}
                    <span className="font-medium">{method.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {selectedPayment === "credit" && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Número do Cartão
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Validade
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                      placeholder="MM/AA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Parcelas
                  </label>
                  <select
                    value={installments}
                    onChange={(e) => setInstallments(Number(e.target.value))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-900 focus:ring-gray-900"
                  >
                    {[...Array(12)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}x de R$ {(total / (i + 1)).toFixed(2)}
                        {i === 0 ? " (sem juros)" : ` (com juros)`}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <button
              onClick={() => setCheckoutStep("confirmation")}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Finalizar Compra
            </button>
          </div>
        );

      case "confirmation":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                Pedido Confirmado!
              </h3>
              <p className="text-gray-600">
                Obrigado pela sua compra. Você receberá um email com os detalhes
                do pedido.
              </p>
            </div>
            <div className="border-t pt-6">
              <h4 className="font-semibold mb-4">Resumo do Pedido</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Frete:</span>
                  <span>${shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setCartItems([]);
                setCheckoutStep("cart");
              }}
              className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
            >
              Voltar para a Loja
            </button>
          </div>
        );

      default: // cart
        return (
          <>
            <div className="flex-1 overflow-y-auto px-4 sm:px-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Seu carrinho está vazio</p>
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
                        <p className="text-sm text-gray-500">${item.price}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 rounded-full hover:bg-gray-100"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-gray-600">{item.quantity}</span>
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
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Frete calculado no checkout.
                </p>
                <div className="mt-6">
                  <button
                    onClick={() => setCheckoutStep("details")}
                    className="w-full bg-gray-900 text-white px-6 py-3 rounded-full hover:bg-gray-800 transition"
                  >
                    Iniciar Checkout
                  </button>
                </div>
              </div>
            )}
          </>
        );
    }
  };

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

      {/* Shopping Cart/Checkout Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              if (checkoutStep === "cart") {
                setIsCartOpen(false);
              }
            }}
          />
          <div className="absolute inset-y-0 right-0 max-w-full flex">
            <div className="relative w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl">
                <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    {checkoutStep === "cart"
                      ? "Carrinho"
                      : checkoutStep === "details"
                      ? "Checkout - Dados Pessoais"
                      : checkoutStep === "shipping"
                      ? "Checkout - Entrega"
                      : checkoutStep === "payment"
                      ? "Checkout - Pagamento"
                      : "Pedido Confirmado"}
                  </h2>
                  {checkoutStep === "cart" && (
                    <button
                      type="button"
                      className="text-gray-400 hover:text-gray-500"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </button>
                  )}
                  {checkoutStep !== "cart" &&
                    checkoutStep !== "confirmation" && (
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() =>
                          setCheckoutStep(
                            checkoutStep === "payment"
                              ? "shipping"
                              : checkoutStep === "shipping"
                              ? "details"
                              : "cart"
                          )
                        }
                      >
                        Voltar
                      </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto">
                  <div className="px-4 py-6 sm:px-6">
                    {renderCheckoutStep()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chatbot */}
      <div className="fixed bottom-4 right-4 z-40">
        {!isChatOpen ? (
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
          >
            <MessageCircle className="h-6 w-6" />
          </button>
        ) : (
          <div className="bg-white rounded-lg shadow-xl w-80">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-semibold">Atendimento</h3>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`${
                    msg.sender === "user"
                      ? "ml-auto bg-gray-900 text-white"
                      : "mr-auto bg-gray-100 text-gray-900"
                  } rounded-lg p-3 max-w-[80%]`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.elements.namedItem(
                    "message"
                  ) as HTMLInputElement;
                  if (input.value.trim()) {
                    handleChatSubmit(input.value);
                    input.value = "";
                  }
                }}
                className="flex space-x-2"
              >
                <input
                  type="text"
                  name="message"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 rounded-full border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                />
                <button
                  type="submit"
                  className="bg-gray-900 text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
                >
                  Enviar
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

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
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
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
