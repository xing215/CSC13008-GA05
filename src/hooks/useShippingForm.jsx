import { useState } from "react";
import { useForm } from "react-hook-form";

export const useShippingForm = () => {
    const {
        register,
        handleSubmit,
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
    };
};
