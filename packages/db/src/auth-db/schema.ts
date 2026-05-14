import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { serial, uuid } from "drizzle-orm/pg-core";

export const user = pgTable("User", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: timestamp("emailVerified"),
    avatarUrl: text("avatarUrl"),
    password: text("password"),
    role: text("role").notNull().default("usuario"),
    cargo: text("cargo"),
    phone: text("phone"),
    telefono: text("telefono"),
    storageLimit: text("storageLimit").notNull().default("1GB"),
    title: text("title"),
    isVisible: boolean("isVisible").notNull().default(false),
    showName: boolean("showName").notNull().default(true),
    showProfession: boolean("showProfession").notNull().default(true),
    showLocation: boolean("showLocation").notNull().default(true),
    location: text("location"),
    skills: text("skills").array().notNull().default([]),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
})

export const organization = pgTable("Organization", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    slug: text("slug"),
    imageUrl: text("imageUrl"),
    isVisible: boolean("isVisible").notNull().default(false),
    showName: boolean("showName").notNull().default(true),
    showProfession: boolean("showProfession").notNull().default(true),
    showLocation: boolean("showLocation").notNull().default(true),
    location: text("location"),
    skills: text("skills").array().notNull().default([]),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
    deletedAt: timestamp("deletedAt"),
})

export const organizationUser = pgTable("OrganizationUser", {
    id: uuid("id").primaryKey().defaultRandom(),
    organizationId: uuid("organizationId").notNull().references(() => organization.id, { onDelete: "cascade" }),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    role: text("role").notNull(),
    createdAt: timestamp("createdAt", { withTimezone: true }).notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull(),
    deletedAt: timestamp("deletedAt", { withTimezone: true }),
})

export const account = pgTable("Account", {
    id: uuid("id").primaryKey().defaultRandom(),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("accessToken").notNull(),
    refreshToken: text("refreshToken").notNull(),
    idToken: text("idToken"),
    accessTokenExpires: timestamp("accessTokenExpires", { withTimezone: true }),
    refreshTokenExpires: timestamp("refreshTokenExpires", { withTimezone: true }),
    scope: text("scope").notNull(),
    password: text("password"),
    createdAt: timestamp("createdAt", { withTimezone: true }).notNull(),
    updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull(),
})

export const verification = pgTable("Verification", {
    id: uuid("id").primaryKey().defaultRandom(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
})




export const session = pgTable("Session", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expiresAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    createdAt: timestamp("createdAt").notNull(),
    updatedAt: timestamp("updatedAt").notNull(),
})
















