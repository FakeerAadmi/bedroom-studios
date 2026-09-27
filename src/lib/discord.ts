/**
 * Bedroom Studios Discord Integration Suite
 * Supports routed webhooks for:
 * - Orders & Sample Requests (DISCORD_ORDERS_WEBHOOK_URL)
 * - Live Visitor Radar & Telemetry (DISCORD_VISITORS_WEBHOOK_URL)
 * - Custom Commissions & Inquiries (DISCORD_COMMISSIONS_WEBHOOK_URL)
 * - Fallback to general DISCORD_WEBHOOK_URL
 *
 * Never crashes the host application if webhooks fail or env variables are unconfigured.
 */

export interface DiscordEmbed {
  title?: string;
  description?: string;
  url?: string;
  color?: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  thumbnail?: { url: string };
  footer?: { text: string; icon_url?: string };
  timestamp?: string;
}

export type WebhookChannelType = 'orders' | 'visitors' | 'commissions' | 'general';

export const DiscordColors = {
  green: 0x22c55e,    // #22c55e - Orders / Success
  amber: 0xf59e0b,    // #f59e0b - Pending / Review
  red: 0xef4444,      // #ef4444 - Urgent / Alert
  blue: 0x0057ff,     // #0057ff - Bedroom Blue (Primary Accent)
  purple: 0xa855f7,   // #a855f7 - Commissions / Creative
  lime: 0xd4ff00,     // #d4ff00 - Bedroom Studios Acid Lime
  dark: 0x1c1c1a,     // #1c1c1a - Brutalist Ink
};

/**
 * Resolves the destination webhook URL based on the channel category.
 */
function resolveWebhookUrl(type: WebhookChannelType = 'general'): string | undefined {
  if (type === 'orders') {
    return process.env.DISCORD_ORDERS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  }
  if (type === 'visitors') {
    return process.env.DISCORD_VISITORS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  }
  if (type === 'commissions') {
    return process.env.DISCORD_COMMISSIONS_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL;
  }
  return process.env.DISCORD_WEBHOOK_URL;
}

/**
 * Sends a generic raw Discord Embed alert.
 */
export async function sendDiscordAlert(
  title: string,
  description: string,
  options?: {
    type?: WebhookChannelType;
    color?: number;
    fields?: { name: string; value: string; inline?: boolean }[];
    url?: string;
  }
) {
  const webhookUrl = resolveWebhookUrl(options?.type);
  if (!webhookUrl) return;

  const embed: DiscordEmbed = {
    title,
    description,
    url: options?.url,
    color: options?.color ?? DiscordColors.blue,
    fields: options?.fields,
    footer: { text: 'Bedroom Studios Dispatch' },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (err) {
    console.warn('[Discord Webhook] Failed to deliver alert:', err);
  }
}

/**
 * Formats country codes into friendly flag emojis.
 */
export function getCountryFlag(countryCode?: string): string {
  if (!countryCode || countryCode.length !== 2) return '🌐';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

/**
 * Converts raw user-agent string into a clean, human-readable device name.
 */
export function parseUserAgent(ua?: string): { device: string; browser: string } {
  if (!ua) return { device: 'Unknown Device', browser: 'Unknown' };

  let device = 'Desktop';
  if (/mobile/i.test(ua)) device = '📱 Mobile';
  else if (/tablet|ipad/i.test(ua)) device = '📱 Tablet';
  else if (/macintosh|mac os x/i.test(ua)) device = '💻 Mac';
  else if (/windows/i.test(ua)) device = '🖥️ Windows';
  else if (/linux/i.test(ua)) device = '🐧 Linux';

  let browser = 'Browser';
  if (/edg/i.test(ua)) browser = 'Edge';
  else if (/chrome|crios/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua) && !/chrome/i.test(ua)) browser = 'Safari';
  else if (/firefox|fxios/i.test(ua)) browser = 'Firefox';

  return { device, browser };
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. ORDER & SAMPLE REQUEST NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface OrderNotificationPayload {
  orderId: string;
  customerName: string;
  email: string;
  phone?: string;
  items: Array<{
    name: string;
    quantity: number;
    price?: number;
    color?: string;
    material?: string;
  }>;
  total?: number;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    pincode?: string;
  };
  notes?: string;
}

export async function sendOrderNotification(payload: OrderNotificationPayload) {
  const webhookUrl = resolveWebhookUrl('orders');
  if (!webhookUrl) return;

  const { orderId, customerName, email, phone, items, total, address, notes } = payload;

  const formattedItems = items
    .map((item) => {
      const variantDetails = [item.color, item.material].filter(Boolean).join(' · ');
      const variantSuffix = variantDetails ? ` (${variantDetails})` : '';
      return `• **${item.quantity}×** ${item.name}${variantSuffix}`;
    })
    .join('\n') || 'No items listed';

  const destination = address
    ? [address.city, address.state, address.pincode].filter(Boolean).join(', ')
    : 'Not provided';

  const trackUrl = `https://bedroomstudios.vercel.app/track?code=${orderId}`;

  const fields = [
    { name: '👤 Client', value: `${customerName}\n📧 \`${email}\`${phone ? `\n📞 \`${phone}\`` : ''}`, inline: true },
    { name: '📍 Destination', value: destination, inline: true },
    { name: '📦 Requested Objects', value: formattedItems, inline: false },
  ];

  if (total && total > 0) {
    fields.push({ name: '💰 Total Value', value: `₹${total.toLocaleString('en-IN')}`, inline: true });
  } else {
    fields.push({ name: '🏷️ Order Type', value: 'Studio Sample / Showcase Request', inline: true });
  }

  fields.push({
    name: '🔗 Action Links',
    value: `[Track Order](${trackUrl}) · [Admin Dashboard](https://bedroomstudios.vercel.app/hq)`,
    inline: false,
  });

  if (notes) {
    fields.push({ name: '📝 Client Notes', value: notes, inline: false });
  }

  const embed: DiscordEmbed = {
    title: `🛍️ New Order / Sample Request: ${orderId}`,
    url: trackUrl,
    description: `A new client order has been placed on **Bedroom Studios**.`,
    color: DiscordColors.green,
    fields,
    footer: { text: 'Bedroom Studios Order Stream' },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: `🚨 **New Studio Request:** \`${orderId}\` from **${customerName}**!`,
        embeds: [embed],
      }),
    });
  } catch (err) {
    console.warn('[Discord Orders] Failed to send notification:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. ORDER STAGE & STATUS LIFECYCLE NOTIFICATIONS
// ─────────────────────────────────────────────────────────────────────────────

export interface StatusUpdatePayload {
  orderId: string;
  customerName?: string;
  oldStatus?: string;
  newStatus: string;
  stageNumber?: number;
  note?: string;
}

export async function sendStatusUpdateNotification(payload: StatusUpdatePayload) {
  const webhookUrl = resolveWebhookUrl('orders');
  if (!webhookUrl) return;

  const { orderId, customerName, newStatus, stageNumber, note } = payload;

  const stageIcons: Record<string, string> = {
    pending: '⏳ Pending Confirmation',
    processing: '📋 Order Accepted / In Queue',
    manufacturing: '🛠️ In Production (3D Printing / Cement Pour)',
    shipped: '🚀 Dispatched / Shipped Out',
    delivered: '✨ Delivered & Settled on Desk',
  };

  const statusLabel = stageIcons[newStatus.toLowerCase()] || `Status: ${newStatus}`;
  const trackUrl = `https://bedroomstudios.vercel.app/track?code=${orderId}`;

  const embed: DiscordEmbed = {
    title: `🔄 Order ${orderId} Status Updated`,
    url: trackUrl,
    description: `Order stage updated to **${statusLabel}**${customerName ? ` for client **${customerName}**` : ''}.`,
    color: newStatus === 'delivered' ? DiscordColors.lime : DiscordColors.blue,
    fields: [
      { name: '📦 Current Stage', value: statusLabel, inline: true },
      { name: '🔢 Pipeline Step', value: stageNumber ? `Stage ${stageNumber}/6` : 'Active', inline: true },
    ],
    footer: { text: 'Bedroom Studios Production Floor' },
    timestamp: new Date().toISOString(),
  };

  if (note) {
    embed.fields?.push({ name: '💬 Update Note', value: note, inline: false });
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (err) {
    console.warn('[Discord Orders] Failed to send status update:', err);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. VISITOR RADAR & LIVE TELEMETRY
// ─────────────────────────────────────────────────────────────────────────────

export interface VisitorTelemetryPayload {
  path: string;
  title?: string;
  referrer?: string;
  city?: string;
  country?: string;
  region?: string;
  userAgent?: string;
  ip?: string;
  intentAction?: string;
  productName?: string;
}

export async function sendVisitorTelemetry(payload: VisitorTelemetryPayload) {
  const webhookUrl = resolveWebhookUrl('visitors');
  if (!webhookUrl) return;

  const { path, title, referrer, city, country, region, userAgent, intentAction, productName } = payload;
  const flag = getCountryFlag(country);
  const locationStr = [city, region, country].filter(Boolean).join(', ') || 'Unknown Location';
  const { device, browser } = parseUserAgent(userAgent);

  const cleanReferrer = !referrer || referrer === '' ? 'Direct / Bookmark' : referrer;

  let color = DiscordColors.dark;
  let actionTitle = '👀 Site Visit';

  if (intentAction === 'request_sample_intent') {
    color = DiscordColors.lime;
    actionTitle = '🎯 High Intent: Clicked "Request Sample"';
  } else if (intentAction === 'product_view') {
    color = DiscordColors.blue;
    actionTitle = `💡 Product Study: ${productName || title || path}`;
  } else if (intentAction === 'cart_open') {
    color = DiscordColors.amber;
    actionTitle = '🛍️ Opened Sample Batch Drawer';
  } else if (intentAction === 'commission_intent') {
    color = DiscordColors.purple;
    actionTitle = '🎨 Started Custom Commission Brief';
  }

  const fields = [
    { name: '📍 Location', value: `${flag} ${locationStr}`, inline: true },
    { name: '📱 Platform', value: `${device} · ${browser}`, inline: true },
    { name: '🔗 Page / Object', value: `\`${path}\`${title ? `\n*${title}*` : ''}`, inline: false },
    { name: '🧭 Traffic Source', value: cleanReferrer, inline: true },
  ];

  if (productName) {
    fields.push({ name: '🪔 Focus Object', value: `**${productName}**`, inline: true });
  }

  const embed: DiscordEmbed = {
    title: `${actionTitle}`,
    description: `Visitor telemetry recorded from **${locationStr}**.`,
    color,
    fields,
    footer: { text: 'Bedroom Studios Live Radar' },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (err) {
    console.warn('[Discord Telemetry] Failed to deliver visitor ping:', err);
  }
}
