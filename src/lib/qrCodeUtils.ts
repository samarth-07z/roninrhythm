/**
 * Generate QR code data containing user information
 * @param id - User's unique ID
 * @param name - User's full name
 * @param email - User's email
 * @param phone - User's phone number
 * @returns JSON string with user data
 */
export const generateQRCodeData = (
  id: string,
  name: string,
  email: string,
  phone: string
): string => {
  return JSON.stringify({
    id,
    name,
    email,
    phone,
    timestamp: new Date().toISOString(),
  });
};

/**
 * Format user data for display in QR code
 */
export const formatUserDataForQR = (
  id: string,
  name: string,
  email: string,
  phone: string
): string => {
  return `ID: ${id}\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`;
};
