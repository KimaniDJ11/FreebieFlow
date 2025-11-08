# FreebieFlow

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?logo=tailwindcss)](https://tailwindcss.com/)

A simple, modern Progressive Web App (PWA) to track your recurring free service credits. Never miss a renewal date or lose track of your monthly allowances again.

## Preview

*(It's highly recommended to replace this with a screenshot or GIF of the running application!)*

![FreebieFlow App Screenshot](https://via.placeholder.com/800x500.png?text=Your+App+Screenshot+Here)

## ✨ Features

- **Dynamic Dashboard:** Automatically sorts your services into `Active` and `Used` lists. Active services are sorted by the nearest renewal date.
- **Automatic Renewals:** When a service's renewal date passes, the app automatically resets its status to "Active" and calculates the next renewal date for you.
- **Modern UI/UX:** A clean, responsive interface with a beautiful dark mode, intuitive tap and long-press gestures, and visual timers for upcoming renewals.
- **No Backend Needed:** All data is stored securely and privately in your browser's `localStorage`. Your data never leaves your device.
- **Add, Edit, Delete:** Full CRUD functionality to manage your list of services through a simple modal interface.

## 🚀 Tech Stack

- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** React Hooks (`useState`, `useEffect`, `useMemo`)
- **Data Persistence:** Browser `localStorage`

## 🛠️ Getting Started

This project is set up to run directly in the browser without any build steps or package installations.

### Prerequisites

You only need a modern web browser and a way to serve the files from a local web server.

### Running the App

Because this app uses ES modules (`import`), you need to serve the files from a local web server rather than opening the `index.html` file directly from your file system. Here are two easy ways to do it:

**Option 1: Using the VS Code Live Server Extension**

1.  If you use Visual Studio Code, install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension.
2.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/freebieflow.git
    ```
3.  Open the cloned folder in VS Code.
4.  Right-click on the `index.html` file and select "Open with Live Server".

**Option 2: Using Python's built-in server**

1.  Make sure you have Python 3 installed.
2.  Clone the repository:
    ```bash
    git clone https://github.com/YOUR_USERNAME/freebieflow.git
    ```
3.  Navigate into the project directory:
    ```bash
    cd freebieflow
    ```
4.  Start the server:
    ```bash
    python -m http.server
    ```
5.  Open your web browser and go to `http://localhost:8000`.

## 📂 Project Structure

```
/
├── components/         # Reusable React components
│   ├── AddServiceModal.tsx
│   ├── ServiceItem.tsx
│   ├── ServiceList.tsx
│   └── icons.tsx
├── services/           # Handles external interactions (e.g., localStorage)
│   └── storageService.ts
├── utils/              # Helper functions and business logic
│   └── renewalUtils.ts
├── App.tsx             # Main application component
├── index.html          # HTML entry point
├── index.tsx           # React root renderer
├── metadata.json       # Application metadata
├── types.ts            # TypeScript type definitions
└── README.md           # This file
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page. A major area for future improvement would be adding an optional cloud sync feature using a service like Firebase.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
