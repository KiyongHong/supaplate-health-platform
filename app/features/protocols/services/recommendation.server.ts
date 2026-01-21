
import { desc, arrayContains, sql, inArray } from "drizzle-orm";
import db from "~/core/db/drizzle-client.server";
import { hubermanProtocols } from "~/features/health/schema";

interface AnalysisResult {
    hba1c?: { status: string };
    ldl?: { status: string };
    hsCrp?: { status: string };
    // dynamic keys
    [key: string]: any; 
}

export async function getRecommendations(analysisResult: AnalysisResult) {
  // 1. Identify "Warning" or "Critical" biomarkers
  const targetBiomarkers: string[] = [];
  
  Object.entries(analysisResult).forEach(([key, value]) => {
     if (typeof value === 'object' && value !== null && 'status' in value) {
        if (value.status === 'warning' || value.status === 'critical') {
            targetBiomarkers.push(key); // e.g., "ldl", "hba1c"
        }
     }
  });

  if (targetBiomarkers.length === 0) {
      return [];
  }

  // 2. Query Protocols that are related to these biomarkers
  // We use arrayContains to find protocols where related_biomarkers array contains ANY of our target biomarkers
  // Drizzle doesn't have a simple "array overlaps" for postgres array yet in the typed builder easily without sql operator
  // So we might need to use `sql` operator or fetch all and filter if dataset is small (it is small for now)
  // Or use proper array overlap operator `&&`
  
  // For MVP with small dataset, let's just use a simple approach:
  // We will construct an OR condition for each target biomarker if arrayContains usage is tricky with multiple values
  // Or simpler: Use raw SQL for array overlap: related_biomarkers && ARRAY['ldl', 'hba1c']
  
  const recommendations = await db
    .select()
    .from(hubermanProtocols)
    .where(
        sql`${hubermanProtocols.related_biomarkers} && ${targetBiomarkers}`
    );

  return recommendations;
}
