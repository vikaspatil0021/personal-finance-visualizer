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
    date: Date
    description: string;
}

export default function TransanctionTable() {
    const [txns, set_txns] = useState<Txns[]>([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transaction');
                set_txns(response.data);

                console.log('Transaction saved:', response.data);

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                console.error('Error submitting transaction:', error.response?.data?.error || error.message);
                toast('Something went wrong');
            }
        };

        fetchTransactions();
    }, []);

    return (
        <div className="p- border rounded-lg mx-auto">
            <Table className="bg-white rounded-lg overflow-hidden">
                <TableHeader className="bg-[#fcfbfb]">
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
                        txns.length !== 0 && txns.map(({ _id, amount, date, description }) => {
                            return (
                                <TableRow key={_id}>
                                    <TableCell align="center">{new Date(date).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">{amount}</TableCell>
                                    <TableCell align="center">{description}</TableCell>
                                    <TableCell align="center" >
                                        <div className="flex gap-2 justify-center">
                                            <Button size="sm">Edit</Button>
                                            <Button size="sm" variant="outline">Delete</Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}