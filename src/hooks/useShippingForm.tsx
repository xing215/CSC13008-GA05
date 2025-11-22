import { useState } from "react";
import { useForm } from "react-hook-form";

export interface ShippingFormValues {
    houseNumber: string;
    street: string;
    city: string;
    ward: string;
}

export const useShippingForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ShippingFormValues>({
        defaultValues: {
            houseNumber: "",
            street: "",
            city: "",
            ward: "",
        },
    });

    const [submittedData, setSubmittedData] =
        useState<ShippingFormValues | null>(null);
    const onSubmitLogic = (data: ShippingFormValues) => {
        // TODO: Xử lý sau khi submit

        console.log("Processing data...", data);
        setSubmittedData(data);
    };

    return {
        register,
        errors,
        submittedData,
        handleShippingSubmit: handleSubmit(onSubmitLogic),
    };
};
