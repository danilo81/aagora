CREATE TABLE "BankAccount" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contactId" uuid NOT NULL,
	"bank_name" text NOT NULL,
	"account_number" text NOT NULL,
	"swift_code" text,
	"is_preferred" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BimBranch" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"name" text NOT NULL,
	"isMain" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BimDocument" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "BimDocument_projectId_unique" UNIQUE("projectId")
);
--> statement-breakpoint
CREATE TABLE "BimElementMapping" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectItemId" uuid NOT NULL,
	"elementId" text NOT NULL,
	"element_name" text,
	"quantity" double precision DEFAULT 0 NOT NULL,
	"unit" text DEFAULT 'm3' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BimIssue" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"elementId" text NOT NULL,
	"elementName" text,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'pendiente' NOT NULL,
	"authorId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BimTopic" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"documentId" uuid NOT NULL,
	"parentId" uuid,
	"title" text NOT NULL,
	"content" text,
	"order" integer DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'in_progress' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "BimVersion" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"branchId" uuid NOT NULL,
	"authorId" text NOT NULL,
	"authorName" text NOT NULL,
	"message" text NOT NULL,
	"hash" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "CalendarEvent" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"date" timestamp NOT NULL,
	"type" text DEFAULT 'reunion' NOT NULL,
	"project" text,
	"description" text,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Chapter" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConstructionItem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"chapter" text NOT NULL,
	"description" text NOT NULL,
	"unit" text NOT NULL,
	"performance" double precision DEFAULT 1 NOT NULL,
	"performance_hh" integer DEFAULT 1 NOT NULL,
	"direct_cost" double precision DEFAULT 0 NOT NULL,
	"total" double precision DEFAULT 0 NOT NULL,
	"userId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConstructionItemSupply" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"itemId" uuid NOT NULL,
	"supplyId" uuid NOT NULL,
	"quantity" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Contact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text,
	"phone" text NOT NULL,
	"type" text DEFAULT 'cliente' NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"company" text,
	"nit" text,
	"address" text,
	"notes" text,
	"userId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ContactDocument" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"contactId" uuid NOT NULL,
	"r2Key" text NOT NULL,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"mimeType" text DEFAULT 'application/pdf' NOT NULL,
	"publicUrl" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ContactDocument_r2Key_unique" UNIQUE("r2Key")
);
--> statement-breakpoint
CREATE TABLE "FixedAsset" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"code" text NOT NULL,
	"brand" text,
	"model" text,
	"serialNumber" text,
	"purchasePrice" double precision DEFAULT 0 NOT NULL,
	"purchaseDate" timestamp NOT NULL,
	"location" text,
	"status" text DEFAULT 'disponible' NOT NULL,
	"userId" text,
	"projectId" uuid,
	"authorId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "FixedAsset_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "InspectionCheck" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"inspectionRecordId" uuid NOT NULL,
	"qualityControlId" uuid NOT NULL,
	"subPointId" uuid,
	"passed" boolean DEFAULT false NOT NULL,
	"observation" text
);
--> statement-breakpoint
CREATE TABLE "InspectionRecord" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"projectItemId" uuid NOT NULL,
	"levelId" uuid,
	"inspector" text,
	"date" timestamp DEFAULT now() NOT NULL,
	"status" text DEFAULT 'pendiente' NOT NULL,
	"notes" text,
	"imageUrls" text[] DEFAULT '{}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Level" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"projectId" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "LibraryFile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"r2Key" text NOT NULL,
	"name" text NOT NULL,
	"size" integer NOT NULL,
	"mimeType" text DEFAULT 'application/octet-stream' NOT NULL,
	"publicUrl" text NOT NULL,
	"category" text DEFAULT 'CAD Design' NOT NULL,
	"libraryType" text DEFAULT 'cad' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "LibraryFile_r2Key_unique" UNIQUE("r2Key")
);
--> statement-breakpoint
CREATE TABLE "Notification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" text NOT NULL,
	"title" text NOT NULL,
	"message" text NOT NULL,
	"type" text DEFAULT 'info' NOT NULL,
	"isRead" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Payroll" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"title" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp NOT NULL,
	"total_amount" double precision DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'completado' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PayrollEntry" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"payrollId" uuid NOT NULL,
	"contactId" uuid NOT NULL,
	"days_worked" double precision DEFAULT 0 NOT NULL,
	"daily_rate" double precision DEFAULT 0 NOT NULL,
	"total_amount" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Project" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"client" text,
	"location" text,
	"projectType" text,
	"area" double precision DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'activo' NOT NULL,
	"imageUrl" text,
	"startDate" timestamp,
	"authorId" text,
	"organizationId" uuid,
	"consolidatedAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectChangeOrder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"number" text,
	"description" text NOT NULL,
	"type" text DEFAULT 'Adición' NOT NULL,
	"status" text DEFAULT 'Aprobada' NOT NULL,
	"amount" double precision DEFAULT 0 NOT NULL,
	"reason" text DEFAULT 'Cambio de Cómputo',
	"date" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ProjectChangeOrder_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "ProjectConfig" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"utility" double precision DEFAULT 10 NOT NULL,
	"adminExpenses" double precision DEFAULT 5 NOT NULL,
	"iva" double precision DEFAULT 13 NOT NULL,
	"it" double precision DEFAULT 3 NOT NULL,
	"socialCharges" double precision DEFAULT 55 NOT NULL,
	"toolWear" double precision DEFAULT 3 NOT NULL,
	"exchangeRate" double precision DEFAULT 6.96 NOT NULL,
	"financing" double precision DEFAULT 0 NOT NULL,
	"guaranteeRetention" double precision DEFAULT 7 NOT NULL,
	"mainCurrency" text DEFAULT 'BS',
	"secondaryCurrency" text DEFAULT 'USD',
	"workingDays" integer DEFAULT 6,
	"workingDaysSelection" integer[] DEFAULT '{1,2,3,4,5,6}' NOT NULL,
	CONSTRAINT "ProjectConfig_projectId_unique" UNIQUE("projectId")
);
--> statement-breakpoint
CREATE TABLE "ProjectContact" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"contactId" uuid NOT NULL,
	"addedById" text,
	"permissions" jsonb DEFAULT '{}'::jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectDocument" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"name" text NOT NULL,
	"type" text NOT NULL,
	"size" integer NOT NULL,
	"url" text NOT NULL,
	"folder" text DEFAULT '/' NOT NULL,
	"is_folder" boolean DEFAULT false NOT NULL,
	"bim_role" text,
	"source" text DEFAULT 'local' NOT NULL,
	"status" text DEFAULT 'uploaded' NOT NULL,
	"author_name" text DEFAULT 'Usuario Aagora' NOT NULL,
	"userId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectItem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"itemId" uuid NOT NULL,
	"quantity" double precision DEFAULT 0 NOT NULL,
	"progress" double precision DEFAULT 0 NOT NULL,
	"consolidated_days" integer,
	"consolidated_start_date" timestamp,
	"extra_days" integer DEFAULT 0 NOT NULL,
	"gantt_status" text DEFAULT 'no iniciado' NOT NULL,
	"performance" double precision,
	"predecessorId" uuid,
	"start_date" timestamp
);
--> statement-breakpoint
CREATE TABLE "ProjectItemLevelQuantity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectItemId" uuid NOT NULL,
	"levelId" uuid NOT NULL,
	"quantity" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ProjectTransaction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"amount" double precision NOT NULL,
	"type" text NOT NULL,
	"category" text NOT NULL,
	"description" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"payrollId" uuid,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "PurchaseOrder" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"number" text NOT NULL,
	"projectId" uuid NOT NULL,
	"supplierId" uuid,
	"total_amount" double precision DEFAULT 0 NOT NULL,
	"status" text DEFAULT 'pendiente' NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"authorId" text,
	"due_date" timestamp,
	"notes" text,
	"payment_type" text DEFAULT 'contado' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "PurchaseOrder_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "PurchaseOrderItem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purchaseOrderId" uuid NOT NULL,
	"supplyId" uuid NOT NULL,
	"quantity" double precision DEFAULT 0 NOT NULL,
	"price" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "QualityControl" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"itemId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "QualityControlSubPoint" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"description" text NOT NULL,
	"qualityControlId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SiteLog" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"authorId" text NOT NULL,
	"type" text NOT NULL,
	"content" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Supply" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"typology" text NOT NULL,
	"description" text NOT NULL,
	"unit" text NOT NULL,
	"price" double precision DEFAULT 0 NOT NULL,
	"tag" text,
	"userId" text,
	"is_public" boolean DEFAULT false NOT NULL,
	"category" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "SupplyCost" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"supplyId" uuid NOT NULL,
	"supplierId" uuid NOT NULL,
	"price" double precision NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"is_preferred" boolean DEFAULT false NOT NULL,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "SupplyRequest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"supplyId" uuid NOT NULL,
	"quantity" double precision NOT NULL,
	"status" text DEFAULT 'pendiente' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"status" text DEFAULT 'pendiente' NOT NULL,
	"priority" text DEFAULT 'media' NOT NULL,
	"due_date" timestamp,
	"assignee" text,
	"projectId" uuid,
	"userId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Unit" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"abbreviation" text NOT NULL,
	"magnitude" text NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Valuation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"projectId" uuid NOT NULL,
	"number" text,
	"description" text,
	"status" text DEFAULT 'completado' NOT NULL,
	"total_amount" double precision DEFAULT 0 NOT NULL,
	"retention_amount" double precision DEFAULT 0 NOT NULL,
	"retention_percentage" double precision DEFAULT 0 NOT NULL,
	"net_amount" double precision DEFAULT 0 NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Valuation_number_unique" UNIQUE("number")
);
--> statement-breakpoint
CREATE TABLE "ValuationItem" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"valuationId" uuid NOT NULL,
	"projectItemId" uuid NOT NULL,
	"quantity" double precision DEFAULT 0 NOT NULL,
	"price" double precision DEFAULT 0 NOT NULL,
	"amount" double precision DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "WarehouseMovement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"type" text NOT NULL,
	"quantity" double precision NOT NULL,
	"notes" text,
	"projectId" uuid NOT NULL,
	"supplyId" uuid NOT NULL,
	"purchaseOrderId" uuid,
	"itemId" uuid,
	"levelId" uuid,
	"authorId" text,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"accountId" text NOT NULL,
	"providerId" text NOT NULL,
	"userId" uuid NOT NULL,
	"accessToken" text NOT NULL,
	"refreshToken" text NOT NULL,
	"idToken" text,
	"accessTokenExpires" timestamp with time zone,
	"refreshTokenExpires" timestamp with time zone,
	"scope" text NOT NULL,
	"password" text,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Organization" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text,
	"imageUrl" text,
	"isVisible" boolean DEFAULT false NOT NULL,
	"showName" boolean DEFAULT true NOT NULL,
	"showProfession" boolean DEFAULT true NOT NULL,
	"showLocation" boolean DEFAULT true NOT NULL,
	"location" text,
	"skills" text[] DEFAULT '{}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"deletedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "OrganizationUser" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" uuid NOT NULL,
	"userId" uuid NOT NULL,
	"role" text NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL,
	"deletedAt" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "Session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"userId" uuid NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ipAddress" text,
	"userAgent" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "Session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"avatarUrl" text,
	"password" text,
	"role" text DEFAULT 'usuario' NOT NULL,
	"cargo" text,
	"phone" text,
	"telefono" text,
	"storageLimit" text DEFAULT '1GB' NOT NULL,
	"title" text,
	"isVisible" boolean DEFAULT false NOT NULL,
	"showName" boolean DEFAULT true NOT NULL,
	"showProfession" boolean DEFAULT true NOT NULL,
	"showLocation" boolean DEFAULT true NOT NULL,
	"location" text,
	"skills" text[] DEFAULT '{}' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "User_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "BankAccount" ADD CONSTRAINT "BankAccount_contactId_Contact_id_fk" FOREIGN KEY ("contactId") REFERENCES "public"."Contact"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BimBranch" ADD CONSTRAINT "BimBranch_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BimDocument" ADD CONSTRAINT "BimDocument_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BimElementMapping" ADD CONSTRAINT "BimElementMapping_projectItemId_ProjectItem_id_fk" FOREIGN KEY ("projectItemId") REFERENCES "public"."ProjectItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BimIssue" ADD CONSTRAINT "BimIssue_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BimTopic" ADD CONSTRAINT "BimTopic_documentId_BimDocument_id_fk" FOREIGN KEY ("documentId") REFERENCES "public"."BimDocument"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "BimVersion" ADD CONSTRAINT "BimVersion_branchId_BimBranch_id_fk" FOREIGN KEY ("branchId") REFERENCES "public"."BimBranch"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConstructionItemSupply" ADD CONSTRAINT "ConstructionItemSupply_itemId_ConstructionItem_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."ConstructionItem"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConstructionItemSupply" ADD CONSTRAINT "ConstructionItemSupply_supplyId_Supply_id_fk" FOREIGN KEY ("supplyId") REFERENCES "public"."Supply"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ContactDocument" ADD CONSTRAINT "ContactDocument_contactId_Contact_id_fk" FOREIGN KEY ("contactId") REFERENCES "public"."Contact"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "FixedAsset" ADD CONSTRAINT "FixedAsset_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InspectionCheck" ADD CONSTRAINT "InspectionCheck_inspectionRecordId_InspectionRecord_id_fk" FOREIGN KEY ("inspectionRecordId") REFERENCES "public"."InspectionRecord"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InspectionRecord" ADD CONSTRAINT "InspectionRecord_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InspectionRecord" ADD CONSTRAINT "InspectionRecord_projectItemId_ProjectItem_id_fk" FOREIGN KEY ("projectItemId") REFERENCES "public"."ProjectItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InspectionRecord" ADD CONSTRAINT "InspectionRecord_levelId_Level_id_fk" FOREIGN KEY ("levelId") REFERENCES "public"."Level"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Level" ADD CONSTRAINT "Level_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Payroll" ADD CONSTRAINT "Payroll_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PayrollEntry" ADD CONSTRAINT "PayrollEntry_payrollId_Payroll_id_fk" FOREIGN KEY ("payrollId") REFERENCES "public"."Payroll"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PayrollEntry" ADD CONSTRAINT "PayrollEntry_contactId_Contact_id_fk" FOREIGN KEY ("contactId") REFERENCES "public"."Contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_organizationId_Organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectChangeOrder" ADD CONSTRAINT "ProjectChangeOrder_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectConfig" ADD CONSTRAINT "ProjectConfig_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectContact" ADD CONSTRAINT "ProjectContact_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectContact" ADD CONSTRAINT "ProjectContact_contactId_Contact_id_fk" FOREIGN KEY ("contactId") REFERENCES "public"."Contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectDocument" ADD CONSTRAINT "ProjectDocument_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectItem" ADD CONSTRAINT "ProjectItem_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectItem" ADD CONSTRAINT "ProjectItem_itemId_ConstructionItem_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."ConstructionItem"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectItemLevelQuantity" ADD CONSTRAINT "ProjectItemLevelQuantity_projectItemId_ProjectItem_id_fk" FOREIGN KEY ("projectItemId") REFERENCES "public"."ProjectItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectItemLevelQuantity" ADD CONSTRAINT "ProjectItemLevelQuantity_levelId_Level_id_fk" FOREIGN KEY ("levelId") REFERENCES "public"."Level"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectTransaction" ADD CONSTRAINT "ProjectTransaction_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectTransaction" ADD CONSTRAINT "ProjectTransaction_payrollId_Payroll_id_fk" FOREIGN KEY ("payrollId") REFERENCES "public"."Payroll"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PurchaseOrder" ADD CONSTRAINT "PurchaseOrder_supplierId_Contact_id_fk" FOREIGN KEY ("supplierId") REFERENCES "public"."Contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_purchaseOrderId_PurchaseOrder_id_fk" FOREIGN KEY ("purchaseOrderId") REFERENCES "public"."PurchaseOrder"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "PurchaseOrderItem" ADD CONSTRAINT "PurchaseOrderItem_supplyId_Supply_id_fk" FOREIGN KEY ("supplyId") REFERENCES "public"."Supply"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "QualityControl" ADD CONSTRAINT "QualityControl_itemId_ConstructionItem_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."ConstructionItem"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "QualityControlSubPoint" ADD CONSTRAINT "QualityControlSubPoint_qualityControlId_QualityControl_id_fk" FOREIGN KEY ("qualityControlId") REFERENCES "public"."QualityControl"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SiteLog" ADD CONSTRAINT "SiteLog_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SupplyCost" ADD CONSTRAINT "SupplyCost_supplyId_Supply_id_fk" FOREIGN KEY ("supplyId") REFERENCES "public"."Supply"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SupplyCost" ADD CONSTRAINT "SupplyCost_supplierId_Contact_id_fk" FOREIGN KEY ("supplierId") REFERENCES "public"."Contact"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SupplyRequest" ADD CONSTRAINT "SupplyRequest_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "SupplyRequest" ADD CONSTRAINT "SupplyRequest_supplyId_Supply_id_fk" FOREIGN KEY ("supplyId") REFERENCES "public"."Supply"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Task" ADD CONSTRAINT "Task_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Valuation" ADD CONSTRAINT "Valuation_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ValuationItem" ADD CONSTRAINT "ValuationItem_valuationId_Valuation_id_fk" FOREIGN KEY ("valuationId") REFERENCES "public"."Valuation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ValuationItem" ADD CONSTRAINT "ValuationItem_projectItemId_ProjectItem_id_fk" FOREIGN KEY ("projectItemId") REFERENCES "public"."ProjectItem"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WarehouseMovement" ADD CONSTRAINT "WarehouseMovement_projectId_Project_id_fk" FOREIGN KEY ("projectId") REFERENCES "public"."Project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WarehouseMovement" ADD CONSTRAINT "WarehouseMovement_supplyId_Supply_id_fk" FOREIGN KEY ("supplyId") REFERENCES "public"."Supply"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WarehouseMovement" ADD CONSTRAINT "WarehouseMovement_purchaseOrderId_PurchaseOrder_id_fk" FOREIGN KEY ("purchaseOrderId") REFERENCES "public"."PurchaseOrder"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WarehouseMovement" ADD CONSTRAINT "WarehouseMovement_itemId_ProjectItem_id_fk" FOREIGN KEY ("itemId") REFERENCES "public"."ProjectItem"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "WarehouseMovement" ADD CONSTRAINT "WarehouseMovement_levelId_Level_id_fk" FOREIGN KEY ("levelId") REFERENCES "public"."Level"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_organizationId_Organization_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "OrganizationUser" ADD CONSTRAINT "OrganizationUser_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_User_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "bim_element_mapping_project_item_id_element_id_key" ON "BimElementMapping" USING btree ("projectItemId","elementId");--> statement-breakpoint
CREATE UNIQUE INDEX "project_contact_project_id_contact_id_key" ON "ProjectContact" USING btree ("projectId","contactId");--> statement-breakpoint
CREATE UNIQUE INDEX "project_item_project_id_item_id_key" ON "ProjectItem" USING btree ("projectId","itemId");--> statement-breakpoint
CREATE UNIQUE INDEX "project_item_level_quantity_project_item_id_level_id_key" ON "ProjectItemLevelQuantity" USING btree ("projectItemId","levelId");