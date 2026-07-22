import postgres from 'postgres';

const url = 'postgresql://postgres:x7vq1%24Rj6v!%25cp42VRW9@db.jaygqcmsesihwphxoofm.supabase.co:5432/postgres';

async function test() {
  try {
    const sql = postgres(url, { max: 1 });
    const result = await sql`SELECT 1 as connected`;
    console.log('Connected successfully:', result);
    process.exit(0);
  } catch (err) {
    console.error('Connection error:', err);
    process.exit(1);
  }
}

test();
