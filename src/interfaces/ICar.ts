import { z } from 'zod';
import { vehicleZodSchema } from './IVehicle';

const carZodSchema = vehicleZodSchema.extend({
  doorsQty: z
    .number({
      required_error: 'DoorsQty is required',
      invalid_type_error: 'DoorsQty must be an integer',
    })
    .int()
    .refine((qty) => qty >= 2 && qty <= 4, {
      message: 'DoorsQty must be between 2 and 4',
    }),
  seatsQty: z
    .number({
      required_error: 'SeatsQty is required',
      invalid_type_error: 'SeatsQty must be a number',
    })
    .int()
    .refine((qty) => qty >= 2 && qty <= 7, {
      message: 'SeatsQty must be between 2 and 7',
    }),
});

type ICar = z.infer<typeof carZodSchema>;

export { carZodSchema, ICar };
