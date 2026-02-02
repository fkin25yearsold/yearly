const { createCanvas } = require('@napi-rs/canvas');

// Month configurations for 2026
const months = [
    { name: 'JAN', days: 31 },
    { name: 'FEB', days: 28 },
    { name: 'MAR', days: 31 },
    { name: 'APR', days: 30 },
    { name: 'MAY', days: 31 },
    { name: 'JUN', days: 30 },
    { name: 'JUL', days: 31 },
    { name: 'AUG', days: 31 },
    { name: 'SEP', days: 30 },
    { name: 'OCT', days: 31 },
    { name: 'NOV', days: 30 },
    { name: 'DEC', days: 31 }
];

// Device configurations
const devices = {
    'iphone15promax': { width: 1290, height: 2796, type: 'phone' },
    'iphone15pro': { width: 1179, height: 2556, type: 'phone' },
    'iphone13promax': { width: 1284, height: 2778, type: 'phone' },
    'iphone14': { width: 1170, height: 2532, type: 'phone' },
    'iphonese': { width: 750, height: 1334, type: 'phone' },
    'macbook14': { width: 3024, height: 1964, type: 'laptop' },
    'macbook16': { width: 3456, height: 2234, type: 'laptop' },
    'macbookair13': { width: 2560, height: 1664, type: 'laptop' }
};

function getPhoenixDate() {
    const now = new Date();
    const phoenixOffset = -7 * 60;
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    return new Date(utc + (phoenixOffset * 60000));
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function generateWallpaper(deviceId = 'iphone13promax', bgColor = '#1a1a1a') {
    const device = devices[deviceId] || devices['iphone13promax'];
    const canvas = createCanvas(device.width, device.height);
    const ctx = canvas.getContext('2d');

    const phoenixDate = getPhoenixDate();
    const currentDayOfYear = getDayOfYear(phoenixDate);
    const currentMonth = phoenixDate.getMonth();
    const currentDayOfMonth = phoenixDate.getDate();
    const totalDays = 365;
    const daysLeft = totalDays - currentDayOfYear;
    const daysInMonth = months[currentMonth].days;
    const daysLeftInMonth = daysInMonth - currentDayOfMonth;
    const monthName = months[currentMonth].name;
    const percentComplete = Math.round((currentDayOfYear / totalDays) * 100);

    // Draw background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calendar layout configuration
    const isLaptop = device.type === 'laptop';
    const baseScale = isLaptop ? canvas.height / 1964 : canvas.width / 1284;

    const dotSize = (isLaptop ? 24 : 30) * baseScale;
    const dotGap = (isLaptop ? 6 : 8) * baseScale;
    const monthGapX = (isLaptop ? 80 : 70) * baseScale;
    const monthGapY = (isLaptop ? 140 : 280) * baseScale;
    const cols = 7;

    const monthWidth = (cols * dotSize) + ((cols - 1) * dotGap);
    const monthsPerRow = isLaptop ? 6 : 3;
    const numRows = isLaptop ? 2 : 4;

    const maxDotRows = 5;
    const monthLabelHeight = 35 * baseScale;
    const monthHeight = monthLabelHeight + (maxDotRows * dotSize) + ((maxDotRows - 1) * dotGap);

    const totalGridWidth = (monthWidth * monthsPerRow) + (monthGapX * (monthsPerRow - 1));
    const totalGridHeight = (monthHeight * numRows) + (monthGapY * (numRows - 1));

    const startX = (canvas.width - totalGridWidth) / 2;
    const startY = isLaptop ? (canvas.height - totalGridHeight) / 2 : canvas.height * 0.35;

    // Font settings
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    let dayCounter = 0;

    // Draw months
    for (let row = 0; row < numRows; row++) {
        for (let col = 0; col < monthsPerRow; col++) {
            const monthIndex = row * monthsPerRow + col;
            if (monthIndex >= 12) break;

            const month = months[monthIndex];
            const monthX = startX + (col * (monthWidth + monthGapX));
            const monthY = startY + (row * monthGapY);

            // Draw month label
            ctx.font = `600 ${22 * baseScale}px -apple-system, BlinkMacSystemFont, sans-serif`;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.fillText(month.name, monthX + monthWidth / 2, monthY);

            // Draw day dots
            for (let d = 0; d < month.days; d++) {
                dayCounter++;
                const dotRow = Math.floor(d / cols);
                const dotCol = d % cols;
                const x = monthX + (dotCol * (dotSize + dotGap));
                const y = monthY + 35 * baseScale + (dotRow * (dotSize + dotGap));

                let fillColor;
                const isCurrentDay = (monthIndex === currentMonth && (d + 1) === currentDayOfMonth);

                if (isCurrentDay) {
                    fillColor = '#ff6b35';
                } else if (dayCounter < currentDayOfYear) {
                    fillColor = 'rgba(255, 255, 255, 0.85)';
                } else {
                    fillColor = 'rgba(80, 80, 85, 0.7)';
                }

                const radius = 8 * baseScale;
                roundRect(ctx, x, y, dotSize, dotSize, radius);
                ctx.fillStyle = fillColor;
                ctx.fill();
            }
        }
    }

    // Draw footer stats - two lines
    const footerY = isLaptop ? canvas.height - 100 * baseScale : canvas.height - 120 * baseScale;
    ctx.font = `600 ${26 * baseScale}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.fillStyle = '#ff6b35';
    ctx.fillText(`${daysLeft}d left · ${percentComplete}%`, canvas.width / 2, footerY);

    ctx.font = `500 ${20 * baseScale}px -apple-system, BlinkMacSystemFont, sans-serif`;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillText(`${daysLeftInMonth}d left in ${monthName}`, canvas.width / 2, footerY + 35 * baseScale);

    return canvas.toBuffer('image/png');
}

module.exports = async function handler(req, res) {
    try {
        const { device = 'iphone13promax', bg = '#1a1a1a' } = req.query;

        const imageBuffer = generateWallpaper(device, bg);

        res.setHeader('Content-Type', 'image/png');
        res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
        res.setHeader('Content-Disposition', 'inline; filename="year-tracker-wallpaper.png"');

        res.send(imageBuffer);
    } catch (error) {
        console.error('Error generating wallpaper:', error);
        res.status(500).json({ error: 'Failed to generate wallpaper' });
    }
};
