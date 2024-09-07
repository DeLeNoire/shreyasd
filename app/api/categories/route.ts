import prisma from '@/app/db/db';
import { NextResponse } from 'next/server';


export async function GET() {
  try {
    // Fetch categories from the database
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  } finally {
    // Close the PrismaClient connection
    await prisma.$disconnect();
  }
}
