import React from "react";
import { useShippingForm } from "./hooks/useShippingForm";
import { getProvinceName, getWardName } from "./services/addressService";

const FormRow = ({ label, error, children }) => (
    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-6">
        <label className="w-full md:w-1/4 text-base font-bold text-gray-700 pt-3">
            {label}
        </label>
        <div className="w-full md:w-3/4">
            {children}
            {error && (
                <p className="text-red-500 text-sm mt-1">{error.message}</p>
            )}
        </div>
    </div>
);

const ShippingForm = () => {
    const {
        register,
        errors,
        handleShippingSubmit,
        submittedData,
        handleAutoFillAddress,
        isLoadingAddress,
        provinces,
        wards,
    } = useShippingForm();

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-3xl bg-white rounded-lg shadow-md border border-gray-200 p-8">
                <h2 className="font-bold mb-6 text-center text-blue-600 text-2xl">
                    Enhanced Shipping Form
                </h2>

                <form onSubmit={handleShippingSubmit} className="space-y-6">
                    {/* Full Name */}
                    <FormRow label="Full Name" error={errors.fullName}>
                        <input
                            type="text"
                            {...register("fullName", {
                                required: "Full Name is required",
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="e.g. John Doe"
                        />
                    </FormRow>

                    {/* Email */}
                    <FormRow label="Email Address" error={errors.email}>
                        <input
                            type="text"
                            {...register("email", {
                                required: "Email is required",
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="e.g. john@example.com"
                        />
                    </FormRow>

                    {/* Phone Number*/}
                    <FormRow label="Phone Number" error={errors.phone}>
                        <input
                            type="text"
                            {...register("phone", {
                                required: "Phone Number is required",
                            })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                            placeholder="e.g. +84 901234567"
                        />
                    </FormRow>

                    {/* SECTION 2: SHIPPING ADDRESS */}
                    <div className="pt-6 border-t border-gray-100">
                        {/* House Number */}
                        <div className="space-y-6">
                            <FormRow
                                label="House Number"
                                error={errors.houseNumber}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        {...register("houseNumber", {
                                            required:
                                                "House Number is required",
                                            onBlur: (e) =>
                                                handleAutoFillAddress(
                                                    e.target.value
                                                ),
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                                        placeholder="e.g. 227"
                                    />
                                    {isLoadingAddress && (
                                        <div className="absolute right-3 top-3">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                                        </div>
                                    )}
                                </div>
                            </FormRow>

                            {/* Street */}
                            <FormRow label="Street" error={errors.street}>
                                <input
                                    type="text"
                                    {...register("street", {
                                        required: "Street Name is required",
                                    })}
                                    className={`w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                                        isLoadingAddress ? "bg-gray-50" : ""
                                    }`}
                                    placeholder="e.g. Nguyen Van Cu"
                                />
                            </FormRow>

                            {/* City */}
                            <FormRow label="City" error={errors.city}>
                                <div className="relative">
                                    <select
                                        {...register("city", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                                    >
                                        <option value="">Choose a city</option>
                                        {provinces.map((province) => (
                                            <option key={province.code} value={province.code}>
                                                {province.name_with_type}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </FormRow>

                            {/* Ward */}
                            <FormRow label="Ward" error={errors.ward}>
                                <div className="relative">
                                    <select
                                        {...register("ward", {
                                            required: true,
                                        })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                                    >
                                        <option value="">Choose a ward</option>
                                        {wards.map((ward) => (
                                            <option key={ward.code} value={ward.code}>
                                                {ward.name_with_type}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </FormRow>
                        </div>
                    </div>

                    {/* Footer / Submit */}
                    <div className="flex flex-col md:flex-row md:items-center gap-6 pt-4">
                        <div className="hidden md:block md:w-1/4"></div>
                        <div className="w-full md:w-3/4">
                            <button
                                type="submit"
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-md shadow transition-all hover:shadow-lg transform hover:-translate-y-0.5"
                            >
                                Submit Order
                            </button>
                        </div>
                    </div>
                </form>

                {submittedData && (
                    <div className="mt-8 ml-0 md:ml-[25%] p-6 bg-green-50 rounded-lg border border-green-200 shadow-sm animate-fade-in">
                        <h3 className="font-bold mb-4 text-green-800 text-lg border-b border-green-200 pb-2">
                            Order Summary
                        </h3>

                        <div className="space-y-3 text-gray-700 text-base">
                            <div className="flex flex-col sm:flex-row">
                                <span className="font-bold w-32 shrink-0">
                                    Full Name:
                                </span>
                                <span>{submittedData.fullName}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row">
                                <span className="font-bold w-32 shrink-0">
                                    Email:
                                </span>
                                <span>{submittedData.email}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row">
                                <span className="font-bold w-32 shrink-0">
                                    Phone:
                                </span>
                                <span>{submittedData.phone}</span>
                            </div>

                            <div className="flex flex-col sm:flex-row">
                                <span className="font-bold w-32 shrink-0">
                                    Address:
                                </span>
                                <span>
                                    {submittedData.houseNumber},{" "}
                                    {submittedData.street}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row">
                                <span className="font-bold w-32 shrink-0">
                                    Location:
                                </span>
                                <span className="uppercase">
                                    {getWardName(submittedData.ward)} - {getProvinceName(submittedData.city)}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShippingForm;
