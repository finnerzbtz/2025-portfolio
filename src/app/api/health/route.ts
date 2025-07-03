import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // You can add more health checks here
    // e.g., database connectivity, external API status, etc.
    
    return NextResponse.json(
      { 
        status: 'healthy', 
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
} 