import { describe, it, expect } from "vitest";
import { analyzeBiomarker, calculateOverallScore, StrictCriteria } from "./analysis.server";

describe("Analysis Engine", () => {
  describe("analyzeBiomarker", () => {
    it("should classify HbA1c correctly", () => {
      // Optimal: < 5.4%
      expect(analyzeBiomarker("hba1c", 5.0)).toEqual({ 
        status: "optimal", 
        score: 100, 
        target: StrictCriteria.hba1c.optimal 
      });
      
      // Warning: 5.4% - 5.6%
      expect(analyzeBiomarker("hba1c", 5.5)).toEqual({ 
        status: "warning", 
        score: 70, 
        target: StrictCriteria.hba1c.optimal 
      });

      // Critical: >= 5.7% (Pre-diabetes/Diabetes)
      expect(analyzeBiomarker("hba1c", 5.8)).toEqual({ 
        status: "critical", 
        score: 40, 
        target: StrictCriteria.hba1c.optimal 
      });
    });

    it("should classify LDL correctly based on Strict Criteria", () => {
      // Optimal: < 70 mg/dL
      expect(analyzeBiomarker("ldl", 60)).toEqual({ 
        status: "optimal", 
        score: 100, 
        target: StrictCriteria.ldl.optimal 
      });

      // Warning: 70 - 100 (Still better than standard norm < 130)
      expect(analyzeBiomarker("ldl", 85)).toEqual({ 
        status: "warning", 
        score: 75, 
        target: StrictCriteria.ldl.optimal 
      });

      // Critical: >= 110 (Standard says < 130 is okay, but Attia implies stricter control)
      // Let's assume for now 110 is cut off for critical in our engine
      expect(analyzeBiomarker("ldl", 140)).toEqual({ 
        status: "critical", 
        score: 50, 
        target: StrictCriteria.ldl.optimal 
      });
    });
  });

  describe("calculateOverallScore", () => {
    it("should calculate average score from biomarkers", () => {
      const results = [
        { status: "optimal", score: 100 },
        { status: "warning", score: 70 },
        { status: "critical", score: 40 },
      ] as any;

      const expectedScore = Math.round((100 + 70 + 40) / 3);
      expect(calculateOverallScore(results)).toBe(expectedScore);
    });
  });
});
