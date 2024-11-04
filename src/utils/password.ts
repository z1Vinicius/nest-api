import crypto from 'crypto';

function encryptPassword(password: string) {
  const salt = crypto.randomBytes(16);
  console.log('salt', salt);
  const hash = crypto.createHmac('sha256', salt.toString('hex'));
  hash.update(password);
  return hash.digest('hex');
}

export { encryptPassword };
