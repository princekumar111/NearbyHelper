// ---------- LOCATION ROUTE ----------

const express = require("express");

const router = express.Router();

const axios = require("axios");


// ---------- LAT LNG TO ADDRESS ----------

router.get("/reverse", async(req, res) => {


    try {


        const { lat, lng } = req.query;


        const response = await axios.get(
            "https://nominatim.openstreetmap.org/reverse", {
                params: {
                    format: "json",
                    lat,
                    lon: lng,
                    addressdetails: 1
                },
                headers: {
                    "User-Agent": "NearbyHelper-App"
                }
            }
        );



        res.json(response.data);



    } catch (error) {


        res.status(500).json({

            message: "Location failed"

        });


    }


});


module.exports = router;