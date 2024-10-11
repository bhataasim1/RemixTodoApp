import { User } from "../types/types";

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
  // console.log(dueDate);
  const currentDate = new Date().toISOString().split("T")[0];

  // currentDate.slice(0, 10);
  // console.log(currentDate);

  return dueDate < currentDate;
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

export function validateAuthInputs(inputData: Pick<User, "first_name" | "last_name" | "email" | "password">) {
  const errors: Partial<User> = {};

  if (!inputData.first_name) {
    errors.first_name = "First name is required";
  }

  if (inputData.first_name.length < 3) {
    errors.first_name = "First name must be at least 3 characters";
  }

  if (!inputData.last_name) {
    errors.last_name = "Last name is required";
  }

  if (inputData.last_name.length < 3) {
    errors.last_name = "Last name must be at least 3 characters";
  }


  if (!inputData.email) {
    errors.email = "Email is required";
  }

  if (!isEmailValid(inputData.email)) {
    errors.email = "Email is invalid";
  }

  if (!inputData.password) {
    errors.password = "Password is required";
  }

  if (inputData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return {};
}

function isEmailValid(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;  // Regex by AI Copilot
  return emailRegex.test(email);
}