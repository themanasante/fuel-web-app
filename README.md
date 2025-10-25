
# Fuel Management Web App

This is a modern Fuel Management Web Application built with React, TypeScript, and Vite. The original project design is available at https://www.figma.com/design/i3bxdyjagtdsmxoA8BbV1h/Fuel-Management-Web-App.

## Features

- 🚀 Modern React 18 + TypeScript
- ⚡ Vite for fast development and building
- 🎨 Tailwind CSS for styling
- 🧩 Radix UI components
- 📱 Responsive design
- 🔧 Complete fuel management dashboard

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/themanasante/fuel-web-app.git
cd fuel-web-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm start` - Start production server

## Deployment

### Deploy to Vercel

This project is optimized for Vercel deployment with zero configuration:

1. **One-click Deploy:**
   [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/themanasante/fuel-web-app)

2. **Manual Deploy:**
   - Fork or clone this repository
   - Connect your GitHub account to Vercel
   - Import the project to Vercel
   - Deploy automatically with optimal settings

3. **CLI Deploy:**
   ```bash
   npm install -g vercel
   vercel
   ```

### Deploy to Other Platforms

The built files are static and can be deployed to any static hosting service:

- **Netlify:** Drag and drop the `dist` folder
- **GitHub Pages:** Use GitHub Actions for automatic deployment
- **Firebase Hosting:** Use `firebase deploy`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication
│   └── ...            # Other components
├── lib/                # Utilities and helpers
├── styles/             # Global styles
└── guidelines/         # Project guidelines
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).  