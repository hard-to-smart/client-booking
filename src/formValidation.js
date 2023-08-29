import validator from "validator";

export const validatePersonalDetails = (personalDetails, setPersonalDetailsErrors) => {
  let isValid = true;
  const errors = {};

  // Company validation
  if (!personalDetails.company.trim()) {
    isValid = false;
    errors.company = "Company name is required";
  }

  // First Name validation
  if (!personalDetails.firstName.trim()) {
    isValid = false;
    errors.firstName = "First name is required";
  }

  // Last Name validation
  if (!personalDetails.lastName.trim()) {
    isValid = false;
    errors.lastName = "Last name is required";
  }

  // Phone validation
  if (!personalDetails.phone.match(/^\d{3}-\d{3}-\d{4}$/)) {
    isValid = false;
    errors.phone = "Phone number must be in the format XXX-XXX-XXXX";
  }

  // Email validation
  if (!personalDetails.email.trim() || !validator.isEmail(personalDetails.email)) {
    isValid = false;
    errors.email = "Please provide a valid email";
  }

  // Designation validation
  if (!personalDetails.designation.trim()) {
    isValid = false;
    errors.designation = "Designation is required";
  }
  // Date validation
  const selectedDate = new Date(personalDetails.date);
  const currentDate = new Date();

  // Check if selected date is a weekend (Saturday or Sunday)
  const isWeekend = selectedDate.getDay() === 0 || selectedDate.getDay() === 6;

  // Check if selected date is in the future
  const isFutureDate = selectedDate > currentDate;

  if (!isFutureDate) {
    isValid = false;
    errors.date = "Please select a future date.";
  } else if (isWeekend) {
    isValid = false;
    errors.date = "Weekend dates are not allowed.";
  }
  setPersonalDetailsErrors(errors);
  return isValid;
};
