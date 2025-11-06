# Glass Editor - React Components Library

A beautiful collection of glassmorphic UI components built with React, featuring an AI-powered text editor.

## Features

- 🎨 Beautiful glassmorphic design
- ✍️ Rich text editor with formatting options
- 🤖 AI-powered text refinement (OpenAI integration)
- 💭 Brainstorming mode with story structure generation
- 📝 Auto-save functionality
- 📤 Export documents as HTML

## Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server (with serverless functions)
npm run dev

# This will:
# - Run Vite dev server for the React app
# - Run Vercel serverless functions locally
# - Make API endpoints available at /api/*
# - Automatically open your browser at http://localhost:3000
```

**Important for First Run:**
- The first time you run `npm run dev`, Vercel CLI may ask you to log in
- You can run it without logging in by pressing "Continue without login"
- Make sure your `.env` file has `OPENAI_API_KEY=your_key_here`

### Build for Production

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Deployment on Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI globally:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Vercel will automatically detect Vite and configure the build settings
5. Add your OpenAI API key as an environment variable:
   - Go to Project Settings → Environment Variables
   - Add: `OPENAI_API_KEY` with your API key

### Environment Variables

For the AI features to work, you need to set up an OpenAI API key:

1. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. For **local development**, create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_api_key_here
```
3. For **Vercel deployment**, add the environment variable in your project settings:
   - Go to Project Settings → Environment Variables
   - Add: `OPENAI_API_KEY` (without VITE_ prefix) with your API key

**Important:** Never commit your `.env` file or expose your API key publicly. The API key is now securely handled by serverless functions.

## Project Structure

```
react-components/
├── react-components/   # UI component library
│   ├── TextEditor.jsx  # Main editor component
│   ├── Button.jsx
│   ├── Input.jsx
│   └── ...            # Other components
├── src/               # Application entry point
│   ├── main.jsx       # React entry
│   └── global.css     # Global styles
├── index.html         # HTML template
├── vite.config.js     # Vite configuration
├── vercel.json        # Vercel deployment config
└── package.json       # Dependencies
```

## Components

The library includes various glassmorphic components:
- Text Editor (with AI features)
- Buttons
- Inputs & Textareas
- Cards
- Modals
- Navigation
- Progress bars
- Toggles, Radio buttons, Checkboxes
- Sliders, Select dropdowns
- Tooltips, Badges, Alerts
- And more!

## Technologies

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **OpenAI API** - AI-powered text refinement
- **CSS3** - Glassmorphic styling

## License

MIT

