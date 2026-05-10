document.addEventListener('DOMContentLoaded', function() {
    
    // --- 1. Navigation Logic ---
    const links = document.querySelectorAll('#nav-menu a');
    const pages = document.querySelectorAll('.page');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            pages.forEach(p => p.classList.remove('active'));
            links.forEach(l => l.classList.remove('active-link'));
            
            this.classList.add('active-link');
            document.getElementById(this.getAttribute('data-target')).classList.add('active');
        });
    });

    // --- 2. Crops & Irrigation Logic (Exact Match of React Data) ---
    const cropsData = [
        { name: "Tomatoes", match: 96, status: "Excellent", color: "success" },
        { name: "Bell Peppers", match: 89, status: "Very Good", color: "success" },
        { name: "Corn", match: 78, status: "Good", color: "secondary" },
        { name: "Wheat", match: 65, status: "Fair", color: "warning" }
    ];
    
    const cropsHTML = cropsData.map(crop => `
        <div class="list-item">
            <div class="flex-between">
                <strong>${crop.name}</strong>
                <span class="badge ${crop.color}">${crop.match}% Match</span>
            </div>
            <div class="flex-between" style="font-size:0.9rem; margin-top:5px; color:#555;">
                <span>Suitability</span> <span>${crop.status}</span>
            </div>
        </div>
    `).join('');
    document.getElementById('crops-container').innerHTML = cropsHTML;

    const irrigationData = [
        { zone: "Zone A", crop: "Tomatoes", next: "6:00 AM", status: "Active", bg: "success" },
        { zone: "Zone B", crop: "Peppers", next: "7:30 AM", status: "Scheduled", bg: "secondary" },
        { zone: "Zone C", crop: "Corn", next: "Manual", status: "Manual", bg: "secondary" }
    ];

    const irrigationHTML = irrigationData.map(zone => `
        <div class="list-item">
            <div class="flex-between">
                <div>
                    <strong>${zone.zone}</strong>
                    <div style="font-size:0.85rem; color:#666;">${zone.crop}</div>
                </div>
                <span class="badge ${zone.bg}">${zone.status}</span>
            </div>
            <div style="font-size:0.9rem; margin-top:10px;">Next Watering: ${zone.next}</div>
        </div>
    `).join('');
    document.getElementById('irrigation-container').innerHTML = irrigationHTML;

    // --- 3. Market Logic (Search Filtering translated from React) ---
    const marketData = [
        { crop: "Onion (Red)", market: "Lasalgaon, Nashik", price: 2450, change: "+120", trend: "up" },
        { crop: "Tomato (Hybrid)", market: "Kolar, Karnataka", price: 1800, change: "-50", trend: "down" },
        { crop: "Wheat (Lokwan)", market: "Khanna, Punjab", price: 2275, change: "0", trend: "stable" },
        { crop: "Cotton (Medium)", market: "Rajkot, Gujarat", price: 7200, change: "+150", trend: "up" },
        { crop: "Soybean", market: "Indore, MP", price: 4800, change: "-100", trend: "down" },
        { crop: "Rice (Basmati)", market: "Karnal, Haryana", price: 3800, change: "0", trend: "stable" }
    ];

    const searchInput = document.getElementById('market-search');
    const filterSelect = document.getElementById('market-filter');
    const tableBody = document.getElementById('market-tbody');

    function renderMarket() {
        const term = searchInput.value.toLowerCase();
        const loc = filterSelect.value;
        const filtered = marketData.filter(item => {
            return item.crop.toLowerCase().includes(term) && 
                   (loc === 'all' || item.market.includes(loc));
        });

        tableBody.innerHTML = filtered.map(item => `
            <tr>
                <td><strong>${item.crop}</strong></td>
                <td><small>${item.market}</small></td>
                <td><b>₹${item.price}</b></td>
                <td class="${item.trend === 'up' ? 'text-success' : item.trend === 'down' ? 'text-destructive' : ''}">
                    ${item.change}
                </td>
            </tr>
        `).join('');
    }
    
    searchInput.addEventListener('input', renderMarket);
    filterSelect.addEventListener('change', renderMarket);
    renderMarket(); // Initial load

    // --- 4. Disease Detection Logic (Exact Timeout Simulation from React) ---
    const imgInput = document.getElementById('crop-image');
    const imgPreview = document.getElementById('image-preview');
    const analyzeBtn = document.getElementById('analyze-btn');
    const analysisCard = document.getElementById('analysis-result');
    const loadingText = document.getElementById('loading-text');

    imgInput.addEventListener('change', function(e) {
        if(e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                imgPreview.src = e.target.result;
                imgPreview.style.display = "block";
                analyzeBtn.disabled = false;
                analysisCard.style.display = "none";
            }
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    analyzeBtn.addEventListener('click', function() {
        analyzeBtn.disabled = true;
        loadingText.style.display = "block";
        analysisCard.style.display = "none";
        
        // Exact 3 second timeout simulation logic from your React code
        setTimeout(() => {
            loadingText.style.display = "none";
            analyzeBtn.disabled = false;
            
            document.getElementById('result-disease').textContent = "Early Blight";
            document.getElementById('result-confidence').textContent = "92";
            document.getElementById('result-severity').textContent = "Moderate";
            
            const treatments = [
                "Remove infected leaves immediately.",
                "Apply copper-based fungicide.",
                "Improve air circulation around plants."
            ];
            
            document.getElementById('result-treatment').innerHTML = 
                treatments.map(t => `<li>${t}</li>`).join('');
                
            analysisCard.style.display = "block";
        }, 3000);
    });
    // --- 5. Hardware Sync (Web Serial API) Logic ---
    const connectBtn = document.getElementById('connect-btn');
    const sensorStatus = document.getElementById('sensor-status');
    const sensorReadings = document.getElementById('sensor-readings');
    const liveTemp = document.getElementById('live-temp');
    const liveHum = document.getElementById('live-hum');
    const rawLogContainer = document.getElementById('raw-log-container');
    const recStatus = document.getElementById('rec-status');
    const recContent = document.getElementById('rec-content');
    const suitableCropsDiv = document.getElementById('suitable-crops');
    const unsuitableCropsDiv = document.getElementById('unsuitable-crops');

    let port;
    let reader;
    let keepReading = false;
    let rawLogs = [];

    function updateRecommendations(t, h) {
        let suitable = [];
        let unsuitable = [];

        if (t > 30 && h > 60) {
            suitable = ["Rice", "Sugarcane", "Jute", "Cotton"];
            unsuitable = ["Wheat", "Barley", "Oats"];
        } else if (t > 20 && t <= 30 && h > 40 && h <= 60) {
            suitable = ["Maize", "Soybean", "Tomatoes", "Peanuts"];
            unsuitable = ["Apples", "Cherries"];
        } else if (t >= 10 && t <= 20 && h < 50) {
            suitable = ["Wheat", "Barley", "Mustard", "Chickpeas"];
            unsuitable = ["Rice", "Sugarcane"];
        } else if (t > 35 && h < 30) {
            suitable = ["Sorghum", "Pearl Millet", "Cactus"];
            unsuitable = ["Most standard vegetables", "Rice"];
        } else {
            suitable = ["General vegetables (with controlled irrigation)"];
            unsuitable = ["Extreme weather crops"];
        }

        suitableCropsDiv.innerHTML = suitable.map(crop => `<span style="background: #e8f5e9; color: #2e7d32; padding: 5px 10px; border-radius: 15px; font-size: 0.85rem; border: 1px solid #c8e6c9;">${crop}</span>`).join('');
        unsuitableCropsDiv.innerHTML = unsuitable.map(crop => `<span style="background: #ffebee; color: #c62828; padding: 5px 10px; border-radius: 15px; font-size: 0.85rem; border: 1px solid #ffcdd2;">${crop}</span>`).join('');
        
        recStatus.style.display = "none";
        recContent.style.display = "block";
    }

    function updateRawLog(line) {
        if (line.trim().length === 0) return;
        rawLogs.push(line);
        if (rawLogs.length > 5) rawLogs.shift();
        rawLogContainer.innerHTML = rawLogs.map(l => `<div>${l}</div>`).join('');
    }

    async function connectArduino() {
        if (!('serial' in navigator)) {
            alert("Your browser does not support the Web Serial API. Please use Chrome or Edge.");
            return;
        }

        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            
            connectBtn.textContent = "Disconnect";
            connectBtn.style.backgroundColor = "#d32f2f";
            sensorStatus.style.display = "none";
            sensorReadings.style.display = "flex";
            recStatus.textContent = "Waiting for stable reading...";

            keepReading = true;
            readLoop();

        } catch (error) {
            console.error("Connection error:", error);
            alert("Could not connect to the device. Please try again.");
        }
    }

    async function disconnectArduino() {
        keepReading = false;
        
        if (reader) {
            try { await reader.cancel(); } catch (e) {}
        }
        if (port) {
            try { await port.close(); } catch (e) {}
        }
        
        connectBtn.textContent = "Connect Arduino via USB";
        connectBtn.style.backgroundColor = "#2e7d32";
        sensorStatus.style.display = "block";
        sensorStatus.textContent = "Device Disconnected.";
        sensorReadings.style.display = "none";
        recContent.style.display = "none";
        recStatus.style.display = "block";
        recStatus.textContent = "Connect device to see recommendations.";
    }

    async function readLoop() {
        while (port.readable && keepReading) {
            const textDecoder = new TextDecoderStream();
            const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
            reader = textDecoder.readable.getReader();

            let buffer = "";

            try {
                while (true) {
                    const { value, done } = await reader.read();
                    if (done) break;
                    
                    buffer += value;
                    const lines = buffer.split('\n');
                    
                    for (let i = 0; i < lines.length - 1; i++) {
                        const line = lines[i].trim();
                        updateRawLog(line);

                        if (line.startsWith('{') && line.endsWith('}')) {
                            try {
                                const data = JSON.parse(line);
                                if (data.temp !== undefined && data.humidity !== undefined) {
                                    liveTemp.textContent = `${data.temp.toFixed(1)}°C`;
                                    liveHum.textContent = `${data.humidity.toFixed(1)}%`;
                                    updateRecommendations(data.temp, data.humidity);
                                }
                            } catch (e) {
                                console.error("JSON parse error:", line);
                            }
                        }
                    }
                    buffer = lines[lines.length - 1];
                }
            } catch (error) {
                console.error("Read error:", error);
            } finally {
                reader.releaseLock();
            }
        }
    }

    if(connectBtn) {
        connectBtn.addEventListener('click', () => {
            if (keepReading) {
                disconnectArduino();
            } else {
                connectArduino();
            }
        });
    }

});
