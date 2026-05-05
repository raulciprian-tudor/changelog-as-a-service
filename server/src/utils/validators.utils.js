// Helper - check if field is empty
const isEmpty = (value, fieldName = 'Field') => {
  if (typeof value === 'string' && value.trim() === '') {
    return `${fieldName} is required`;
  }

  if (!value) {
    return `${fieldName} is required`;
  }

  return undefined;
};

// Helper - check if e-mail is valid
const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export { isEmpty, isValidEmail };
