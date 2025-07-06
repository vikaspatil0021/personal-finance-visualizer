
import dbConnect from '@/lib/mongodb';
import Transaction from '@/models/transaction';

import { NextRequest, NextResponse } from 'next/server';

// get data
export async function GET() {
    await dbConnect();

    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 });

        return NextResponse.json({ transactions });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });

    }
}

// create new record
export async function POST(req: NextRequest) {
    await dbConnect();

    try {
        const data = await req.json();
        const newTxn = await Transaction.create(data);

        return NextResponse.json(newTxn, { status: 201 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// update record
export async function PUT(req: NextRequest) {
    await dbConnect();

    try {
        const searchParams = req.nextUrl.searchParams;
        const _id = searchParams.get('id');

        const data = await req.json();

        const updatedTxn = await Transaction.findByIdAndUpdate(_id, data, { new: true });
        if (!updatedTxn) {
            return NextResponse.json({ error: 'Transaction not found' }, { status: 404 });
        }

        return NextResponse.json(updatedTxn, { status: 200 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

// delete record
export async function DELETE(req: NextRequest) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const _id = searchParams.get('id');

        const deletedTxn = await Transaction.deleteOne({ _id });


        return NextResponse.json(deletedTxn, { status: 200 });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
