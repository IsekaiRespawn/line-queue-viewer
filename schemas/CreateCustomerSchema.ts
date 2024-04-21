import { z } from "zod"

export const CreateCustomerSchema = z.object({
    name: z.string()
})


export type CreateCustomerSchemaType = z.infer<typeof CreateCustomerSchema>;
