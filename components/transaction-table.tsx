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
        <>
            <Table className="bg-white rounded-lg border p-5">
                <TableHeader className="bg-[#f2f2f2]">
                    <TableRow>
                        <TableHead >Amount</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Transaction</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        txns && txns.map(({ _id, amount, date, description }) => {
                            return (
                                    <TableRow key={_id}>
                                        <TableCell>{amount}</TableCell>
                                        <TableCell>{new Date(date).toLocaleDateString()}</TableCell>
                                        <TableCell>{description}</TableCell>
                                    </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </>
    )
}