import { 
  pgTable, 
  uuid, 
  text, 
  timestamp, 
  boolean, 
  integer,
  decimal,
  pgEnum,
  jsonb
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// ─── ENUMS ───────────────────────────────────────────────────────────────────

export const articleTypeEnum = pgEnum('article_type', [
  'journal',
  'bedroom_lab',
  'care_guide',
  'material_study',
  'announcement',
  'product_story'
]);

export const orderStatusEnum = pgEnum('order_status', [
  'pending',
  'processing',
  'manufacturing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded'
]);

export const paymentStatusEnum = pgEnum('payment_status', [
  'pending',
  'authorized',
  'captured',
  'failed',
  'refunded'
]);

export const paymentMethodEnum = pgEnum('payment_method', [
  'upi',
  'card',
  'netbanking',
  'wallet',
  'cod'
]);

// ─── AUTH & USERS ────────────────────────────────────────────────────────────

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey(), // Maps directly to auth.users.id
  email: text('email').notNull().unique(),
  fullName: text('full_name'),
  phone: text('phone'),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const addresses = pgTable('addresses', {
  id: uuid('id').defaultRandom().primaryKey(),
  profileId: uuid('profile_id').references(() => profiles.id).notNull(),
  fullName: text('full_name').notNull(),
  phone: text('phone').notNull(),
  streetAddress: text('street_address').notNull(),
  city: text('city').notNull(),
  state: text('state').notNull(),
  pincode: text('pincode').notNull(),
  isDefault: boolean('is_default').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── MEDIA ───────────────────────────────────────────────────────────────────

export const media = pgTable('media', {
  id: uuid('id').defaultRandom().primaryKey(),
  bucket: text('bucket').notNull(), // e.g., 'products', 'articles'
  filename: text('filename').notNull(),
  altText: text('alt_text'),
  mimeType: text('mime_type').notNull(),
  dimensions: jsonb('dimensions'), // { width: 1920, height: 1080 }
  sizeBytes: integer('size_bytes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── CATALOG ─────────────────────────────────────────────────────────────────

export const collections = pgTable('collections', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description'),
  mediaId: uuid('media_id').references(() => media.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  label: text('label'), // e.g. "BRD-01"
  description: text('description').notNull(),
  collectionId: uuid('collection_id').references(() => collections.id),
  isDraft: boolean('is_draft').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const productVariants = pgTable('product_variants', {
  id: uuid('id').defaultRandom().primaryKey(),
  productId: uuid('product_id').references(() => products.id).notNull(),
  sku: text('sku').notNull().unique(),
  name: text('name').notNull(), // e.g. "Amber", "Default"
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  inventory: integer('inventory').default(0).notNull(),
  mediaId: uuid('media_id').references(() => media.id),
  isAvailable: boolean('is_available').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const materials = pgTable('materials', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  mediaId: uuid('media_id').references(() => media.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Join table for products and materials
import { primaryKey } from 'drizzle-orm/pg-core';

export const productMaterials = pgTable('product_materials', {
  productId: uuid('product_id').references(() => products.id).notNull(),
  materialId: uuid('material_id').references(() => materials.id).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.productId, t.materialId] }),
}));

// ─── EDITORIAL ───────────────────────────────────────────────────────────────

export const articles = pgTable('articles', {
  id: uuid('id').defaultRandom().primaryKey(),
  slug: text('slug').notNull().unique(),
  type: articleTypeEnum('type').notNull(),
  title: text('title').notNull(),
  eyebrow: text('eyebrow'),
  content: text('content').notNull(), // Markdown or JSON
  mediaId: uuid('media_id').references(() => media.id),
  isPublished: boolean('is_published').default(false).notNull(),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── COMMERCE ────────────────────────────────────────────────────────────────

export const orders = pgTable('orders', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderNumber: text('order_number').notNull().unique(), // e.g. BRD-2026-0912
  profileId: uuid('profile_id').references(() => profiles.id), // Nullable for guest checkout
  email: text('email').notNull(),
  shippingAddress: jsonb('shipping_address').notNull(), // Snapshot of address at time of order
  subtotal: decimal('subtotal', { precision: 10, scale: 2 }).notNull(),
  shippingFee: decimal('shipping_fee', { precision: 10, scale: 2 }).notNull(),
  total: decimal('total', { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum('status').default('pending').notNull(),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const orderItems = pgTable('order_items', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  productVariantId: uuid('product_variant_id').references(() => productVariants.id).notNull(),
  quantity: integer('quantity').notNull(),
  priceAtTime: decimal('price_at_time', { precision: 10, scale: 2 }).notNull(), // Snapshot price
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const payments = pgTable('payments', {
  id: uuid('id').defaultRandom().primaryKey(),
  orderId: uuid('order_id').references(() => orders.id).notNull(),
  razorpayOrderId: text('razorpay_order_id'),
  razorpayPaymentId: text('razorpay_payment_id'),
  amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
  method: paymentMethodEnum('method'),
  status: paymentStatusEnum('status').default('pending').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ─── ENGAGEMENT ──────────────────────────────────────────────────────────────

export const contactMessages = pgTable('contact_messages', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  isRead: boolean('is_read').default(false).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const newsletterSubscribers = pgTable('newsletter_subscribers', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// ─── RELATIONS ───────────────────────────────────────────────────────────────

export const productsRelations = relations(products, ({ one, many }) => ({
  collection: one(collections, {
    fields: [products.collectionId],
    references: [collections.id],
  }),
  variants: many(productVariants),
  materials: many(productMaterials),
}));

export const productVariantsRelations = relations(productVariants, ({ one }) => ({
  product: one(products, {
    fields: [productVariants.productId],
    references: [products.id],
  }),
  media: one(media, {
    fields: [productVariants.mediaId],
    references: [media.id],
  }),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [orders.profileId],
    references: [profiles.id],
  }),
  items: many(orderItems),
  payments: many(payments),
}));
