import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function NewUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pan: "",
    vehicleReg: "",
    upiId: "",
    address: {
      street: "",
      city: "",
      state: "",
      postalCode: "",
    },
    termsConsent: false,
    trackingConsent: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required.";
    if (!formData.phone) formErrors.phone = "Phone number is required.";
    if (!formData.pan)
      formErrors.pan = "Pan number is required.";
    if (!formData.vehicleReg)
      formErrors.vehicleReg = "Vehicle registration number is required.";
    if (!formData.upiId) formErrors.upiId = "UPI ID is required.";
    if (!formData.address.street)
      formErrors.street = "Street address is required.";
    if (!formData.address.city) formErrors.city = "City is required.";
    if (!formData.address.state) formErrors.state = "State is required.";
    if (!formData.address.postalCode)
      formErrors.postalCode = "Postal code is required.";
    if (!formData.termsConsent)
      formErrors.termsConsent = "You must accept the terms.";
    if (!formData.trackingConsent)
      formErrors.trackingConsent = "You must agree to tracking.";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch("https://scan-go-server.vercel.app/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Form submitted successfully!");
          setFormData({
            name: "",
            phone: "",
            pan: "",
            vehicleReg: "",
            upiId: "",
            address: {
              street: "",
              city: "",
              state: "",
              postalCode: "",
            },
            termsConsent: false,
            trackingConsent: false,
          });
          setErrors({});
          navigate("/success");
        } else {
          const errorData = await response.json();
          alert(`Submission failed: ${errorData.message || "Unknown error"}`);
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        alert(
          "An error occurred while submitting the form. Please try again later."
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Driver Registration
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Phone Number */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Pan */}
          <div className="mb-4">
            <label
              htmlFor="pan"
              className="block text-gray-700 font-medium mb-2"
            >
              PAN:
            </label>
            <input
              type="text"
              id="pan"
              name="pan"
              value={formData.pan}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.pan && (
              <p className="text-red-500 text-sm mt-1">{errors.cabLicense}</p>
            )}
          </div>

          {/* Vehicle Registration */}
          <div className="mb-4">
            <label
              htmlFor="vehicleReg"
              className="block text-gray-700 font-medium mb-2"
            >
              Vehicle Registration Number:
            </label>
            <input
              type="text"
              id="vehicleReg"
              name="vehicleReg"
              value={formData.vehicleReg}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.vehicleReg && (
              <p className="text-red-500 text-sm mt-1">{errors.vehicleReg}</p>
            )}
          </div>

          {/* UPI ID */}
          <div className="mb-4">
            <label
              htmlFor="upiId"
              className="block text-gray-700 font-medium mb-2"
            >
              UPI ID:
            </label>
            <input
              type="text"
              id="upiId"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.upiId && (
              <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
            )}
          </div>

          {/* Address Block */}
          <div className="mb-4">
            <label
              htmlFor="street"
              className="block text-gray-700 font-medium mb-2"
            >
              Street Address:
            </label>
            <input
              type="text"
              id="street"
              name="street"
              value={formData.address.street}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.street && (
              <p className="text-red-500 text-sm mt-1">{errors.street}</p>
            )}
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="flex-1">
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-2"
              >
                City:
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.address.city}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>
            <div className="flex-1">
              <label
                htmlFor="state"
                className="block text-gray-700 font-medium mb-2"
              >
                State:
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.address.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && (
                <p className="text-red-500 text-sm mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="postalCode"
              className="block text-gray-700 font-medium mb-2"
            >
              Postal Code:
            </label>
            <input
              type="text"
              id="postalCode"
              name="postalCode"
              value={formData.address.postalCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
            )}
          </div>

          {/* Terms and Consent Checkboxes */}
          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="termsConsent"
                name="termsConsent"
                checked={formData.termsConsent}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded text-blue-600"
              />
              <label htmlFor="termsConsent" className="ml-2 text-gray-700">
                I accept the terms and conditions.
              </label>
            </div>
            {errors.termsConsent && (
              <p className="text-red-500 text-sm mt-1">{errors.termsConsent}</p>
            )}
          </div>

          <div className="mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="trackingConsent"
                name="trackingConsent"
                checked={formData.trackingConsent}
                onChange={handleChange}
                className="h-4 w-4 border-gray-300 rounded text-blue-600"
              />
              <label htmlFor="trackingConsent" className="ml-2 text-gray-700">
                I agree to the tracking of my referrals.
              </label>
            </div>
            {errors.trackingConsent && (
              <p className="text-red-500 text-sm mt-1">
                {errors.trackingConsent}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewUser;
