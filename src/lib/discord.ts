/**
 * Discord webhook helper.
 * Reads DISCORD_WEBHOOK_URL from environment variables.
 * Silently no-ops if the variable is not set so the app never crashes on missing config.
 */

interface DiscordEmbed {
  title?: string;
  description?: string;
  color?: number;
  fields?: { name: string; value: string; inline?: boolean }[];
  footer?: { text: string };
  timestamp?: string;
}

export async function sendDiscordAlert(
  title: string,
  description: string,
  options?: {
    color?: number;
    fields?: { name: string; value: string; inline?: boolean }[];
  }
) {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) return; // Silently skip if not configured

  const embed: DiscordEmbed = {
    title,
    description,
    color: options?.color ?? 0x3b82f6, // Default: blue
    fields: options?.fields,
    footer: { text: 'Bedroom Studios HQ' },
    timestamp: new Date().toISOString(),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ embeds: [embed] }),
    });
  } catch (err) {
    // Never crash the app over a notification failure
    console.warn('[Discord] Failed to send alert:', err);
  }
}

// Convenience color constants
export const DiscordColors = {
  green: 0x22c55e,
  amber: 0xf59e0b,
  red: 0xef4444,
  blue: 0x3b82f6,
  purple: 0xa855f7,
};
