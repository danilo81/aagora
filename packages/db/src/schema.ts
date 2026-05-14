import { 
    pgTable, 
    text, 
    timestamp, 
    uuid, 
    boolean, 
    doublePrecision, 
    integer, 
    jsonb, 
    uniqueIndex
} from "drizzle-orm/pg-core";
import { organization } from "./auth-db/schema";
export * from "./auth-db/schema";

// --- SECTION 1: Core Projects ---

export const project = pgTable("Project", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    client: text("client"),
    location: text("location"),
    projectType: text("projectType"),
    area: doublePrecision("area").notNull().default(0),
    status: text("status").notNull().default("activo"),
    imageUrl: text("imageUrl"),
    startDate: timestamp("startDate"),
    authorId: text("authorId"),
    organizationId: uuid("organizationId").references(() => organization.id),
    consolidatedAt: timestamp("consolidatedAt"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const projectConfig = pgTable("ProjectConfig", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().unique().references(() => project.id),
    utility: doublePrecision("utility").notNull().default(10),
    adminExpenses: doublePrecision("adminExpenses").notNull().default(5),
    iva: doublePrecision("iva").notNull().default(13),
    it: doublePrecision("it").notNull().default(3),
    socialCharges: doublePrecision("socialCharges").notNull().default(55),
    toolWear: doublePrecision("toolWear").notNull().default(3),
    exchangeRate: doublePrecision("exchangeRate").notNull().default(6.96),
    financing: doublePrecision("financing").notNull().default(0),
    guaranteeRetention: doublePrecision("guaranteeRetention").notNull().default(7),
    mainCurrency: text("mainCurrency").default("BS"),
    secondaryCurrency: text("secondaryCurrency").default("USD"),
    workingDays: integer("workingDays").default(6),
    workingDaysSelection: integer("workingDaysSelection").array().notNull().default([1, 2, 3, 4, 5, 6]),
});

export const level = pgTable("Level", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    projectId: uuid("projectId").notNull().references(() => project.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// --- SECTION 2: Construction Modules ---

export const constructionItem = pgTable("ConstructionItem", {
    id: uuid("id").primaryKey().defaultRandom(),
    chapter: text("chapter").notNull(),
    description: text("description").notNull(),
    unit: text("unit").notNull(),
    performance: doublePrecision("performance").notNull().default(1),
    performanceHH: integer("performance_hh").notNull().default(1),
    directCost: doublePrecision("direct_cost").notNull().default(0),
    total: doublePrecision("total").notNull().default(0),
    userId: text("userId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const supply = pgTable("Supply", {
    id: uuid("id").primaryKey().defaultRandom(),
    typology: text("typology").notNull(),
    description: text("description").notNull(),
    unit: text("unit").notNull(),
    price: doublePrecision("price").notNull().default(0),
    tag: text("tag"),
    userId: text("userId"),
    isPublic: boolean("is_public").notNull().default(false),
    category: text("category"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const supplyCost = pgTable("SupplyCost", {
    id: uuid("id").primaryKey().defaultRandom(),
    supplyId: uuid("supplyId").notNull().references(() => supply.id),
    supplierId: uuid("supplierId").notNull().references(() => contact.id),
    price: doublePrecision("price").notNull(),
    date: timestamp("date").notNull().defaultNow(),
    isPreferred: boolean("is_preferred").notNull().default(false),
    notes: text("notes"),
});

export const constructionItemSupply = pgTable("ConstructionItemSupply", {
    id: uuid("id").primaryKey().defaultRandom(),
    itemId: uuid("itemId").notNull().references(() => constructionItem.id),
    supplyId: uuid("supplyId").notNull().references(() => supply.id),
    quantity: doublePrecision("quantity").notNull().default(0),
});

export const projectItem = pgTable("ProjectItem", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id),
    itemId: uuid("itemId").notNull().references(() => constructionItem.id),
    quantity: doublePrecision("quantity").notNull().default(0),
    progress: doublePrecision("progress").notNull().default(0),
    consolidatedDays: integer("consolidated_days"),
    consolidatedStartDate: timestamp("consolidated_start_date"),
    extraDays: integer("extra_days").notNull().default(0),
    ganttStatus: text("gantt_status").notNull().default("no iniciado"),
    performance: doublePrecision("performance"),
    predecessorId: uuid("predecessorId"),
    startDate: timestamp("start_date"),
}, (t) => ({
    unq: uniqueIndex("project_item_project_id_item_id_key").on(t.projectId, t.itemId),
}));

export const bimElementMapping = pgTable("BimElementMapping", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectItemId: uuid("projectItemId").notNull().references(() => projectItem.id, { onDelete: "cascade" }),
    elementId: text("elementId").notNull(),
    elementName: text("element_name"),
    quantity: doublePrecision("quantity").notNull().default(0),
    unit: text("unit").notNull().default("m3"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
}, (t) => ({
    unq: uniqueIndex("bim_element_mapping_project_item_id_element_id_key").on(t.projectItemId, t.elementId),
}));

export const projectItemLevelQuantity = pgTable("ProjectItemLevelQuantity", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectItemId: uuid("projectItemId").notNull().references(() => projectItem.id, { onDelete: "cascade" }),
    levelId: uuid("levelId").notNull().references(() => level.id),
    quantity: doublePrecision("quantity").notNull().default(0),
}, (t) => ({
    unq: uniqueIndex("project_item_level_quantity_project_item_id_level_id_key").on(t.projectItemId, t.levelId),
}));

// --- SECTION 3: Operations ---

export const projectContact = pgTable("ProjectContact", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id),
    contactId: uuid("contactId").notNull().references(() => contact.id),
    addedById: text("addedById"),
    permissions: jsonb("permissions").notNull().default({}),
}, (t) => ({
    unq: uniqueIndex("project_contact_project_id_contact_id_key").on(t.projectId, t.contactId),
}));

export const projectTransaction = pgTable("ProjectTransaction", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id),
    amount: doublePrecision("amount").notNull(),
    type: text("type").notNull(),
    category: text("category").notNull(),
    description: text("description").notNull(),
    date: timestamp("date").notNull().defaultNow(),
    payrollId: uuid("payrollId").references(() => payroll.id, { onDelete: "cascade" }),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const siteLog = pgTable("SiteLog", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id),
    authorId: text("authorId").notNull(),
    type: text("type").notNull(),
    content: text("content").notNull(),
    date: timestamp("date").notNull().defaultNow(),
});

export const purchaseOrder = pgTable("PurchaseOrder", {
    id: uuid("id").primaryKey().defaultRandom(),
    number: text("number").notNull().unique(),
    projectId: uuid("projectId").notNull().references(() => project.id),
    supplierId: uuid("supplierId").references(() => contact.id),
    totalAmount: doublePrecision("total_amount").notNull().default(0),
    status: text("status").notNull().default("pendiente"),
    date: timestamp("date").notNull().defaultNow(),
    authorId: text("authorId"),
    dueDate: timestamp("due_date"),
    notes: text("notes"),
    paymentType: text("payment_type").notNull().default("contado"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const purchaseOrderItem = pgTable("PurchaseOrderItem", {
    id: uuid("id").primaryKey().defaultRandom(),
    purchaseOrderId: uuid("purchaseOrderId").notNull().references(() => purchaseOrder.id, { onDelete: "cascade" }),
    supplyId: uuid("supplyId").notNull().references(() => supply.id),
    quantity: doublePrecision("quantity").notNull().default(0),
    price: doublePrecision("price").notNull().default(0),
});

export const warehouseMovement = pgTable("WarehouseMovement", {
    id: uuid("id").primaryKey().defaultRandom(),
    type: text("type").notNull(),
    quantity: doublePrecision("quantity").notNull(),
    notes: text("notes"),
    projectId: uuid("projectId").notNull().references(() => project.id),
    supplyId: uuid("supplyId").notNull().references(() => supply.id),
    purchaseOrderId: uuid("purchaseOrderId").references(() => purchaseOrder.id),
    itemId: uuid("itemId").references(() => projectItem.id),
    levelId: uuid("levelId").references(() => level.id),
    authorId: text("authorId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const supplyRequest = pgTable("SupplyRequest", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id),
    supplyId: uuid("supplyId").notNull().references(() => supply.id),
    quantity: doublePrecision("quantity").notNull(),
    status: text("status").notNull().default("pendiente"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const task = pgTable("Task", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    status: text("status").notNull().default("pendiente"),
    priority: text("priority").notNull().default("media"),
    dueDate: timestamp("due_date"),
    assignee: text("assignee"),
    projectId: uuid("projectId").references(() => project.id),
    userId: text("userId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// --- SECTION 4: CRM & Assets ---

export const contact = pgTable("Contact", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email"),
    phone: text("phone").notNull(),
    type: text("type").notNull().default("cliente"),
    status: text("status").notNull().default("active"),
    company: text("company"),
    nit: text("nit"),
    address: text("address"),
    notes: text("notes"),
    userId: text("userId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const bankAccount = pgTable("BankAccount", {
    id: uuid("id").primaryKey().defaultRandom(),
    contactId: uuid("contactId").notNull().references(() => contact.id, { onDelete: "cascade" }),
    bankName: text("bank_name").notNull(),
    accountNumber: text("account_number").notNull(),
    swiftCode: text("swift_code"),
    isPreferred: boolean("is_preferred").notNull().default(false),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const fixedAsset = pgTable("FixedAsset", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    code: text("code").notNull().unique(),
    brand: text("brand"),
    model: text("model"),
    serialNumber: text("serialNumber"),
    purchasePrice: doublePrecision("purchasePrice").notNull().default(0),
    purchaseDate: timestamp("purchaseDate").notNull(),
    location: text("location"),
    status: text("status").notNull().default("disponible"),
    userId: text("userId"),
    projectId: uuid("projectId").references(() => project.id),
    authorId: text("authorId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// --- SECTION 5: Quality & BIM ---

export const notification = pgTable("Notification", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull(),
    title: text("title").notNull(),
    message: text("message").notNull(),
    type: text("type").notNull().default("info"),
    isRead: boolean("isRead").notNull().default(false),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const qualityControl = pgTable("QualityControl", {
    id: uuid("id").primaryKey().defaultRandom(),
    description: text("description").notNull(),
    itemId: uuid("itemId").notNull().references(() => constructionItem.id, { onDelete: "cascade" }),
});

export const qualityControlSubPoint = pgTable("QualityControlSubPoint", {
    id: uuid("id").primaryKey().defaultRandom(),
    description: text("description").notNull(),
    qualityControlId: uuid("qualityControlId").notNull().references(() => qualityControl.id, { onDelete: "cascade" }),
});

export const bimDocument = pgTable("BimDocument", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().unique().references(() => project.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    version: integer("version").notNull().default(1),
});

export const bimTopic = pgTable("BimTopic", {
    id: uuid("id").primaryKey().defaultRandom(),
    documentId: uuid("documentId").notNull().references(() => bimDocument.id, { onDelete: "cascade" }),
    parentId: uuid("parentId"),
    title: text("title").notNull(),
    content: text("content"),
    order: integer("order").notNull().default(0),
    status: text("status").notNull().default("in_progress"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const bimIssue = pgTable("BimIssue", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id, { onDelete: "cascade" }),
    elementId: text("elementId").notNull(),
    elementName: text("elementName"),
    title: text("title").notNull(),
    description: text("description").notNull(),
    status: text("status").notNull().default("pendiente"),
    authorId: text("authorId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// --- SECTION 6: Others ---

export const unit = pgTable("Unit", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    abbreviation: text("abbreviation").notNull(),
    magnitude: text("magnitude").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const chapter = pgTable("Chapter", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    userId: text("userId").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const calendarEvent = pgTable("CalendarEvent", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    date: timestamp("date").notNull(),
    type: text("type").notNull().default("reunion"),
    project: text("project"),
    description: text("description"),
    userId: text("userId").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const bimBranch = pgTable("BimBranch", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    isMain: boolean("isMain").notNull().default(false),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const bimVersion = pgTable("BimVersion", {
    id: uuid("id").primaryKey().defaultRandom(),
    branchId: uuid("branchId").notNull().references(() => bimBranch.id, { onDelete: "cascade" }),
    authorId: text("authorId").notNull(),
    authorName: text("authorName").notNull(),
    message: text("message").notNull(),
    hash: text("hash").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const inspectionRecord = pgTable("InspectionRecord", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id, { onDelete: "cascade" }),
    projectItemId: uuid("projectItemId").notNull().references(() => projectItem.id, { onDelete: "cascade" }),
    levelId: uuid("levelId").references(() => level.id),
    inspector: text("inspector"),
    date: timestamp("date").notNull().defaultNow(),
    status: text("status").notNull().default("pendiente"),
    notes: text("notes"),
    imageUrls: text("imageUrls").array().notNull().default([]),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const inspectionCheck = pgTable("InspectionCheck", {
    id: uuid("id").primaryKey().defaultRandom(),
    inspectionRecordId: uuid("inspectionRecordId").notNull().references(() => inspectionRecord.id, { onDelete: "cascade" }),
    qualityControlId: uuid("qualityControlId").notNull(),
    subPointId: uuid("subPointId"),
    passed: boolean("passed").notNull().default(false),
    observation: text("observation"),
});

export const projectDocument = pgTable("ProjectDocument", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    type: text("type").notNull(),
    size: integer("size").notNull(),
    url: text("url").notNull(),
    folder: text("folder").notNull().default("/"),
    isFolder: boolean("is_folder").notNull().default(false),
    bimRole: text("bim_role"),
    source: text("source").notNull().default("local"),
    status: text("status").notNull().default("uploaded"),
    authorName: text("author_name").notNull().default("Usuario Aagora"),
    userId: text("userId"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const libraryFile = pgTable("LibraryFile", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull(),
    r2Key: text("r2Key").notNull().unique(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    mimeType: text("mimeType").notNull().default("application/octet-stream"),
    publicUrl: text("publicUrl").notNull(),
    category: text("category").notNull().default("CAD Design"),
    libraryType: text("libraryType").notNull().default("cad"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const contactDocument = pgTable("ContactDocument", {
    id: uuid("id").primaryKey().defaultRandom(),
    contactId: uuid("contactId").notNull().references(() => contact.id, { onDelete: "cascade" }),
    r2Key: text("r2Key").notNull().unique(),
    name: text("name").notNull(),
    size: integer("size").notNull(),
    mimeType: text("mimeType").notNull().default("application/pdf"),
    publicUrl: text("publicUrl").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const projectChangeOrder = pgTable("ProjectChangeOrder", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id, { onDelete: "cascade" }),
    number: text("number").unique(),
    description: text("description").notNull(),
    type: text("type").notNull().default("Adición"),
    status: text("status").notNull().default("Aprobada"),
    amount: doublePrecision("amount").notNull().default(0),
    reason: text("reason").default("Cambio de Cómputo"),
    date: timestamp("date").notNull().defaultNow(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const payroll = pgTable("Payroll", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id, { onDelete: "cascade" }),
    title: text("title"),
    startDate: timestamp("start_date").notNull(),
    endDate: timestamp("end_date").notNull(),
    totalAmount: doublePrecision("total_amount").notNull().default(0),
    status: text("status").notNull().default("completado"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const payrollEntry = pgTable("PayrollEntry", {
    id: uuid("id").primaryKey().defaultRandom(),
    payrollId: uuid("payrollId").notNull().references(() => payroll.id, { onDelete: "cascade" }),
    contactId: uuid("contactId").notNull().references(() => contact.id),
    daysWorked: doublePrecision("days_worked").notNull().default(0),
    dailyRate: doublePrecision("daily_rate").notNull().default(0),
    totalAmount: doublePrecision("total_amount").notNull().default(0),
});

export const valuation = pgTable("Valuation", {
    id: uuid("id").primaryKey().defaultRandom(),
    projectId: uuid("projectId").notNull().references(() => project.id, { onDelete: "cascade" }),
    number: text("number").unique(),
    description: text("description"),
    status: text("status").notNull().default("completado"),
    totalAmount: doublePrecision("total_amount").notNull().default(0),
    retentionAmount: doublePrecision("retention_amount").notNull().default(0),
    retentionPercentage: doublePrecision("retention_percentage").notNull().default(0),
    netAmount: doublePrecision("net_amount").notNull().default(0),
    date: timestamp("date").notNull().defaultNow(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const valuationItem = pgTable("ValuationItem", {
    id: uuid("id").primaryKey().defaultRandom(),
    valuationId: uuid("valuationId").notNull().references(() => valuation.id, { onDelete: "cascade" }),
    projectItemId: uuid("projectItemId").notNull().references(() => projectItem.id),
    quantity: doublePrecision("quantity").notNull().default(0),
    price: doublePrecision("price").notNull().default(0),
    amount: doublePrecision("amount").notNull().default(0),
});
