# Quick Start Guide

## Running the Component Library Locally

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Steps

1. **Install Dependencies** (first time only)
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   - The terminal will show a local URL (usually `http://localhost:5173`)
   - Press `Ctrl` and click on the URL, or copy and paste it into your browser
   - You should see all components displayed in the Dev showcase page!

### Available Commands

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### Viewing Different Pages

By default, the app shows the **Dev.jsx** showcase page with all components.

To switch between pages, edit `src/main.jsx`:

**For the showcase page (all components):**
```jsx
import Dev from '../react-components/Dev.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Dev />
  </React.StrictMode>,
)
```

**For the original App page:**
```jsx
import App from '../react-components/App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### Hot Reload

Vite provides instant hot module replacement (HMR). Any changes you make to the components will automatically update in the browser without refreshing!

### Troubleshooting

**Port already in use:**
If port 5173 is busy, Vite will automatically try the next available port (5174, 5175, etc.)

**Module not found errors:**
Make sure you ran `npm install` first.

**Browser not opening automatically:**
Manually copy the URL from the terminal and paste it into your browser.

### Project Structure

```
react-components/
├── src/
│   └── main.jsx          # Entry point
├── react-components/
│   ├── Dev.jsx           # Showcase page (all components)
│   ├── App.jsx           # Original demo page
│   └── [All components]  # Individual component files
├── index.html            # HTML template
├── package.json          # Dependencies
└── vite.config.js        # Vite configuration
```

Enjoy exploring your beautiful glassmorphic components! 🎨✨




