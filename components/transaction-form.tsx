"use client"

import axios from "axios";

import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";


type FormInputs = {
    amount: number;
    date: string
    description: string;
}
type TxnWithId = FormInputs & {
    _id: string;
};


export default function TransactionForm({
    type,
    data,
    fetchTransactions,
    set_open
}: {
    type: "new" | "edit"
    data?: TxnWithId,
    fetchTransactions?: () => Promise<void>
    set_open?: Dispatch<SetStateAction<boolean>>
}) {
    const [btn_loading, set_btn_loading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            ...data,
            date: data ? new Date(data.date).toISOString().split("T")[0] : "",
        }
    });




    const onSubmit = async (formdata: FormInputs) => {
        set_btn_loading(true);
        try {
            let response;
            if (type == 'new') {
                response = await axios.post('/api/transaction', formdata); //new
            } else {
                response = await axios.put(`/api/transaction?id=${data?._id}`, formdata); //update
                if (fetchTransactions && set_open) {
                    fetchTransactions();
                    set_open(false);
                }
            }

            if (response.status = 200) {
                reset()
                toast.success(`Transaction has been ${type == 'new' ? "created" : "updated"}`);
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message, {
                description: "Please try again later.",
            });
        } finally {
            set_btn_loading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-md w-full p-5 mx-auto space-y-6 bg-white border rounded-lg">
                <div>
                    <Label htmlFor="amount" className="block text-sm font-medium mb-1">Amount:</Label>
                    <Input
                        id="amount"
                        type="number"
                        placeholder="Enter Amount:"
                        className="bg-[#f1f1f1]/50"
                        {...register('amount', {
                            required: 'Amount is required',
                            validate: (value) => value > 0 || 'Amount must be greater than zero',
                        })}
                    />
                    {errors.amount && (
                        <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="date" className="block text-sm font-medium mb-1">Date:</Label>
                    <Input
                        id="date"
                        type="date"
                        placeholder="Enter Date:"
                        className="bg-[#f1f1f1]/50"
                        {...register('date', { required: 'Date is required' })}
                    />
                    {errors.date && (
                        <p className="text-sm text-red-500 mt-1">{errors.date.message}</p>
                    )}
                </div>

                <div>
                    <Label htmlFor="description" className="block text-sm font-medium mb-1">Description:</Label>
                    <Input
                        id="description"
                        placeholder="Enter description:"
                        className="bg-[#f1f1f1]/50"
                        {...register('description', { required: 'description is required' })}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>
                    )}
                </div>
                <Button type="submit" className="w-full" disabled={btn_loading}>
                    {type === "new" && (btn_loading ? "Submitting" : "Submit")}
                    {type === "edit" && (btn_loading ? "Updating" : "Update")}
                </Button>
            </form>

        </>
    )
}