# Google Sheets Data Display Website

A modern, responsive website that displays data from Google Sheets in real-time. Built with vanilla HTML, CSS, and JavaScript for maximum compatibility and performance.

![Website Preview](https://img.shields.io/badge/Status-Ready-brightgreen)
![Responsive](https://img.shields.io/badge/Responsive-Yes-blue)
![No Dependencies](https://img.shields.io/badge/Dependencies-None-orange)

## 🚀 Features

- **Real-time Data Display**: Automatically fetches and displays data from Google Sheets
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, professional interface with smooth animations
- **Error Handling**: Graceful error handling with retry functionality
- **Auto-refresh**: Data automatically updates every 5 minutes
- **Caching**: Smart caching to reduce API calls and improve performance
- **Accessibility**: Built with screen readers and keyboard navigation in mind
- **Print-friendly**: Optimized CSS for printing the data table

## 📁 Project Structure

```
planner/
├── index.html          # Main HTML file
├── style.css           # Responsive CSS styling
├── script.js           # JavaScript functionality
├── README.md           # This documentation
└── .github/
    └── copilot-instructions.md
```

## 🛠️ Setup Instructions

### 1. Configure Your Google Sheets

1. **Make your Google Sheet public**:
   - Open your Google Sheet
   - Click "Share" in the top right
   - Change permissions to "Anyone with the link can view"

2. **Get the sheet ID**:
   - From your sheet URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the `SHEET_ID` part

3. **Update the configuration**:
   - Open `script.js`
   - Replace the `sheetUrl` in the `SHEET_CONFIG` object with your sheet's CSV export URL:
   ```javascript
   const SHEET_CONFIG = {
       sheetUrl: 'https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID/pub?output=csv',
       // ... other config options
   };
   ```

### 2. Deploy the Website

#### Option A: Local Development
1. Download or clone all project files
2. Open `index.html` in a web browser
3. The website will automatically load your Google Sheets data

#### Option B: Web Hosting
1. Upload all files (`index.html`, `style.css`, `script.js`) to your web hosting service
2. Access the website through your domain
3. The site will work with any hosting provider (GitHub Pages, Netlify, Vercel, etc.)

## ⚙️ Configuration Options

### JavaScript Configuration (`script.js`)

```javascript
const SHEET_CONFIG = {
    // Primary Google Sheets CSV URL
    sheetUrl: 'YOUR_GOOGLE_SHEETS_CSV_URL',
    
    // Fallback URLs (optional)
    alternativeUrls: [
        'ALTERNATIVE_URL_1',
        'ALTERNATIVE_URL_2'
    ],
    
    // Cache duration in milliseconds (default: 5 minutes)
    cacheDuration: 5 * 60 * 1000
};
```

### CSS Customization (`style.css`)

Key variables you can modify:
- **Colors**: Change the gradient colors in the header and table headers
- **Fonts**: Modify the `font-family` in the body selector
- **Spacing**: Adjust padding and margins throughout
- **Responsive breakpoints**: Modify media queries for different screen sizes

## 🎨 Customization Guide

### Changing Colors
```css
/* Header gradient */
header {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}

/* Table header gradient */
.data-table th {
    background: linear-gradient(135deg, #your-color-1 0%, #your-color-2 100%);
}
```

### Adding a Refresh Button
Add this to your HTML inside the `<main>` section:
```html
<button onclick="refreshData()" class="refresh-btn">Refresh Data</button>
```

### Modifying Auto-refresh Interval
Change the interval in `script.js`:
```javascript
// Refresh every 10 minutes instead of 5
setInterval(loadData, 10 * 60 * 1000);
```

## 🔧 Troubleshooting

### Common Issues

1. **"Error Loading Data" appears**
   - Ensure your Google Sheet is public
   - Check that the sheet URL is correct
   - Verify your internet connection

2. **Data not updating**
   - Clear your browser cache
   - Check the browser console for errors
   - Verify the Google Sheet is accessible

3. **CORS errors**
   - Google Sheets CSV export should work without CORS issues
   - If using a different data source, ensure CORS is properly configured

4. **Mobile display issues**
   - The site is responsive, but very wide tables may scroll horizontally
   - Consider reducing the number of columns for mobile optimization

### Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ⚠️ Internet Explorer: Not supported (uses modern JavaScript features)

## 📊 Performance Tips

1. **Optimize your Google Sheet**:
   - Keep data organized with clear headers
   - Avoid excessive empty rows/columns
   - Consider splitting very large datasets

2. **Adjust cache duration**:
   - Increase cache time for data that changes infrequently
   - Decrease for real-time data needs

3. **Minimize data size**:
   - Remove unnecessary columns
   - Use concise data formatting

## 🔒 Security Notes

- Data is fetched from Google's servers using their public API
- No authentication tokens or private data are stored
- All communication is over HTTPS
- No server-side processing required

## 📱 Mobile Optimization

The website is fully responsive and includes:
- Touch-friendly interface
- Horizontal scrolling for wide tables
- Optimized font sizes and spacing
- Reduced motion for accessibility

## 🧪 Testing

To test the website:
1. Create a test Google Sheet with sample data
2. Make it public and get the CSV URL
3. Update the configuration in `script.js`
4. Open `index.html` in a browser
5. Verify data loads correctly and displays properly

## 📈 Analytics Integration

To add Google Analytics (optional):
```html
<!-- Add before closing </head> tag in index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ for easy Google Sheets data display**