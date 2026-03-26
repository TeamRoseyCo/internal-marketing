// src/app/api/case-studies/route.ts
// Fetches case study content from the Analytics Dashboard database

import { NextResponse } from 'next/server';
import { getDashboardClient } from '@/lib/dashboard-supabase';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  try {
    const supabase = getDashboardClient();

    let query = supabase
      .from('case_study_content')
      .select(`
        challenge,
        approach,
        services,
        highlights,
        testimonial,
        testimonial_by,
        industry_context,
        clients!inner (
          name,
          slug,
          domain,
          is_internal
        )
      `)
      .not('challenge', 'is', null)
      .eq('clients.is_internal', false);

    if (slug) {
      query = query.eq('clients.slug', slug);
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Flatten the joined data
    const caseStudies = (data || []).map((item: Record<string, unknown>) => {
      const client = item.clients as Record<string, string>;
      return {
        client_name: client.name,
        client_slug: client.slug,
        client_domain: client.domain,
        challenge: item.challenge,
        approach: item.approach,
        services: item.services || [],
        highlights: item.highlights || [],
        testimonial: item.testimonial,
        testimonial_by: item.testimonial_by,
        industry_context: item.industry_context,
      };
    });

    return NextResponse.json(caseStudies, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}
