import axios from "axios";
import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import { toast } from "sonner";
type Txn = {
    _id: string;
    amount: number;
    date: string
    description: string;
}

export default function MonthlyBarChart() {
    const [txns, set_txns] = useState<Txn[]>([]);

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
    }, [])

    const grouped = txns && txns.reduce<Record<string, number>>((acc, txn) => {
        const month = new Date(txn.date).toLocaleDateString('en-IN', {
            month: 'short',
        })
        acc[month] = (acc[month] || 0) + txn.amount;
        return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([month, total]) => ({
        month,
        amount: total,
    }));

    chartData.sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());


    return (

        <div className=" bg-white  p-2 md:p-5 rounded-lg border">
            <div className="w-full text-center py-3">
                Monthly expenses bar chart
            </div>
            <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%" className='h-96'>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis dataKey='amount' />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
