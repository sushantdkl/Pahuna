/**
 * Shared action result type for all server actions.
 * Replaces per-action result interfaces to reduce duplication.
 */
export interface ActionResult<T = undefined> {
  success: boolean;
  error?: string;
  data?: T;
}
