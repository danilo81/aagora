import { z } from 'zod';

// ── Tasks ─────────────────────────────────────────────────────────────────

export const createTaskSchema = z.object({
    title: z.string().min(1, 'El título es requerido'),
    description: z.string().optional().nullable(),
    // Free-form string so each app can use its own status vocabulary
    status: z.string().optional().default('pendiente'),
    priority: z.string().optional().default('media'),
    dueDate: z.string().optional().nullable(),
    assignee: z.string().optional().nullable(),
    projectId: z.string().uuid().optional().nullable(),
});

export const updateTaskSchema = createTaskSchema.partial();

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

// ── Projects ──────────────────────────────────────────────────────────────

export const createProjectSchema = z.object({
    title: z.string().min(1, 'El nombre del proyecto es requerido'),
    description: z.string().optional().nullable(),
    client: z.string().optional().nullable(),
    location: z.string().optional().nullable(),
    projectType: z.string().optional().nullable(),
    area: z.number().optional(),
    status: z.string().optional(),
    imageUrl: z.string().optional().nullable(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;

// ── Project contact permissions ───────────────────────────────────────────

export const permissionsSchema = z.record(z.string(), z.boolean());
export type PermissionsInput = z.infer<typeof permissionsSchema>;

// ── Construction item library (create / update) ───────────────────────────

export const supplyInputSchema = z.object({
    id: z.string().optional(),
    typology: z.string().optional(),
    description: z.string(),
    unit: z.string(),
    price: z.number().optional(),
    quantity: z.number(),
    isNew: z.boolean().optional(),
});

export const qualityControlInputSchema = z.object({
    description: z.string(),
    subPoints: z.array(z.object({ description: z.string() })).optional(),
});

export type SupplyInput = z.infer<typeof supplyInputSchema>;
export type QualityControlInput = z.infer<typeof qualityControlInputSchema>;

// ── Construction item (project-level update) ──────────────────────────────

export const updateConstructionItemDataSchema = z.object({
    chapter: z.string().optional(),
    description: z.string().min(1).optional(),
    unit: z.string().optional(),
    performance: z.number().min(0).optional(),
    directCost: z.number().min(0).optional(),
    total: z.number().min(0).optional(),
});

export type UpdateConstructionItemData = z.infer<typeof updateConstructionItemDataSchema>;

// ── Supply (project-level update) ────────────────────────────────────────

export const updateSupplyDataSchema = z.object({
    typology: z.string().optional(),
    description: z.string().min(1).optional(),
    unit: z.string().optional(),
    price: z.number().min(0).optional(),
    tag: z.string().optional().nullable(),
});

export type UpdateSupplyData = z.infer<typeof updateSupplyDataSchema>;

// ── Customize project item (APU local) ───────────────────────────────────

export const customizeProjectItemSchema = z.object({
    chapter: z.string().min(1),
    description: z.string().min(1),
    unit: z.string().min(1),
    performance: z.number().positive(),
    directCost: z.number().min(0),
    total: z.number().min(0),
    supplies: z.array(z.object({
        supplyId: z.string().optional(),
        id: z.string().optional(),
        quantity: z.number().min(0),
    })).optional(),
});

export type CustomizeProjectItemInput = z.infer<typeof customizeProjectItemSchema>;

// ── Import supplies batch (CSV row) ──────────────────────────────────────

export const importSupplyRowSchema = z.object({
    Nombre: z.string().min(1),
    Unidad: z.string().min(1),
    Tipologia: z.enum(['Material', 'Mano de Obra', 'Equipo']).optional(),
    Costo: z.union([z.number(), z.string()]),
});

export type ImportSupplyRow = z.infer<typeof importSupplyRowSchema>;

// ── Calendar events ───────────────────────────────────────────────────────

export const createCalendarEventSchema = z.object({
    title: z.string().min(1, 'El título es requerido'),
    date: z.string().min(1, 'La fecha es requerida'),
    type: z.string().min(1, 'El tipo es requerido'),
    project: z.string().optional(),
    description: z.string().optional(),
});

export const updateCalendarEventSchema = createCalendarEventSchema;

export type CreateCalendarEventInput = z.infer<typeof createCalendarEventSchema>;
export type UpdateCalendarEventInput = z.infer<typeof updateCalendarEventSchema>;
