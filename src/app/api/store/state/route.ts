import { NextResponse } from 'next/server';
import { allProducts } from '@/data/catalog';

export async function GET() {
  return NextResponse.json({
    inventory: allProducts,
    settings: {
      maintenanceMode: false,
      announcementBanner: '',
      supportEmail: 'hello@bedroomstudios.store',
      shippingLeadTime: 'Ships in 4-7 days',
      featuredFamily: 'Hybrid Builds',
      featuredMaterialFocus: 'Cast cement + PLA+',
      experimentalNotice: 'Bedroom Labs is for experiments, prototypes, and material tests.',
    }
  });
}
