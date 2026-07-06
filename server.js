const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.static("public"));

const PORT = 3000;

app.get("/weather", async (req, res) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ error: "City is required" });
        }

        const url = `https://wttr.in/${city}?format=j1`;

        const response = await axios.get(url);

        const data = response.data;

        const current = data.current_condition[0];

        res.json({
            city: city,
            temperature: current.temp_C,
            description: current.weatherDesc[0].value,
            humidity: current.humidity,
            wind: current.windspeedKmph
        });

    } catch (err) {
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
