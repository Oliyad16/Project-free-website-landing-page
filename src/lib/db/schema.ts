import {
  pgTable,
  text,
  integer,
  timestamp,
  jsonb,
  uuid,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const leadStatusEnum = pgEnum("lead_status", [
  "draft",
  "submitted",
  "abandoned",
]);

export const planInterestEnum = pgEnum("plan_interest", [
  "starter",
  "growth",
  "pro",
]);

// ─── visitor_sessions ─────────────────────────────────────────────────────────

export const visitorSessions = pgTable(
  "visitor_sessions",
  {
    id: uuid("id").primaryKey(),
    affiliateCode: text("affiliate_code"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    deviceType: text("device_type"),
    referrer: text("referrer"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    lastSeenAt: timestamp("last_seen_at").notNull().defaultNow(),
  },
  (t) => [
    index("vs_affiliate_code_idx").on(t.affiliateCode),
    index("vs_created_idx").on(t.createdAt),
  ]
);

// ─── leads ────────────────────────────────────────────────────────────────────

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    sessionId: uuid("session_id").references(() => visitorSessions.id, {
      onDelete: "set null",
    }),
    affiliateCode: text("affiliate_code"),
    status: leadStatusEnum("status").notNull().default("draft"),
    currentStep: integer("current_step").notNull().default(1),
    lastCompletedStep: integer("last_completed_step").notNull().default(0),

    businessName: text("business_name"),
    businessType: text("business_type"),
    websiteGoal: text("website_goal"),
    scopeChoice: text("scope_choice"),
    planInterest: planInterestEnum("plan_interest"),
    contactName: text("contact_name"),
    contactEmail: text("contact_email"),
    contactPhone: text("contact_phone"),

    formData: jsonb("form_data"),

    abandonedAt: timestamp("abandoned_at"),
    submittedAt: timestamp("submitted_at"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [
    index("leads_session_idx").on(t.sessionId),
    index("leads_status_idx").on(t.status),
    index("leads_affiliate_code_idx").on(t.affiliateCode),
    index("leads_created_idx").on(t.createdAt),
  ]
);

// ─── event_log ────────────────────────────────────────────────────────────────

export const eventLog = pgTable(
  "event_log",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    eventName: text("event_name").notNull(),
    sessionId: uuid("session_id"),
    leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
    affiliateCode: text("affiliate_code"),
    step: integer("step"),
    utmSource: text("utm_source"),
    utmMedium: text("utm_medium"),
    utmCampaign: text("utm_campaign"),
    deviceType: text("device_type"),
    metadata: jsonb("metadata"),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [
    index("el_event_name_idx").on(t.eventName),
    index("el_session_idx").on(t.sessionId),
    index("el_lead_idx").on(t.leadId),
    index("el_created_idx").on(t.createdAt),
  ]
);
