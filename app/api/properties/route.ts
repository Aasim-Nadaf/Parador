import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        isActive: true,
      },
      include: {
        bookings: true,
        reviews: true,
      },
    });

    return NextResponse.json(properties);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const property = await prisma.property.create({
      data: {
        hostId: body.hostId,
        title: body.title,
        description: body.description,
        location: body.location,
        pricePerNight: body.pricePerNight,
        maxGuests: body.maxGuests,
        bedrooms: body.bedrooms,
        bathrooms: body.bathrooms,
        amenities: body.amenities || [],
        images: body.images || [],
      },
    });

    return NextResponse.json(property);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      { error: "Failed to create property" },
      { status: 500 }
    );
  }
}
