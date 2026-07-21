import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename') || 'upload.png';
    
    // Return mock image URL (or place in local storage)
    return NextResponse.json({ 
      success: true, 
      url: '/images/brutalist-cement-desk-lamp.png' 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
