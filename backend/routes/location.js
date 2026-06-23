// ---------- LOCATION ROUTE ----------

const express = require("express");
const router = express.Router();
const axios = require("axios");


// ---------- LAT LNG TO ADDRESS ----------

router.get("/reverse", async(req, res) => {

    try {

        const { lat, lng } = req.query;


        if (!lat || !lng) {
            return res.status(400).json({
                message: "Latitude and Longitude required"
            });
        }


        const response = await axios.get(
            "https://nominatim.openstreetmap.org/reverse", {
                params: {
                    format: "json",
                    lat: lat,
                    lon: lng,
                    addressdetails: 1
                },

                headers: {
                    "User-Agent": "NearbyHelper/1.0 (nearbyhelper@gmail.com)",
                    "Accept-Language": "en"
                },

                timeout: 10000
            }
        );


        res.json({
            address: response.data.display_name,
            details: response.data.address
        });


    } catch (error) {


        console.log(
            "Location API Error:",
            error.response ? .data || error.message
        );


        res.status(500).json({

            message: "Location failed",
            error: error.message

        });

    }

});


module.exports = router;