# phamax Signature Hub

A React-based web application to generate and copy standard email signatures for Phamax employees.

## Features

- **Live Preview:** See exactly what your signature will look like as you type your information.
- **Copy to Clipboard:** One-click copy that preserves rich HTML styling for pasting directly into Outlook, Gmail, or Apple Mail.
- **Export HTML:** Download the raw HTML code of your signature to install it manually.
- **Dark Mode Support:** Toggle the preview background between light and dark modes to see how your signature looks in different email environments.
- **Responsive Design:** Works beautifully on both desktop and mobile devices.

## Getting Started

### Prerequisites

You need Node.js and npm installed on your machine.

### Installation

1. Clone the repository and navigate to the project directory.
2. Install the dependencies:

```bash
npm install
```

### Running the Development Server

Start the Vite development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5175` (or whatever port Vite assigns) to view the application.

## Technologies Used

- **React:** UI library for building the application.
- **TypeScript:** Adds static typing to JavaScript for improved developer experience.
- **Tailwind CSS (v4):** Used for rapid, utility-first styling of the application interface.
- **Vite:** Next-generation frontend tooling for fast development and building.
- **Lucide React:** Beautiful, consistent icon set.

## Customization

The default placeholder data is defined in `src/types.ts`. You can modify `initialSignatureData` to change the starting placeholder text. Note that certain static elements, like the company address and websites, are hardcoded into the layout template found within `src/components/SignaturePreview.tsx`.
