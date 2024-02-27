async function verifyPassword(
  enteredPassword: string,
  storedHash: string
): Promise<boolean> {
  // Convert the entered password string to a Uint8Array
  const enteredPasswordBuffer = new TextEncoder().encode(enteredPassword);

  // Decode the stored hash from hexadecimal string to a Uint8Array
  let storedHashBuffer: Uint8Array = new Uint8Array(0); // Initialize with an empty array

  if (storedHash) {
    storedHashBuffer = new Uint8Array(
      storedHash.match(/.{1,2}/g)?.map((byte) => parseInt(byte, 16)) || []
    );
  }

  // Extract the salt from the stored hash (assuming it's appended to the hashed password)
  const saltLength = 16; // Length of the salt in bytes
  const salt = storedHashBuffer.slice(-saltLength);

  // Concatenate the entered password and salt
  const concatenatedBuffer = new Uint8Array(
    enteredPasswordBuffer.length + salt.length
  );
  concatenatedBuffer.set(enteredPasswordBuffer, 0);
  concatenatedBuffer.set(salt, enteredPasswordBuffer.length);

  // Hash the concatenated buffer using SHA-256
  const hashBuffer = await crypto.subtle.digest("SHA-256", concatenatedBuffer);

  // Convert the computed hash buffer to a hexadecimal string
  const computedHash = Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

  // Compare the computed hash with the stored hash
  return computedHash === storedHash;
}

export { verifyPassword };
