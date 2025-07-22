import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function GET() {

    const notes = await prisma.note.findMany();
    console.log(notes);
    return NextResponse.json({
        message: 'Hello from the API!'
    });
}

export function POST() {
    return NextResponse.json({
        message: 'Data received successfully!'
    });
}