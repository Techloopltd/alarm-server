import { z } from 'zod';

const createValidation = z.object({
  body: z.object({}),
});
const updateValidation = z.object({
  body: z.object({}),
});
const bulkDeleteValidation = z.object({
  body: z.array(z.string()),
});
export const UserValidation = {
  createValidation,
  updateValidation,
  bulkDeleteValidation,
};
