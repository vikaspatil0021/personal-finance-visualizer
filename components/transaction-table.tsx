import axios from "axios";

import { useEffect, useState } from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";


type Txns = {
    _id: string;
    amount: number;
    date: string
    description: string;
}


function TransactionRowAction({
    _id, date, description, amount, fetchTransactions
}: {
    _id: string,
    date: string,
    description: string,
    amount: number,
    fetchTransactions: () => Promise<void>
}) {
    const [delete_btn, set_delete_btn] = useState(false);

    const delete_transaction_handler = async (_id: string) => {
        set_delete_btn(true)
        try {
            await axios.delete(`/api/transaction?id=${_id}`);

            fetchTransactions();
            toast.success('Transaction has been deleted');

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message, {
                description: "Please try again later.",
            });
        } finally {
            set_delete_btn(false);
        }
    }


    return (
        <TableRow key={_id}>
            <TableCell align="center">
                {
                    new Date(date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                    })
                }
            </TableCell>
            <TableCell align="center">{amount}</TableCell>
            <TableCell align="center">{description}</TableCell>
            <TableCell align="center" >
                <div className="flex gap-2 justify-center">
                    <Button size="sm">Edit</Button>
                    <Button size="sm" variant="outline"
                        onClick={() => delete_transaction_handler(_id)}
                        disabled={delete_btn}
                    >{delete_btn ? "Deleting" : "Delete"}</Button>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default function TransanctionTable() {
    const [txns, set_txns] = useState<Txns[]>([]);

    const fetchTransactions = async () => {
        try {
            const response = await axios.get('/api/transaction');
            set_txns(response.data);

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message, {
                description: "Please try again later.",
            });
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <div className="p- border rounded-lg mx-auto">
            <Table className="bg-white rounded-lg overflow-hidden">
                <TableHeader className="bg-[#999]/20">
                    <TableRow>
                        <TableHead className="text-center font-bold">Date</TableHead>
                        <TableHead className="text-center font-bold" >Amount</TableHead>
                        <TableHead className="text-center font-bold">Transaction</TableHead>
                        <TableHead className="text-center font-bold">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        txns.length === 0 && Array.from({ length: 5 }).map((_, idx: number) => {
                            return (
                                <>
                                    <TableRow key={idx}>
                                        <TableCell align="center"><Skeleton className="h-2 w-16" /></TableCell>
                                        <TableCell align="center"><Skeleton className="h-2 w-16" /></TableCell>
                                        <TableCell align="center"><Skeleton className="h-2 w-16" /></TableCell>
                                        <TableCell align="center">
                                            <div className="flex gap-2 justify-center">
                                                <Skeleton className="h-8 w-16" />
                                                <Skeleton className="h-8 w-16" />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </>
                            )
                        })
                    }
                    {
                        txns.length !== 0 && txns.map(({ _id, amount, date, description }: Txns) => {
                            return (
                                <TransactionRowAction
                                    key={_id}
                                    _id={_id}
                                    amount={amount}
                                    date={date}
                                    description={description}
                                    fetchTransactions={fetchTransactions}

                                />
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}