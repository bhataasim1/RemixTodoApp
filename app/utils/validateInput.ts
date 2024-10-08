type InputData = {
  title: string;
  description: string;
  dueDate: string;
}

export function getCurrentDate() {
  const currentDate = new Date().toISOString();
  return currentDate.slice(0, 10);
}

function isValidDate(dueDate: string): boolean {
  const currentDate = new Date().toISOString();

  currentDate.slice(0, 10);

  return currentDate > dueDate;
}

export function validateInputData(inputData: InputData) {
  const errors: Partial<InputData> = {};
  if (!inputData.title) {
    errors.title = "Title is required";
  }

  if (inputData.title.length < 4 || inputData.title.length > 20) {
    errors.title = "Title must be between 4 and 20 characters";
  }

  if (!inputData.description) {
    errors.description = "Description is required";
  }

  if (inputData.description.length < 10 || inputData.description.length > 100) {
    errors.description = "Description must be between 10 and 100 characters";
  }

  if (!inputData.dueDate) {
    errors.dueDate = "Due date is required";
  }

  if (isValidDate(inputData.dueDate)) {
    errors.dueDate = "Due date must be in the future";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return {};
}