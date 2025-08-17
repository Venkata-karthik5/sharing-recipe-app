# 🍲 Recipe Sharing App

A full-stack recipe sharing application built with React frontend and Node.js backend, featuring MongoDB integration for data persistence.

## ✨ Features

- **Recipe Management**: Add, view, and manage recipes
- **Search & Filter**: Search recipes by cuisine or ingredients
- **Social Features**: Like and comment on recipes
- **Responsive Design**: Modern UI that works on all devices
- **Real-time Updates**: Dynamic content updates without page refresh

## 🚀 Tech Stack

- **Frontend**: React 19, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Deployment**: Vercel (Full-stack)

## 📁 Project Structure

```
recipe-sharing-app/
├── frontend/          # React frontend application
├── backend/           # Node.js backend server
├── vercel.json        # Vercel deployment configuration
├── package.json       # Root package configuration
└── README.md         # This file
```

## 🛠️ Local Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MongoDB Atlas account (optional for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Venkata-karthik5/sharing-recipe-app.git
   cd sharing-recipe-app
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Start development servers**
   ```bash
   npm run dev
   ```

   This will start both:
   - Backend server on `http://localhost:5000`
   - Frontend React app on `http://localhost:3000`

### Individual Server Commands

- **Backend only**: `npm run dev:backend`
- **Frontend only**: `npm run dev:frontend`
- **Build frontend**: `npm run build:frontend`

## 🌐 API Endpoints

- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Add new recipe
- `POST /api/recipes/:id/like` - Like a recipe
- `POST /api/recipes/:id/comment` - Comment on a recipe
- `GET /api/recipes/search/:query` - Search recipes
- `GET /api/health` - Health check endpoint

## 🚀 Vercel Deployment

### Automatic Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect the configuration

2. **Environment Variables**
   - Set `MONGODB_URI` in Vercel dashboard
   - The app will use the MongoDB Atlas connection string

### Manual Deployment

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts and deploy**

## 🔧 Configuration

### Environment Variables

- `MONGODB_URI`: MongoDB Atlas connection string
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)

### Vercel Configuration

The `vercel.json` file handles:
- Build configuration for both frontend and backend
- API routing (`/api/*` → backend, `/*` → frontend)
- Function timeout settings
- Environment variable mapping

## 📱 Usage

1. **View Recipes**: Browse all available recipes
2. **Add Recipe**: Use the form to add new recipes
3. **Search**: Find recipes by cuisine or ingredients
4. **Interact**: Like and comment on recipes
5. **Responsive**: Works on desktop, tablet, and mobile

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Check if your IP is whitelisted in MongoDB Atlas
   - Verify connection string in environment variables

2. **Build Errors**
   - Ensure all dependencies are installed
   - Check Node.js version compatibility

3. **API Errors**
   - Verify backend server is running
   - Check API endpoint URLs in frontend

### Vercel Deployment Issues

- **Function Timeout**: Check `maxDuration` in `vercel.json`
- **Build Failures**: Verify build scripts in `package.json`
- **API Routes**: Ensure proper routing configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Venkata Karthik**
- GitHub: [@Venkata-karthik5](https://github.com/Venkata-karthik5)

## 🙏 Acknowledgments

- React team for the amazing framework
- Vercel for seamless deployment
- MongoDB for database services
- Express.js for backend framework

---

**Happy Cooking! 🍳✨**
