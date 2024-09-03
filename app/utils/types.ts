import { z } from "zod";

const profileSchema = z.object({
    firstname: z.string().min(1, "First name is required"),
    lastname: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    classyear: z.string().min(1, "Class year is required"),
    linkedin: z.string().optional(),
    github: z.string().optional(),
    bio: z.string().optional(),
    major: z.string().min(1, "Major is required"),
  });
  
type ProfileData = z.infer<typeof profileSchema>;

export { profileSchema };
export type { ProfileData };