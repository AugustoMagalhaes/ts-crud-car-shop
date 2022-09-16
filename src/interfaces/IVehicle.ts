import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z
    .string({
      required_error: 'Model is required',
      invalid_type_error: 'Model must be a string',
    })
    .min(3, { message: 'Model must be 3 or more characters long' }),
  year: z
    .number({
      required_error: 'Year is required',
      invalid_type_error: 'Year must be an integer',
    })
    .int()
    .refine((year) => year >= 1900 && year <= 2022, {
      message: 'Year must be between 1900 and 2022',
    }),
  color: z
    .string({
      required_error: 'Color is required',
      invalid_type_error: 'Color must be a string',
    })
    .min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.optional(z.boolean()),
  buyValue: z
    .number({
      required_error: 'BuyValue is required',
      invalid_type_error: 'BuyValue must be an integer',
    })
    .int(),
});

type IVehicle = z.infer<typeof vehicleZodSchema>;

export { vehicleZodSchema, IVehicle };
