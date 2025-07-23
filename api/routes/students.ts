import { Hono } from "hono";
import drizzle from "../db/drizzle.js";
import { students } from "../db/schema.js";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";
import dayjs from "dayjs";

const studentsRouter = new Hono();

// Get all students
studentsRouter.get("/", async (c) => {
  const allStudents = await drizzle.select().from(students);
  return c.json(allStudents);
});

// Get student by stid
studentsRouter.get("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const result = await drizzle.query.students.findFirst({
    where: eq(students.stid, id),
  });
  if (!result) {
    return c.json({ error: "Student not found" }, 404);
  }
  return c.json(result);
});

// Create a new student
studentsRouter.post(
  "/",
  zValidator(
    "json",
    z.object({
      stid: z.number().int(),
      name: z.string().min(1),
      surname: z.string().min(1),
      birthday: z.string().transform((d) => dayjs(d).format("YYYY-MM-DD")),
      gender: z.string().min(1),
    })
  ),
  async (c) => {
    const { stid, name, surname, birthday, gender } = c.req.valid("json");
    const result = await drizzle
      .insert(students)
      .values({ stid, name, surname, birthday, gender })
      .returning();
    return c.json({ success: true, student: result[0] }, 201);
  }
);

// Update student by stid
studentsRouter.patch(
  "/:id",
  zValidator(
    "json",
    z.object({
      name: z.string().min(1).optional(),
      surname: z.string().min(1).optional(),
      birthday: z.string().optional().transform((d) => (d ? dayjs(d).format("YYYY-MM-DD") : undefined)),
      gender: z.string().optional(),
    })
  ),
  async (c) => {
    const id = Number(c.req.param("id"));
    const data = c.req.valid("json");
    const updated = await drizzle.update(students).set(data).where(eq(students.stid, id)).returning();
    if (updated.length === 0) {
      return c.json({ error: "Student not found" }, 404);
    }
    return c.json({ success: true, student: updated[0] });
  }
);

// Delete student by stid
studentsRouter.delete("/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const deleted = await drizzle.delete(students).where(eq(students.stid, id)).returning();
  if (deleted.length === 0) {
    return c.json({ error: "Student not found" }, 404);
  }
  return c.json({ success: true, student: deleted[0] });
});

export default studentsRouter;
