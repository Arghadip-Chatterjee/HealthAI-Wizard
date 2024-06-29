import { NextResponse } from 'next/server';
import prisma from '../../../../prisma/lib/prisma';

export async function POST(request: Request) {
  const { file_url, file_name, userId } = await request.json();

  console.log({file_url, file_name, userId});

  try {
    const prescription = await prisma.prescription.create({
      data: {
        file_url,
        file_name,
        userId,
      },
    });

    // console.log(NextResponse.json(prescription));

    // return NextResponse.json(prescription);
    return new Response(JSON.stringify(prescription))
  } catch (error) {
    console.log(error)
    console.error('Error saving prescription to database:', error);
    return NextResponse.json({ error: 'Error saving prescription' }, { status: 500 });
  }
}
