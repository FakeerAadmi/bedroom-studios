/**
 * Discord Slash Commands Registration Script for Bedroom Studios
 * Usage:
 *   DISCORD_BOT_TOKEN="your_token" DISCORD_CLIENT_ID="your_client_id" node scripts/register-discord-commands.mjs
 * Or set DISCORD_GUILD_ID to register instantly to your specific server!
 */

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
const GUILD_ID = process.env.DISCORD_GUILD_ID; // Optional: registering to a specific Guild updates instantly without a 1-hour global cache delay

if (!BOT_TOKEN || !CLIENT_ID) {
  console.error(`
❌ Missing Environment Variables!
Please run with:
  DISCORD_BOT_TOKEN="..." DISCORD_CLIENT_ID="..." node scripts/register-discord-commands.mjs

Optional for instant local guild registration:
  DISCORD_GUILD_ID="..." (Server ID)
`);
  process.exit(1);
}

const commands = [
  {
    name: 'orders',
    description: 'Fetch the 5 most recent orders and sample requests.',
  },
  {
    name: 'lookup',
    description: 'Inspect details, customer info, and live status of a specific order.',
    options: [
      {
        name: 'code',
        description: 'The order code (e.g. BS-104921 or 104921)',
        type: 3, // STRING
        required: true,
      },
    ],
  },
  {
    name: 'status',
    description: 'Advance or update the fabrication/shipping status of an order directly from Discord.',
    options: [
      {
        name: 'code',
        description: 'The order code (e.g. BS-104921)',
        type: 3, // STRING
        required: true,
      },
      {
        name: 'stage',
        description: 'The new order pipeline stage',
        type: 3, // STRING
        required: true,
        choices: [
          { name: '⏳ Pending Confirmation', value: 'pending' },
          { name: '📋 Processing / Queue', value: 'processing' },
          { name: '🛠️ Manufacturing (3D Print / Cast)', value: 'manufacturing' },
          { name: '🚀 Shipped', value: 'shipped' },
          { name: '✨ Delivered', value: 'delivered' },
        ],
      },
    ],
  },
  {
    name: 'stats',
    description: 'Get an overview of active orders, in-production batches, and store status.',
  },
];

async function registerCommands() {
  const url = GUILD_ID
    ? `https://discord.com/api/v10/applications/${CLIENT_ID}/guilds/${GUILD_ID}/commands`
    : `https://discord.com/api/v10/applications/${CLIENT_ID}/commands`;

  console.log(`Registering ${commands.length} slash commands to ${GUILD_ID ? `Guild ${GUILD_ID}` : 'Global Discord'}...`);

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(commands),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Discord API returned ${res.status}: ${errorText}`);
    }

    const data = await res.json();
    console.log('✅ Successfully registered slash commands with Discord!');
    console.log('Registered commands:', data.map((c) => `/${c.name}`).join(', '));
  } catch (err) {
    console.error('❌ Failed to register commands:', err.message);
  }
}

registerCommands();
