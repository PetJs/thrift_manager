import { useState, useRef } from "react";
import MasterCard from "@/assets/icons/mastercard.svg";
import Delete from "@/assets/icons/delete.svg";
import Card from "@/assets/icons/card.svg";
import Vector from "@/assets/icons/Vector.svg";
import FlutterWave from "@/assets/icons/flutterwaveLogo.svg";

const PaymentDetailsPage = () => {
  const [cards, setCards] = useState([{ id: 1, last4: "9818", brand: "MasterCard" }]);
  const [showDropdown, setShowDropdown] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  const handleDelete = (id: number) => {
    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const handleVectorClick = () => {
    setShowDropdown(true);
    setTimeout(() => {
      selectRef.current?.focus();
    }, 0);
  };

  return (
    <div className="p-6 max-w-md">
      {/* Manage Card Section */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-medium mb-2">Manage Card</label>
        {cards.map((card) => (
          <div key={card.id} className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm mb-2">
            <div className="flex items-center gap-3">
              <img src={MasterCard} alt="Mastercard Logo" className="w-8 h-8" />
              <span className="text-gray-700 font-medium">****{card.last4}</span>
            </div>
            <button onClick={() => handleDelete(card.id)} className="text-red-500 hover:text-red-600">
              <img src={Delete} alt="Delete" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Credit/Debit Card Section */}
      <div className="mb-6 relative">
        <label className="block text-gray-700 text-sm font-medium mb-2">Add New Credit / Debit Card</label>
        <div
          className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm cursor-pointer"
          onClick={handleVectorClick}
        >
          <div className="flex gap-3">
            <img src={Card} alt="Card" />
            <select
              ref={selectRef}
              className={`appearance-none bg-transparent text-gray-700 font-medium focus:outline-none ${
                showDropdown ? "block" : "pointer-events-none"
              }`}
              onBlur={() => setShowDropdown(false)}
              onChange={(e) => {
                const brand = e.target.value;
                if (brand) {
                  setCards((prev) => [
                    ...prev,
                    { id: Date.now(), last4: Math.floor(1000 + Math.random() * 9000).toString(), brand },
                  ]);
                  setShowDropdown(false);
                }
              }}
            >
              <option value="" disabled selected hidden>
                Add New Card
              </option>
              <option value="Visa">Visa</option>
              <option value="MasterCard">MasterCard</option>
              <option value="Amex">American Express</option>
            </select>
          </div>
          <img src={Vector} alt="Toggle Dropdown" className="cursor-pointer" />
        </div>
      </div>

      {/* Add New Payment Option Section */}
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-2">Add New Payment Option</label>
        <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
          <div className="flex items-center gap-3">
            <img src={FlutterWave} className="w-8 h-8" alt="Flutterwave" />
            <span className="text-gray-700 font-medium">Flutterwave</span>
          </div>
          <input
            type="checkbox"
            className="w-5 h-5 text-blue-500 border-gray-700 rounded-full focus:ring-blue-500 border-1 cursor-pointer appearance-none checked:bg-blue-500 checked:border-none"
          />
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
