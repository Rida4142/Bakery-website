const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("Bakery API Running");
});

const productRoutes =
require("./routes/productRoutes");

const orderRoutes =
require("./routes/orderRoutes");

app.use("/api/products",productRoutes);

app.use("/api/orders",orderRoutes);
const PORT = 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});