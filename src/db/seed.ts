/* eslint-disable no-console */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is missing.');
}

const client = postgres(connectionString, { max: 1 });
const db = drizzle(client, { schema });

async function seed() {
  console.log('🌱 Starting database seed...');

  // 1. Create Media
  console.log('Creating Media...');
  const mediaItems = await db.insert(schema.media).values([
    { id: uuidv4(), bucket: 'products', filename: 'coaster.jpg', altText: 'Cement Coaster', mimeType: 'image/jpeg' },
    { id: uuidv4(), bucket: 'products', filename: 'tray.jpg', altText: 'PLA+ Tray', mimeType: 'image/jpeg' },
    { id: uuidv4(), bucket: 'products', filename: 'paperweight.jpg', altText: 'Existential Paperweight', mimeType: 'image/jpeg' },
    { id: uuidv4(), bucket: 'articles', filename: 'journal1.jpg', altText: 'Material Study', mimeType: 'image/jpeg' },
  ]).returning();

  // 2. Create Collections
  console.log('Creating Collections...');
  const collections = await db.insert(schema.collections).values([
    { id: uuidv4(), slug: 'desk-objects', name: 'Desk Objects', description: 'Tools for the desk.' },
    { id: uuidv4(), slug: 'apparel', name: 'Apparel', description: 'Heavyweight cotton uniforms.' },
  ]).returning();

  // 3. Create Products
  console.log('Creating Products...');
  const products = await db.insert(schema.products).values([
    {
      id: uuidv4(),
      slug: 'cement-coaster',
      name: 'Cement Coaster',
      label: 'BRD-01',
      description: 'Raw industrial cement coaster with cork bottom. Pours and cures are done by hand, making each piece unique.',
      collectionId: collections[0].id,
      isDraft: false,
    },
    {
      id: uuidv4(),
      slug: 'pla-valet-tray',
      name: 'PLA+ Valet Tray',
      label: 'BRD-02',
      description: 'Precision 3D printed valet tray in PLA+. Designed to catch your keys, change, and existential dread.',
      collectionId: collections[0].id,
      isDraft: false,
    },
    {
      id: uuidv4(),
      slug: 'existential-paperweight',
      name: 'Existential Crisis Paperweight',
      label: 'BRD-03',
      description: 'A heavy block of steel. Functions as a paperweight, but mostly serves as a reminder of gravity.',
      collectionId: collections[0].id,
      isDraft: false,
    }
  ]).returning();

  // 4. Create Product Variants
  console.log('Creating Product Variants...');
  await db.insert(schema.productVariants).values([
    { id: uuidv4(), productId: products[0].id, sku: 'CCT-RAW-01', name: 'Raw Grey', price: '499.00', inventory: 50, mediaId: mediaItems[0].id },
    { id: uuidv4(), productId: products[0].id, sku: 'CCT-RED-01', name: 'Patriot Red', price: '599.00', inventory: 15, mediaId: mediaItems[0].id },
    { id: uuidv4(), productId: products[1].id, sku: 'TRAY-BLK-01', name: 'Carbon Black', price: '899.00', inventory: 30, mediaId: mediaItems[1].id },
    { id: uuidv4(), productId: products[2].id, sku: 'EPW-STL-01', name: 'Raw Steel', price: '1499.00', inventory: 10, mediaId: mediaItems[2].id },
  ]);

  // 5. Create Materials
  console.log('Creating Materials...');
  await db.insert(schema.materials).values([
    { id: uuidv4(), slug: 'pla-plus', name: 'PLA+', description: 'The workhorse. Rigid, clean, and dialled in.', mediaId: mediaItems[3].id },
    { id: uuidv4(), slug: 'industrial-cement', name: 'Industrial Cement', description: 'Heavy, porous, and unapologetically raw.', mediaId: mediaItems[3].id },
  ]).returning();

  // 6. Create Articles
  console.log('Creating Articles...');
  await db.insert(schema.articles).values([
    {
      id: uuidv4(),
      slug: 'substance-over-surface',
      type: 'journal',
      title: 'Substance over surface.',
      eyebrow: 'Materials Ethos',
      content: 'We believe that the materials we use shape the way we work. A heavy steel paperweight commands a different kind of respect than a hollow plastic one.',
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      id: uuidv4(),
      slug: 'resin-casting-failures',
      type: 'bedroom_lab',
      title: 'Resin Casting: A catalog of failures',
      eyebrow: 'Experiment 04',
      content: 'Prototyping in public. We tried to cast a solid block of resin. It overheated, cracked, and ruined the mold. Here is what we learned.',
      isPublished: true,
      publishedAt: new Date(),
    },
    {
      id: uuidv4(),
      slug: 'cement-care',
      type: 'care_guide',
      title: 'How to care for industrial cement',
      eyebrow: 'Care Guide',
      content: 'Cement is porous. It will stain. It will chip. Embrace the wabi-sabi.',
      isPublished: true,
      publishedAt: new Date(),
    }
  ]);

  console.log('✅ Seed completed successfully.');
  await client.end();
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
