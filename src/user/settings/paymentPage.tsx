import MasterCard from "../../assets/icons/cdnlogo.com_mastercard 1.svg";
import Delete from "../../assets/icons/delete.svg";
import Card from "../../assets/icons/card.svg";
import Vector from "../../assets/icons/Vector.svg";
import FlutterWave from "../../assets/icons/flutterwaveLogo.svg"


const PaymentDetailsPage = ()=>{

    return (
        <div className="p-6 w-[50%]">
            {/* Manage Card Section */}
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-medium mb-2">Manage Card</label>
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <img
                        src={MasterCard}
                        alt="Mastercard Logo"
                        className="w-8 h-8"
                        />
                        <span className="text-gray-700 font-medium">****9818</span>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                        <img src={Delete} alt="" />
                    </button>
                </div>
            </div>

            {/* Add New Credit/Debit Card Section */}
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                Add New Credit / Debit Card
                </label>
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm cursor-pointer">
                    <select
                        className="appearance-none bg-transparent text-gray-700 font-medium cursor-pointe"
                    >
                        <option value="" disabled selected hidden>
                        Add New Card
                        </option>
                        <option value="visa">Visa</option>
                        <option value="mastercard">MasterCard</option>
                        <option value="amex">American Express</option>
                    </select>
                    <img src={Vector} alt="" />
                </div>
            </div>

            {/* Add New Payment Option Section */}
            <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                Add New Payment Option
                </label>
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <img
                        src={FlutterWave}
                        className="w-8 h-8"
                        />
                        <span className="text-gray-700 font-medium">Flutterwave</span>
                    </div>
                    <input
                        type="checkbox"
                        className="w-5 h-5 text-blue-500 border-gray-700 rounded-full focus:ring-blue-500 border-1 cursor-pointer appearance-none checked:bg-blue-500 checked:border-none"
                    />
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailsPage;