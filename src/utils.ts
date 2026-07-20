export function formatPrice(value) {
  if (value === null || value === undefined || isNaN(value)) {
    return 'Price TBD';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function getCountdownParts(targetDate) {
  const diff = Math.max(new Date(targetDate).getTime() - Date.now(), 0);
  const totalHours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  return { days, hours, minutes, isLive: diff === 0 };
}

export function getDeliveryInfoFromPincode(pincode) {
  if (!/^\d{6}$/.test(pincode)) {
    return null;
  }

  const firstDigit = Number(pincode[0]);

  if ([1, 2, 3].includes(firstDigit)) {
    return { shippingFee: 79, estimate: '3-5 business days', region: 'North and West India' };
  }

  if ([4, 5, 6].includes(firstDigit)) {
    return { shippingFee: 99, estimate: '4-6 business days', region: 'Central and South India' };
  }

  return { shippingFee: 129, estimate: '5-8 business days', region: 'East, Northeast, and extended routes' };
}

export function applyCoupon(code, subtotal) {
  const normalized = code.trim().toUpperCase();

  if (!normalized) {
    return { valid: false, discount: 0, message: '' };
  }

  if (normalized === 'DESK10') {
    return {
      valid: true,
      discount: Math.min(Math.round(subtotal * 0.1), 300),
      message: 'DESK10 applied. Good taste rewarded.',
    };
  }

  if (normalized === 'FIRSTDROP') {
    return {
      valid: true,
      discount: 150,
      message: 'FIRSTDROP applied. Tiny launch energy unlocked.',
    };
  }

  return {
    valid: false,
    discount: 0,
    message: 'That code did not survive quality control.',
  };
}
