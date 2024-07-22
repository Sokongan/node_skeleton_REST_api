import { User } from "@prisma/client";

export type userDTO = Omit<User,'id'>;
