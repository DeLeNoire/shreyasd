import prisma from '@/app/db/db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return empty array on error to allow build to complete
    return NextResponse.json([], { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
}
