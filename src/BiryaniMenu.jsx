import React, { useState } from 'react';

    const BiryaniMenu = () => {
      const [cartItems, setCartItems] = useState({});
      const [activeNav, setActiveNav] = useState('Our Menus');

      const [menuItems] = useState([
        {
          id: 1,
          name: 'Chicken Biryani',
          rating: 4.8,
          description: "Biryani is an oil or rice mobile handling slot. Full of tests.",
          price: 250.00,
          image: '/api/placeholder/80/80'
        },
        {
          id: 2,
          name: 'Chicken 65 Biryani',
          rating: 4.9,
          description: "Biryani is an oil or rice mobile handling slot. Full of tests.",
          price: 250.00,
          image: '/api/placeholder/80/80'
        },
        {
          id: 3,
          name: 'Mutton Biryani',
          rating: 4.8,
          description: "Biryani is an oil or rice mobile handling slot. Full of tests.",
          price: 250.00,
          image: '/api/placeholder/80/80'
        },
        {
          id: 4,
          name: 'Chicken Biryani Combo',
          rating: 4.7,
          description: "Biryani is an oil or rice mobile handling slot. Full of tests.",
          price: 250.00,
          image: '/api/placeholder/80/80'
        },
        {
          id: 5,
          name: 'Plani Biryani',
          rating: 4.8,
          description: "Biryani is an oil or rice mobile handling slot. Full of tests.",
          price: 250.00,
          image: '/api/placeholder/80/80'
        },
        {
          id: 6,
          name: 'Butter Nan',
          rating: 4.8,
          description: "Biryani is an oil or rice mobile handling slot. Full of tests.",
          price: 250.00,
          image: '/api/placeholder/80/80'
        }
      ]);

      const StarRating = ({ rating }) => {
        return (
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{rating}</span>
          </div>
        );
      };

      const updateQuantity = (itemId, action) => {
        setCartItems(prev => {
          const currentQty = prev[itemId]?.quantity || 0;
          
          if (action === 'increase') {
            return {
              ...prev,
              [itemId]: { quantity: currentQty + 1, price: menuItems.find(item => item.id === itemId).price }
            };
          } else if (action === 'decrease' && currentQty > 0) {
            if (currentQty === 1) {
              const { [itemId]: _, ...rest } = prev;
              return rest;
            }
            return {
              ...prev,
              [itemId]: { quantity: currentQty - 1, price: menuItems.find(item => item.id === itemId).price }
            };
          }
          return prev;
        });
      };

      const calculateTotals = () => {
        const subtotal = Object.entries(cartItems).reduce((total, [_, item]) => {
          return total + (item.price * item.quantity);
        }, 0);
        return { subtotal, total: subtotal };
      };

      const { subtotal, total } = calculateTotals();

      const handleNavClick = (navItem) => {
        setActiveNav(navItem);
      };

      const handleOrderNow = () => {
        console.log('Order Now clicked');
        alert('Order Now clicked!');
      };

      const handleProceedToPay = () => {
        console.log('Proceeding to payment');
        alert('Proceeding to payment...');
      };

      const handleSubscribe = (e) => {
        e.preventDefault();
        console.log('Subscribe clicked');
        alert('Thanks for subscribing!');
      };

      return (
        <div className="w-full">
          <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-11/12 max-w-6xl z-50">
            <div className="bg-gray-800/90 backdrop-blur-sm rounded-full px-6 py-3 flex justify-between items-center">
              <img src="/api/placeholder/40/40" alt="Biriyani Culture" className="h-10 cursor-pointer" onClick={() => handleNavClick('Home')} />
              
              <div className="flex items-center gap-8">
                {['Home', 'About Us', 'Our Menus', 'Contact Us'].map(item => (
                  <button
                    key={item}
                    onClick={() => handleNavClick(item)}
                    className={`text-white hover:text-yellow-400 transition-colors ${activeNav === item ? 'text-yellow-400' : ''}`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button className="text-white hover:text-yellow-400 transition-colors">
                  Cart
                </button>
                <button 
                  onClick={handleOrderNow}
                  className="bg-pink-600 text-white px-6 py-2 rounded-full hover:bg-pink-700 transition-colors"
                >
                  Order Now
                </button>
              </div>
            </div>
          </nav>

          <div className="max-w-4xl mx-auto p-8 bg-gray-50 pt-24">
            <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>
            
            <div className="space-y-6 bg-white rounded-xl p-6 shadow-sm mb-8">
              {menuItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center hover:bg-gray-50 p-4 rounded-lg transition-colors">
                  <div className="flex-1">
                    <StarRating rating={item.rating} />
                    <h3 className="text-xl font-medium mt-1">{item.name}</h3>
                    <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                    <p className="text-gray-900 font-medium mt-2">Rs.{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, 'decrease')}
                        className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">
                        {cartItems[item.id]?.quantity || 0}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 'increase')}
                        className="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center hover:bg-pink-200 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-xl object-cover shadow-sm"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sub Total</span>
                  <span className="font-medium">Rs.{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="font-medium">Total</span>
                  <div className="flex flex-col items-end gap-2">
                    <span className="font-medium">Rs.{total.toFixed(2)}</span>
                    <button 
                      onClick={handleProceedToPay}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors"
                    >
                      Proceed to pay
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">Your Order List</h2>
              <div className="border rounded-lg">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="p-3 text-left">Product Name</th>
                      <th className="p-3 text-center">Quantity</th>
                      <th className="p-3 text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(cartItems).map(([itemId, details]) => {
                      const item = menuItems.find(item => item.id === parseInt(itemId));
                      return (
                        <tr key={itemId} className="border-b">
                          <td className="p-3">{item.name}</td>
                          <td className="p-3 text-center">{details.quantity}</td>
                          <td className="p-3 text-right">Rs.{(details.quantity * details.price).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-4">Fill In Your Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    className="p-3 border rounded-lg w-full"
                  />
                  <input
                    type="tel"
                    placeholder="Phone No*"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <select className="p-3 border rounded-lg w-full">
                    <option>Select Nearest Branch</option>
                  </select>
                  <select className="p-3 border rounded-lg w-full">
                    <option>Select Delivery Time</option>
                  </select>
                </div>

                <textarea
                  placeholder="Address *"
                  className="p-3 border rounded-lg w-full h-24"
                ></textarea>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Pincode *"
                    className="p-3 border rounded-lg w-full"
                  />
                  <input
                    type="text"
                    placeholder="Landmark (Optional)"
                    className="p-3 border rounded-lg w-full"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Enter Captcha"
                    className="p-3 border rounded-lg w-full"
                  />
                  <div className="p-3 bg-gray-100 rounded-lg text-green-600 font-medium">
                    Cn9Mc6
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-pink-600 transition-colors">
                    Submit
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-8 rounded-xl">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-4xl font-bold mb-2">Join for hot offers</h3>
                <p className="text-gray-600 mb-6">Get exclusive deals and updates</p>
                <form onSubmit={handleSubscribe} className="flex gap-4">
                  <input
                    type="email"
                    placeholder="Your Email Address"
                    className="flex-1 p-3 rounded-full border bg-white"
                  />
                  <button 
                    type="submit"
                    className="bg-pink-500 text-white px-8 py-3 rounded-full font-medium hover:bg-pink-600 transition-colors"
                  >
                    Subscribe Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default BiryaniMenu;
