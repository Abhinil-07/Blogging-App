async function hashPassword(password: string): Promise<string> {
  // Convert the password string to a Uint8Array
  const passwordBuffer = new TextEncoder().encode(password);

  // Generate a random salt
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // Concatenate the password and salt
  const concatenatedBuffer = new Uint8Array(
    passwordBuffer.length + salt.length
  );
  concatenatedBuffer.set(passwordBuffer, 0);
  concatenatedBuffer.set(salt, passwordBuffer.length);

  // Hash the concatenated buffer using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", concatenatedBuffer);

  // Convert the hash buffer to a hexadecimal string
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
}
export { hashPassword };
