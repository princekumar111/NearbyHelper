const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/authMiddleware");

const Review = require("../models/Review");
const Booking = require("../models/Booking");

// register ServiceProvider model for populate
require("../models/ServiceProvider");


// ===============================
// CREATE REVIEW
// ===============================

router.post("/", checkAuth, async(req, res) => {

    try {

        const {
            providerId,
            rating,
            comment,
            bookingId
        } = req.body;


        const booking =
            await Booking.findById(bookingId);


        if (!booking) {

            return res.status(404).json({
                msg: "Booking not found"
            });

        }


        if (booking.status !== "completed") {

            return res.status(400).json({
                msg: "Review allowed only after completed booking"
            });

        }


        if (
            booking.userId.toString() !==
            req.user.id.toString()
        ) {

            return res.status(403).json({
                msg: "You can only review your own booking"
            });

        }



        const existing =
            await Review.findOne({
                booking: bookingId
            });


        if (existing) {

            return res.status(400).json({
                msg: "Review already submitted"
            });

        }



        const review =
            new Review({

                user: req.user.id,

                provider: providerId,

                rating,

                comment,

                booking: bookingId

            });



        await review.save();



        res.status(201).json({

            msg: "Review submitted successfully",

            review

        });


    } catch (err) {


        console.log(err);


        res.status(500).json({

            msg: "Server error",

            error: err.message

        });


    }


});









// ===============================
// MY REVIEWS
// ===============================


router.get(
    "/my-reviews",
    checkAuth,
    async(req, res) => {


        try {


            const reviews =
                await Review.find({

                    user: req.user.id

                })

            .populate({

                path: "provider",

                model: "ServiceProvider",

                populate: {

                    path: "userId",

                    model: "User",

                    select: "name email"

                }

            })

            .sort({

                createdAt: -1

            });



            console.log(
                "AFTER POPULATE:",
                JSON.stringify(reviews, null, 2)
            );



            res.json(reviews);



        } catch (err) {


            console.log(err);


            res.status(500).json({

                msg: "Server error",

                error: err.message

            });


        }


    });









// ===============================
// PROVIDER REVIEWS
// ===============================


router.get(
    "/provider/:providerId",
    async(req, res) => {


        try {


            const reviews =
                await Review.find({

                    provider: req.params.providerId

                })

            .populate(
                "user",
                "name"
            )

            .sort({

                createdAt: -1

            });



            res.json(reviews);



        } catch (err) {


            res.status(500).json({

                msg: "Server error",

                error: err.message

            });


        }


    });




module.exports = router;