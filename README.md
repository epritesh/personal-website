# Daily Vedanta Inspiration 🪷

A beautiful, modern web application that provides daily inspiration, prayers, and wisdom from Advaita Vedanta philosophy to support mental wellbeing and spiritual growth.

## ✨ Features

- **Daily Wisdom**: Curated quotes and teachings from Advaita Vedanta masters including Adi Shankaracharya, Upanishads, and sacred texts
- **Sacred Mantras**: Daily mantras with Sanskrit text, transliterations, meanings, and benefits
- **Meditation Practices**: Guided spiritual practices including Self-Inquiry, Witness Consciousness, and more
- **Philosophical Teachings**: Deep insights into Advaita Vedanta concepts with practical applications
- **Beautiful UI**: Modern, calming design with smooth animations and a peaceful color palette
- **Dark/Light Mode**: Toggle between light and dark themes for comfortable viewing
- **Daily Rotation**: Content changes each day based on a curated collection of 30+ wisdom teachings

## 🎨 Design Philosophy

The website features:
- Calming gradient backgrounds inspired by Eastern spirituality
- Glassmorphism effects for a modern, elegant look
- Smooth animations and transitions
- Sanskrit typography for authentic presentation
- Responsive design that works on all devices
- Floating decorative elements for visual interest

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd personal-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The optimized files will be in the `dist` folder, ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## 📱 Usage

The website automatically displays different content each day:

1. **Daily Wisdom Tab**: View inspiring quotes from Advaita Vedanta masters with Sanskrit texts
2. **Mantra Tab**: Learn and practice sacred mantras with their meanings and benefits
3. **Practice Tab**: Explore meditation and contemplation practices
4. **Teaching Tab**: Understand core Advaita Vedanta concepts with practical applications

Toggle between light and dark modes using the sun/moon icon in the header.

## 🧘 Content Sources

The content draws from authentic Advaita Vedanta sources including:
- Upanishads (Chandogya, Mandukya, Brihadaranyaka, Kena, Katha)
- Bhagavad Gita
- Adi Shankaracharya's works (Vivekachudamani, Nirvana Shatakam)
- Ashtavakra Gita
- Avadhuta Gita
- Traditional Vedantic teachings

## 🛠️ Technology Stack

- **React 18** - Modern UI library
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Custom CSS** - Animations and special effects

## 📂 Project Structure

```
personal-website/
├── src/
│   ├── data/
│   │   └── vedantaContent.js    # All wisdom, mantras, practices, and teachings
│   ├── App.jsx                   # Main application component
│   ├── main.jsx                  # Application entry point
│   └── index.css                 # Global styles and animations
├── index.html                    # HTML template
├── package.json                  # Dependencies and scripts
├── tailwind.config.js            # Tailwind configuration
├── vite.config.js                # Vite configuration
└── README.md                     # This file
```

## 🎯 Customization

### Adding New Content

Edit `src/data/vedantaContent.js` to add more:
- Daily wisdom quotes
- Mantras
- Meditation practices
- Philosophical teachings

### Changing Colors

Modify the color scheme in `tailwind.config.js`:
```js
colors: {
  'vedic-gold': '#D4AF37',
  'vedic-orange': '#FF9933',
  // ... add your colors
}
```

### Adjusting Daily Rotation

The content rotates based on the day of the year. You can modify the rotation logic in the `getTodayContent()` function in `vedantaContent.js`.

## 🌟 Features to Add (Future Enhancements)

- User preferences for favorite teachings
- Meditation timer
- Journal for personal reflections
- Audio pronunciation guides for Sanskrit mantras
- Weekly/monthly themes
- Share quotes on social media
- Bookmark favorite content
- Notification reminders

## 📄 License

This project is created for personal use and spiritual growth. Feel free to use and modify as needed.

## 🙏 Acknowledgments

Gratitude to the ancient sages and masters of Advaita Vedanta whose timeless wisdom continues to illuminate the path to Self-realization.

---

**ॐ शान्तिः शान्तिः शान्तिः**  
*Om Shanti Shanti Shanti*  
Peace, Peace, Peace
