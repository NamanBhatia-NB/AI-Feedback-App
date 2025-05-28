# AI-Feedback-Analyzer

**AI-Feedback-Analyzer** is a full-stack web application built with **Next.js**, designed to collect, analyze, and visualize user feedback using AI. It leverages modern tools such as Recharts for data visualization, Recoil for state management, and Mongoose for MongoDB interaction. The project also integrates NextAuth for authentication.

## 🌐 Live Demo

👉 [Check out the live site](https://ai-feedback-analyzer-9rew.vercel.app)

---

## ✨ Features

- ✍️ **Feedback Collection**: Users can submit feedback through a clean and modern UI
- 🤖 **AI Analysis** *(planned or inferred)*: Could integrate OpenAI for sentiment analysis or summarization
- 📊 **Visual Reports**: Displays analytical insights using Recharts
- 🔐 **Authentication**: Handled via NextAuth
- ☁️ **Database**: MongoDB + Mongoose for efficient data storage and querying

---

## 🚀 Tech Stack

| Area | Technology |
|------|------------|
| Frontend | Next.js, React 19, Tailwind CSS |
| Backend | Node.js, MongoDB (via Mongoose) |
| State Mgmt | Recoil |
| Auth | NextAuth |
| Visualization | Recharts |
| Styling | Tailwind CSS, Emotion |
| Utilities | Axios, bcryptjs |

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Dhruv-Rankoti/AI-Feedback-Analyzer.git
cd AI-Feedback-Analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory and add the following:

```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_auth_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_key_if_used
```

### 4. Run the development server

```bash
npm run dev
```

Open your browser and go to `http://localhost:3000`

---

## 📁 Project Structure

```
.
├── components/       # Reusable React components
├── pages/            # Next.js pages and API routes
├── public/           # Static assets
├── styles/           # TailwindCSS styles (if any)
├── .env.local        # Local environment variables
├── package.json      # Dependencies and scripts
```

---

## 🧪 Scripts

```bash
npm run dev       # Start development server with Turbopack
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint checks
```

---

## 🛠 Config Highlights

- **ESLint**: Configured with `next/core-web-vitals`
- **TailwindCSS**: Configured with `tailwind.config.js` and PostCSS
- **Aliases**: `@/*` path shortcuts enabled via `jsconfig.json`

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/feature-name`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/feature-name`
5. Open a pull request

---

## 📄 License

This project is licensed under the MIT License.

---

**Made with ❤️ by [Dhruv Rankoti](https://github.com/Dhruv-Rankoti)**