const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
// Middleware
app.use(express.json()); // Express built-in middleware to parse JSON
app.use(cors());
// In-memory storage for demonstration purposes
let orders = [];
// POST endpoint to store data
app.post("/api/orderpost", async (req, res) => {
    const { userData, orderDetails } = req.body
    orders.push({ userData, orderDetails, id: orders.length + 1, date: new Date() })
    res.status(200).send({ message: "User data received" });
});
// GET endpoint to retrieve data
app.get("/api/retrieveData", (req, res) => {
    if (orders) {
        res.status(200).send(orders);
    } else {
        res.status(404).send({ message: "User not found" });
    }
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: "Something went wrong!" });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
