import { NextResponse } from 'next/server';
import prisma from '../../../../../prisma/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }) {
        const userId = params.userId;

  try {
    const prescription = await prisma.prescription.findMany({where: {userId}});

    // console.log(NextResponse.json(prescription));

    // return NextResponse.json(prescription);
    return new Response(JSON.stringify(prescription))
  } catch (error) {
    console.log(error)
    console.error('Error saving prescription to database:', error);
    return NextResponse.json({ error: 'Error saving prescription' }, { status: 500 });
  }
}
