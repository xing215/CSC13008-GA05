import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { getProvinces, getWardsByProvinceCode } from "../services/addressService";

export const useShippingForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm({
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
    };

    return {
        register,
        errors,
        submittedData,
        handleShippingSubmit: handleSubmit(onSubmitLogic),
        handleAutoFillAddress,
        isLoadingAddress,
        provinces,
        wards,
    };
};
