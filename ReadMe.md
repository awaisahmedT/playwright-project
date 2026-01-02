📘 Playwright Page Object Model Framework
🔹 Overview
This project demonstrates a clean and scalable Playwright automation framework using the Page Object Model (POM) design pattern.It is built with TypeScript and follows best practices used in real-world QA automation projects.

🔹 Tech Stack
* Playwright
* TypeScript
* Page Object Model (POM)

🔹 Project Structure


pages/        → Page Objects (locators & actions)
tests/        → Test cases & assertions

🔹 Design Approach
* Each application page is represented by a separate Page class
* A BasePage handles shared functionality
* Tests focus only on test flow and assertions
* Playwright Test Runner controls browser lifecycle

🔹 Example Flow
1. User navigates to login page
2. User logs in using valid credentials
3. Dashboard page is validated

🔹 How to Run Tests


npm install
npx playwright install
npx playwright test

🔹 Why Page Object Model?
* Improves readability
* Enhances maintainability
* Reduces duplication
* Makes tests scalable


Regards,
Awais