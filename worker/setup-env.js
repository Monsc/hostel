const { execSync } = require('child_process');

const secrets = [
  'MONGODB_URI',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
  'JWT_SECRET',
  'ZOHO_SMTP_USER',
  'ZOHO_SMTP_PASS'
];

console.log('Setting up environment variables for Cloudflare Worker...');

secrets.forEach(secret => {
  try {
    console.log(`Setting ${secret}...`);
    execSync(`wrangler secret put ${secret}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Error setting ${secret}:`, error.message);
  }
});

console.log('Environment variables setup complete!'); 