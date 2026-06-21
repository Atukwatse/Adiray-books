/**
 * Application-wide constants and configuration values.
 */

export const PROJECT_PHONE = '+211920889342';
export const PROJECT_PHONE_CLEAN = '211920889342';

export const WHATSAPP_CONFIG = {
  phone: PROJECT_PHONE_CLEAN,
  defaultMessage: (bookTitle, bookAuthor) => 
    `Hi Adiray Books, I want to buy "${bookTitle}" by ${bookAuthor}.`
};

export const DELIVERY_COSTS = {
  HOME: 2.00,
  STATE: 10.00,
  PICKUP: 0.00
};
