import React from "react";
import { useShippingForm } from "./hooks/useShippingForm"; // Import hook vừa tạo

const ShippingForm = () => {
    // Gọi custom hook để lấy logic
    const { register, errors, handleShippingSubmit, submittedData } =
        useShippingForm();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md border border-gray-200 p-6">
                <h2 className="font-bold mb-6 text-center text-blue-600 text-2xl">
                    Enhanced Shipping Form
                </h2>

                {/* Form */}
                <form onSubmit={handleShippingSubmit} className="space-y-5">
                    {/* House Number */}
                    <div>
                        <label className="block text-base font-bold text-black mb-2">
                            House Number
                        </label>
                        <input
                            type="text"
                            {...register("houseNumber", {
                                required: "Please enter house number!",
                            })}
                            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter house number ..."
                        />
                        {errors.houseNumber && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.houseNumber.message}
                            </p>
                        )}
                    </div>

                    {/* Street */}
                    <div>
                        <label className="block text-base font-bold text-black mb-2">
                            Street
                        </label>
                        <input
                            type="text"
                            {...register("street", {
                                required: "Please enter street!",
                            })}
                            className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="Enter street ... "
                        />
                        {errors.street && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.street.message}
                            </p>
                        )}
                    </div>

                    {/* City */}
                    <div>
                        <label className="block text-base font-bold text-black mb-2">
                            City
                        </label>
                        <div className="relative">
                            <select
                                {...register("city", { required: true })}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="" className="text-slate-500">
                                    Select a city
                                </option>
                                <option value="hcm">
                                    Thành phố Hồ Chí Minh
                                </option>
                                <option value="hn">Hà Nội</option>
                                <option value="dn">Đà Nẵng</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Ward */}
                    <div>
                        <label className="block text-base font-bold text-black mb-2">
                            Ward
                        </label>
                        <div className="relative">
                            <select
                                {...register("ward", { required: true })}
                                className="w-full px-3 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="">Select a ward</option>
                                <option value="cho_quan">Chợ Quán</option>
                                <option value="phuong_1">Phường 1</option>
                                <option value="phuong_2">Phường 2</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg
                                    className="fill-current h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-md shadow mt-6 transition-colors"
                    >
                        Submit
                    </button>
                </form>

                {/* Hiển thị kết quả  */}
                {submittedData && (
                    <div className="mt-6 p-4 bg-gray-100 rounded text-sm font-mono overflow-auto border border-gray-300">
                        <ul>
                            <li>House num: {submittedData.houseNumber}</li>
                            <li>Street: {submittedData.street}</li>
                            <li>City: {submittedData.city}</li>
                            <li>Ward: {submittedData.ward}</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShippingForm;
