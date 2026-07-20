export function validateEnv() {
  const requiredEnvs = [
    // Add required environment variables here (e.g. 'NEXT_PUBLIC_API_URL', 'STRIPE_SECRET_KEY')
  ];

  const missingEnvs = requiredEnvs.filter((env) => !process.env[env]);

  if (missingEnvs.length > 0) {
    throw new Error(
      `❌ Invalid environment variables: Missing ${missingEnvs.join(', ')}`
    );
  }
}

// Execute immediately in module scope
validateEnv();
