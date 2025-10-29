import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from 'node:crypto';

import config from '@/config';
import ErrorException from './ErrorException';

/**
 * Derives a 32-byte encryption key from the secret using SHA-256.
 * This is sufficient for a take-home demo while still being secure.
 */
function getEncryptionKey(secret: string): Buffer {
  return createHash('sha256').update(secret).digest();
}

/**
 * Encrypts a string (e.g., an API key) for secure storage.
 * Uses AES-256-GCM authenticated encryption.
 */
export function encrypt(plaintext: string): string {
  const key = getEncryptionKey(config.ENCRYPTION_SECRET);

  // Generate random initialization vector (required for security)
  const iv = randomBytes(12);

  // Create cipher with authenticated encryption
  const cipher = createCipheriv('aes-256-gcm', key, iv);

  // Encrypt the plaintext
  let encrypted = cipher.update(plaintext, 'utf8', 'base64');
  encrypted += cipher.final('base64');

  // Get the authentication tag (prevents tampering)
  const authTag = cipher.getAuthTag();

  // Combine iv:authTag:encryptedData for storage
  // Format: iv(12 bytes) + authTag(16 bytes) + encryptedData
  const combined = Buffer.concat([
    iv,
    authTag,
    Buffer.from(encrypted, 'base64'),
  ]);

  return combined.toString('base64');
}

/**
 * Decrypts a previously encrypted string.
 */
export function decrypt(encryptedData: string): string {
  const key = getEncryptionKey(config.ENCRYPTION_SECRET);

  try {
    const combined = Buffer.from(encryptedData, 'base64');

    // Extract components
    const iv = combined.subarray(0, 12);
    const authTag = combined.subarray(12, 28);
    const encrypted = combined.subarray(28);

    // Create decipher and verify authentication tag
    const decipher = createDecipheriv('aes-256-gcm', key, iv);
    decipher.setAuthTag(authTag);

    // Decrypt
    let decrypted = decipher.update(encrypted, undefined, 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  } catch (_error) {
    throw new ErrorException({
      message: `Unauthorized: Invalid API key`,
      statusCode: 401,
    });
  }
}
