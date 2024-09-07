import prisma from '@/app/db/db';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { category: string } , response:NextResponse }) {
  const { category } = params;

  try {
    let projects = [];

    switch (category) {
      case 'Websites':
        projects = await prisma.website.findMany({
          include: { hooks: true},
        });
        break;
      case 'AI Stuff':
        projects = await prisma.aI.findMany({
          include: { hooks: true},
        });
        break;
      case 'Quant':
        projects = await prisma.quant.findMany({
          include: { hooks: true },
        });
        break;
      case 'Blockchain':
        projects = await prisma.blockChain.findMany({
          include: { hooks: true },
        });
        break;
      case 'Collabs':
        projects = await prisma.collab.findMany({
          include: { hooks: true},
        });
        break;
      case 'Miscellaneous':
        projects = await prisma.miscellaneous.findMany({
          include: { hooks: true },
        });
        break;
      default:
        return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
    }

    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
