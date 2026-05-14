import { relations } from "drizzle-orm";
import {
    project, projectConfig, level, projectItem, projectContact, projectDocument,
    projectTransaction, projectChangeOrder,
    constructionItem, constructionItemSupply,
    supply, supplyCost,
    contact, bankAccount, contactDocument,
    fixedAsset,
    qualityControl, qualityControlSubPoint,
    bimDocument, bimTopic, bimBranch, bimVersion, bimElementMapping, bimIssue,
    projectItemLevelQuantity,
    purchaseOrder, purchaseOrderItem,
    warehouseMovement,
    siteLog,
    inspectionRecord, inspectionCheck,
    payroll, payrollEntry,
    valuation, valuationItem,
    supplyRequest,
} from "./schema";

// ── Supply ────────────────────────────────────────────────────────────────────

export const supplyRelations = relations(supply, ({ many }) => ({
    costs: many(supplyCost),
    items: many(constructionItemSupply),
    purchaseOrderItems: many(purchaseOrderItem),
    warehouseMovements: many(warehouseMovement),
    requests: many(supplyRequest),
}));

// ── SupplyRequest ─────────────────────────────────────────────────────────────

export const supplyRequestRelations = relations(supplyRequest, ({ one }) => ({
    project: one(project, { fields: [supplyRequest.projectId], references: [project.id] }),
    supply: one(supply, { fields: [supplyRequest.supplyId], references: [supply.id] }),
}));

export const supplyCostRelations = relations(supplyCost, ({ one }) => ({
    supply: one(supply, { fields: [supplyCost.supplyId], references: [supply.id] }),
    supplier: one(contact, { fields: [supplyCost.supplierId], references: [contact.id] }),
}));

// ── ConstructionItem ──────────────────────────────────────────────────────────

export const constructionItemRelations = relations(constructionItem, ({ many }) => ({
    supplies: many(constructionItemSupply),
    projectItems: many(projectItem),
    qualityControls: many(qualityControl),
}));

export const constructionItemSupplyRelations = relations(constructionItemSupply, ({ one }) => ({
    item: one(constructionItem, { fields: [constructionItemSupply.itemId], references: [constructionItem.id] }),
    supply: one(supply, { fields: [constructionItemSupply.supplyId], references: [supply.id] }),
}));

// ── QualityControl ────────────────────────────────────────────────────────────

export const qualityControlRelations = relations(qualityControl, ({ one, many }) => ({
    item: one(constructionItem, { fields: [qualityControl.itemId], references: [constructionItem.id] }),
    subPoints: many(qualityControlSubPoint),
}));

export const qualityControlSubPointRelations = relations(qualityControlSubPoint, ({ one }) => ({
    qualityControl: one(qualityControl, { fields: [qualityControlSubPoint.qualityControlId], references: [qualityControl.id] }),
}));

// ── Contact ───────────────────────────────────────────────────────────────────

export const contactRelations = relations(contact, ({ many }) => ({
    bankAccounts: many(bankAccount),
    documents: many(contactDocument),
    projectLinks: many(projectContact),
    supplyCosts: many(supplyCost),
    payrollEntries: many(payrollEntry),
}));

export const bankAccountRelations = relations(bankAccount, ({ one }) => ({
    contact: one(contact, { fields: [bankAccount.contactId], references: [contact.id] }),
}));

export const contactDocumentRelations = relations(contactDocument, ({ one }) => ({
    contact: one(contact, { fields: [contactDocument.contactId], references: [contact.id] }),
}));

// ── Project ───────────────────────────────────────────────────────────────────

export const projectRelations = relations(project, ({ many, one }) => ({
    config: many(projectConfig),
    levels: many(level),
    team: many(projectContact),
    items: many(projectItem),
    documents: many(projectDocument),
    transactions: many(projectTransaction),
    changeOrders: many(projectChangeOrder),
    purchaseOrders: many(purchaseOrder),
    warehouseMovements: many(warehouseMovement),
    siteLogs: many(siteLog),
    inspectionRecords: many(inspectionRecord),
    payrolls: many(payroll),
    valuations: many(valuation),
    bimDocument: one(bimDocument),
    bimBranches: many(bimBranch),
    bimIssues: many(bimIssue),
    assets: many(fixedAsset),
}));

export const projectConfigRelations = relations(projectConfig, ({ one }) => ({
    project: one(project, { fields: [projectConfig.projectId], references: [project.id] }),
}));

export const levelRelations = relations(level, ({ one }) => ({
    project: one(project, { fields: [level.projectId], references: [project.id] }),
}));

export const projectItemRelations = relations(projectItem, ({ one, many }) => ({
    project: one(project, { fields: [projectItem.projectId], references: [project.id] }),
    item: one(constructionItem, { fields: [projectItem.itemId], references: [constructionItem.id] }),
    predecessor: one(projectItem, {
        fields: [projectItem.predecessorId],
        references: [projectItem.id],
        relationName: 'predecessor',
    }),
    successors: many(projectItem, {
        relationName: 'predecessor',
    }),
    levelQuantities: many(projectItemLevelQuantity),
    bimMappings: many(bimElementMapping),
    warehouseMovements: many(warehouseMovement),
    inspectionRecords: many(inspectionRecord),
    valuationItems: many(valuationItem),
}));

export const projectContactRelations = relations(projectContact, ({ one }) => ({
    project: one(project, { fields: [projectContact.projectId], references: [project.id] }),
    contact: one(contact, { fields: [projectContact.contactId], references: [contact.id] }),
}));

export const projectDocumentRelations = relations(projectDocument, ({ one }) => ({
    project: one(project, { fields: [projectDocument.projectId], references: [project.id] }),
}));

export const projectTransactionRelations = relations(projectTransaction, ({ one }) => ({
    project: one(project, { fields: [projectTransaction.projectId], references: [project.id] }),
}));

export const projectChangeOrderRelations = relations(projectChangeOrder, ({ one }) => ({
    project: one(project, { fields: [projectChangeOrder.projectId], references: [project.id] }),
}));

// ── PurchaseOrder ─────────────────────────────────────────────────────────────

export const purchaseOrderRelations = relations(purchaseOrder, ({ one, many }) => ({
    project: one(project, { fields: [purchaseOrder.projectId], references: [project.id] }),
    supplier: one(contact, { fields: [purchaseOrder.supplierId], references: [contact.id] }),
    items: many(purchaseOrderItem),
}));

export const purchaseOrderItemRelations = relations(purchaseOrderItem, ({ one }) => ({
    purchaseOrder: one(purchaseOrder, { fields: [purchaseOrderItem.purchaseOrderId], references: [purchaseOrder.id] }),
    supply: one(supply, { fields: [purchaseOrderItem.supplyId], references: [supply.id] }),
}));

// ── Payroll ───────────────────────────────────────────────────────────────────

export const payrollRelations = relations(payroll, ({ one, many }) => ({
    project: one(project, { fields: [payroll.projectId], references: [project.id] }),
    entries: many(payrollEntry),
}));

export const payrollEntryRelations = relations(payrollEntry, ({ one }) => ({
    payroll: one(payroll, { fields: [payrollEntry.payrollId], references: [payroll.id] }),
    contact: one(contact, { fields: [payrollEntry.contactId], references: [contact.id] }),
}));

// ── Valuation ─────────────────────────────────────────────────────────────────

export const valuationRelations = relations(valuation, ({ one, many }) => ({
    project: one(project, { fields: [valuation.projectId], references: [project.id] }),
    items: many(valuationItem),
}));

export const valuationItemRelations = relations(valuationItem, ({ one }) => ({
    valuation: one(valuation, { fields: [valuationItem.valuationId], references: [valuation.id] }),
    projectItem: one(projectItem, { fields: [valuationItem.projectItemId], references: [projectItem.id] }),
}));

// ── BIM ───────────────────────────────────────────────────────────────────────

export const bimDocumentRelations = relations(bimDocument, ({ one, many }) => ({
    project: one(project, { fields: [bimDocument.projectId], references: [project.id] }),
    topics: many(bimTopic),
}));

export const bimTopicRelations = relations(bimTopic, ({ one }) => ({
    document: one(bimDocument, { fields: [bimTopic.documentId], references: [bimDocument.id] }),
}));

export const bimBranchRelations = relations(bimBranch, ({ one, many }) => ({
    project: one(project, { fields: [bimBranch.projectId], references: [project.id] }),
    versions: many(bimVersion),
}));

export const bimVersionRelations = relations(bimVersion, ({ one }) => ({
    branch: one(bimBranch, { fields: [bimVersion.branchId], references: [bimBranch.id] }),
}));

export const bimElementMappingRelations = relations(bimElementMapping, ({ one }) => ({
    projectItem: one(projectItem, { fields: [bimElementMapping.projectItemId], references: [projectItem.id] }),
}));

export const bimIssueRelations = relations(bimIssue, ({ one }) => ({
    project: one(project, { fields: [bimIssue.projectId], references: [project.id] }),
}));

// ── Other ─────────────────────────────────────────────────────────────────────

export const projectItemLevelQuantityRelations = relations(projectItemLevelQuantity, ({ one }) => ({
    projectItem: one(projectItem, { fields: [projectItemLevelQuantity.projectItemId], references: [projectItem.id] }),
    level: one(level, { fields: [projectItemLevelQuantity.levelId], references: [level.id] }),
}));

export const warehouseMovementRelations = relations(warehouseMovement, ({ one }) => ({
    project: one(project, { fields: [warehouseMovement.projectId], references: [project.id] }),
    supply: one(supply, { fields: [warehouseMovement.supplyId], references: [supply.id] }),
    projectItem: one(projectItem, { fields: [warehouseMovement.itemId], references: [projectItem.id] }),
}));

export const siteLogRelations = relations(siteLog, ({ one }) => ({
    project: one(project, { fields: [siteLog.projectId], references: [project.id] }),
}));

export const inspectionRecordRelations = relations(inspectionRecord, ({ one, many }) => ({
    project: one(project, { fields: [inspectionRecord.projectId], references: [project.id] }),
    projectItem: one(projectItem, { fields: [inspectionRecord.projectItemId], references: [projectItem.id] }),
    checks: many(inspectionCheck),
}));

export const inspectionCheckRelations = relations(inspectionCheck, ({ one }) => ({
    inspectionRecord: one(inspectionRecord, { fields: [inspectionCheck.inspectionRecordId], references: [inspectionRecord.id] }),
}));

export const fixedAssetRelations = relations(fixedAsset, ({ one }) => ({
    project: one(project, { fields: [fixedAsset.projectId], references: [project.id] }),
}));
