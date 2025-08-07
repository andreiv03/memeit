# MemeIT?

A full-stack meme upload and sharing platform built with **TypeScript**, **React + Vite** on the frontend, and a **Node.js + Express** backend. Upload memes, add descriptions, and browse shared content.

## ✨ Features

- **Meme Upload** – Upload your own memes from local files.
- **Add Descriptions** – Attach text to your memes.
- **Meme List** – View all uploaded memes in a clean layout.
- **Dark Mode** – Switch between light and dark themes.
- **Fast & Modular** – Built with Vite, Express, and TypeScript.

## ⚡ Technology Stack

### Frontend (client)
- **React + Vite** – Fast UI development.
- **TypeScript** – Strongly typed for reliability.
- **SCSS Modules** – Scoped, modular styles.
- **ESLint & Prettier** – Consistent code formatting.
- **Axios** – Handles API requests.

### Backend (server)
- **Node.js + Express** – REST API for handling uploads.
- **TypeScript** – Fully typed backend logic.
- **Cloudinary SDK** – Image hosting and CDN delivery.
- **CORS & Middleware** – Configured for smooth frontend/backend integration.

## ⚙️ Build & Installation

### Prerequisites

Before installing the project, ensure you have the following installed:

- **Node.js (16+)** – Required to run React.
- **npm** or **yarn** – To install dependencies and run scripts.

### Installation Instructions

Follow these steps to clone, build, and run MemeIT?:
```sh
# Clone the repository
git clone https://github.com/andreiv03/memeit.git
cd memeit

# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install

# Start the backend server (default: http://localhost:5000)
cd server
npm run dev

# In another terminal, start the frontend (default: http://localhost:5173)
cd ../client
npm run dev
```
The app will be accessible at [http://localhost:5173](http://localhost:5173).

## 🤝 Contributing

Contributions are welcome! If you'd like to enhance the project, follow these steps:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature-branch`)
3. **Commit** your changes (`git commit -m "feat: add new feature"`)
4. **Push** your changes (`git push origin feature-branch`)
5. Open a **Pull Request** 🚀

For suggestions or bug reports, feel free to open an issue with the appropriate label.

⭐ **If you find this project useful, consider giving it a star!** ⭐

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.
