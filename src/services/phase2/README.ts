// =============================================================================
// Future Service Interfaces — Phase 2+
// =============================================================================
//
// These files define the SERVICE API for features not yet built.
// They import types from src/lib/types/booking.ts and src/lib/types/platform.ts.
//
// PURPOSE:
//   - Document the intended API before building it
//   - Ensure Phase 1 code doesn't accidentally depend on unbuilt features
//   - Let developers understand what's coming and how it connects
//
// WHEN TO ACTIVATE:
//   1. Move the relevant Prisma models from schema.future.prisma → schema.prisma
//   2. Run the migration
//   3. Replace the `throw new Error("Not implemented")` with real Prisma queries
//   4. Move the file from src/services/phase2/ → src/services/
//   5. Add to the barrel export in src/services/index.ts
//
// =============================================================================

export {};
