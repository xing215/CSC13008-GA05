import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProvinces, getWardsByProvinceCode } from "../services/addressService";

const STORAGE_KEY = 'shippingFormData';

export const useShippingForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm({
        mode: "onBlur",
        defaultValues: {
            fullName: "",
            email: "",
            phone: "",
            houseNumber: "",
            street: "",
            city: "",
            ward: "",
        },
    });

    const [submittedData, setSubmittedData] = useState(null);
    const [isLoadingAddress, setIsLoadingAddress] = useState(false);

    const [provinces, setProvinces] = useState([]);
    const [wards, setWards] = useState([]);

    // Validation patterns for form fields 
    const validationPatterns = {
        name: {
            value: /^[\p{L}\s]+$/u, 
            message: "Invalid name. Use letters only",
        },
        email: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email address",
        },
        phone: {
            value: /^(?:\+84|0)(3|5|7|8|9)[0-9]{8}$/,
            message: "Invalid phone number. Ex: +84901234567 or 0912345678",
        },
    };


    // Load from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem(STORAGE_KEY);
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                reset(parsedData);
                console.log('Loaded saved data:', parsedData);
            } catch (error) {
                console.error('Error loading saved form data:', error);
            }
        }
    }, [reset]);

    useEffect(() => {
        const data = getProvinces();
        setProvinces(data);
    }, []);

    const selectedCityCode = watch("city");

    useEffect(() => {
        if (selectedCityCode) {
            const filteredWards = getWardsByProvinceCode(selectedCityCode);
            setWards(filteredWards);
            
            setValue("ward", ""); 
        } else {
            setWards([]);
        }
    }, [selectedCityCode, setValue]);

    // Watch all form values for autosave
    const watchedValues = watch();

    useEffect(() => {
        if (!submittedData) {
            const hasData = Object.values(watchedValues).some(value => value !== "");
            if (hasData) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(watchedValues));
                console.log('Saved data:', watchedValues);
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
    }, [watchedValues, submittedData]);

    const handleAutoFillAddress = async (houseInput) => {
        if (!houseInput) return;
        setIsLoadingAddress(true);
        try {
            // TODO: gọi API
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingAddress(false);
        }
    };

    const onSubmitLogic = (data) => {
        setSubmittedData(data);
        localStorage.removeItem(STORAGE_KEY);
        setValue("fullName", "");
        setValue("email", "");
        setValue("phone", "");
        setValue("houseNumber", "");
        setValue("street", "");
        setValue("city", "");
        setValue("ward", "");
    };

    const handleClear = () => {
        setValue("fullName", "");
        setValue("email", "");
        setValue("phone", "");
        setValue("houseNumber", "");
        setValue("street", "");
        setValue("city", "");
        setValue("ward", "");
        localStorage.removeItem(STORAGE_KEY);
        setSubmittedData(null);
    };

    return {
        register,
        errors,
        submittedData,
        handleShippingSubmit: handleSubmit(onSubmitLogic),
        handleAutoFillAddress,
        validationPatterns,
        isLoadingAddress,
        provinces,
        wards,
        handleClear,
        watch,
    };
};
