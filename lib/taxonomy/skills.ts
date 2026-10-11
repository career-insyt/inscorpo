/**
 * INSYT Credential Authority — Labor Market Taxonomy Crosswalk
 *
 * Maps INSYT competencies and learning tracks directly to international labor standards:
 * - ESCO v1.2 (European Skills, Competences, Qualifications and Occupations)
 * - O*NET SOC 2019 (Occupational Information Network)
 * - World Economic Forum (WEF) Global Skills Taxonomy
 *
 * Formats standards-compliant Open Badges 3.0 / W3C VC 2.0 `alignment` objects.
 */

export interface TaxonomyAlignment {
  targetName: string;
  targetUrl: string;
  targetDescription: string;
  targetFramework: 'ESCO v1.2' | 'O*NET SOC 2019' | 'WEF Global Skills Taxonomy';
  targetCode: string;
}

export interface TrackTaxonomyDefinition {
  trackId: string;
  trackName: string;
  primaryOnetCode: string;
  primaryOnetTitle: string;
  alignments: TaxonomyAlignment[];
}

export const TRACK_TAXONOMIES: Record<string, TrackTaxonomyDefinition> = {
  'financial-modeling': {
    trackId: 'financial-modeling',
    trackName: 'Advanced Financial Modeling & Valuation',
    primaryOnetCode: '13-2051.00',
    primaryOnetTitle: 'Financial and Investment Analysts',
    alignments: [
      {
        targetName: 'Financial Analysis',
        targetUrl: 'http://data.europa.eu/esco/skill/e322d765-728b-4a46-81aa-7c08a98ddc5f',
        targetDescription: 'Apply financial analysis techniques to assess economic viability, capital structures, and enterprise performance.',
        targetFramework: 'ESCO v1.2',
        targetCode: 'http://data.europa.eu/esco/skill/e322d765-728b-4a46-81aa-7c08a98ddc5f',
      },
      {
        targetName: 'Financial and Investment Analysts',
        targetUrl: 'https://www.onetonline.org/link/summary/13-2051.00',
        targetDescription: 'Conduct quantitative analyses of information affecting investment programs of public or private institutions.',
        targetFramework: 'O*NET SOC 2019',
        targetCode: '13-2051.00',
      },
      {
        targetName: 'Analytical Thinking & Financial Fluency',
        targetUrl: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023',
        targetDescription: 'Synthesizing complex numerical data into predictive discounted cash flow (DCF) and three-statement models.',
        targetFramework: 'WEF Global Skills Taxonomy',
        targetCode: 'WEF-COG-01',
      },
    ],
  },
  'corporate-finance': {
    trackId: 'corporate-finance',
    trackName: 'Corporate Finance & Capital Markets',
    primaryOnetCode: '13-2052.00',
    primaryOnetTitle: 'Personal and Commercial Financial Advisors',
    alignments: [
      {
        targetName: 'Capital Structure Optimization',
        targetUrl: 'http://data.europa.eu/esco/skill/f9a8b122-3112-4e88-bc91-23d91c784e11',
        targetDescription: 'Analyze debt-equity ratios, cost of capital (WACC), and enterprise liquidity needs.',
        targetFramework: 'ESCO v1.2',
        targetCode: 'http://data.europa.eu/esco/skill/f9a8b122-3112-4e88-bc91-23d91c784e11',
      },
      {
        targetName: 'Securities, Commodities, and Financial Services',
        targetUrl: 'https://www.onetonline.org/link/summary/41-3031.00',
        targetDescription: 'Buy and sell securities or commodities in investment and trading firms.',
        targetFramework: 'O*NET SOC 2019',
        targetCode: '41-3031.00',
      },
      {
        targetName: 'Systems Thinking & Economic Foresight',
        targetUrl: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023',
        targetDescription: 'Understanding complex interconnected capital market mechanisms and regulatory frameworks.',
        targetFramework: 'WEF Global Skills Taxonomy',
        targetCode: 'WEF-SYS-04',
      },
    ],
  },
  'excel-foundations': {
    trackId: 'excel-foundations',
    trackName: 'Spreadsheet Engineering & Business Intelligence',
    primaryOnetCode: '15-1254.00',
    primaryOnetTitle: 'Database Developers & Analysts',
    alignments: [
      {
        targetName: 'Spreadsheet Software Operation',
        targetUrl: 'http://data.europa.eu/esco/skill/c4e88e22-8d76-47b2-a42e-13e54b670f90',
        targetDescription: 'Utilize specialized formulas, lookup matrices, dynamic arrays, and multi-variable pivot models.',
        targetFramework: 'ESCO v1.2',
        targetCode: 'http://data.europa.eu/esco/skill/c4e88e22-8d76-47b2-a42e-13e54b670f90',
      },
      {
        targetName: 'Data Warehousing and Business Intelligence Analysts',
        targetUrl: 'https://www.onetonline.org/link/summary/15-1254.00',
        targetDescription: 'Analyze business data to produce reports, trends, and models that assist in managerial decision-making.',
        targetFramework: 'O*NET SOC 2019',
        targetCode: '15-1254.00',
      },
      {
        targetName: 'Technological Literacy & Data Synthesis',
        targetUrl: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023',
        targetDescription: 'Leveraging data-driven spreadsheet modeling to optimize operational performance.',
        targetFramework: 'WEF Global Skills Taxonomy',
        targetCode: 'WEF-TECH-02',
      },
    ],
  },
  'case-interview-prep': {
    trackId: 'case-interview-prep',
    trackName: 'Management Consulting & Strategic Problem Solving',
    primaryOnetCode: '13-1111.00',
    primaryOnetTitle: 'Management Analysts',
    alignments: [
      {
        targetName: 'Business Strategy Formulation',
        targetUrl: 'http://data.europa.eu/esco/skill/3d99cb11-1204-45aa-b8ef-82ccf91890ab',
        targetDescription: 'Formulate hypotheses, synthesize market sizing estimations, and solve unstructured corporate challenges.',
        targetFramework: 'ESCO v1.2',
        targetCode: 'http://data.europa.eu/esco/skill/3d99cb11-1204-45aa-b8ef-82ccf91890ab',
      },
      {
        targetName: 'Management Analysts',
        targetUrl: 'https://www.onetonline.org/link/summary/13-1111.00',
        targetDescription: 'Conduct organizational studies and evaluations, design systems and procedures, and conduct work simplification studies.',
        targetFramework: 'O*NET SOC 2019',
        targetCode: '13-1111.00',
      },
      {
        targetName: 'Complex Problem-Solving & Leadership',
        targetUrl: 'https://www.weforum.org/reports/the-future-of-jobs-report-2023',
        targetDescription: 'Structuring ambiguous commercial problems and leading executive stakeholders toward actionable solutions.',
        targetFramework: 'WEF Global Skills Taxonomy',
        targetCode: 'WEF-LEAD-03',
      },
    ],
  },
};

/**
 * Returns standards-compliant Open Badges 3.0 alignments for a given track or badge name
 */
export function getTaxonomyAlignments(trackIdOrName: string): TaxonomyAlignment[] {
  const normalizedKey = trackIdOrName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  if (TRACK_TAXONOMIES[normalizedKey]) {
    return TRACK_TAXONOMIES[normalizedKey].alignments;
  }

  // Fallback search across definitions
  for (const track of Object.values(TRACK_TAXONOMIES)) {
    if (
      track.trackName.toLowerCase().includes(trackIdOrName.toLowerCase()) ||
      trackIdOrName.toLowerCase().includes(track.trackId)
    ) {
      return track.alignments;
    }
  }

  // Default corporate analyst taxonomy if unlisted
  return [
    {
      targetName: 'Business and Financial Operations',
      targetUrl: 'https://www.onetonline.org/link/summary/13-2051.00',
      targetDescription: 'Quantitative business analysis and strategic operational planning.',
      targetFramework: 'O*NET SOC 2019',
      targetCode: '13-2051.00',
    },
    {
      targetName: 'Commercial Competence',
      targetUrl: 'http://data.europa.eu/esco/skill/e322d765-728b-4a46-81aa-7c08a98ddc5f',
      targetDescription: 'Application of professional corporate methodology.',
      targetFramework: 'ESCO v1.2',
      targetCode: 'ESCO-GEN-01',
    },
  ];
}
