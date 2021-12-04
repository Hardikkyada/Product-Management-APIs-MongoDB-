const express = require('express');
const router = express.Router();
router.use(express.json());

const seller = require("../models/seller");

router.get('/', (req, res) => res.send('seller page!'))

//const seller = [];

router.get("/list", async (req, res) => {
    const listseller = await seller.find();

    if (listseller.length === 0) {
        return res.json({ data: "seller data not Found" });
    }
    return res.json({ data: listseller });
});

router.post('/addseller', (req, res) => {
    const sdata = req.body;
    seller.create(sdata);
    return res.json({ data: "Seller Added" });
});


module.exports = router;
//module.exports = router, seller;

/*{
    "sid":"123",
    "name":"hardik",
    "pid":["101","102","103"]
},
{
    "sid":"123",
    "name":"Rajesh",
    "pid":["103","123","152"]
},
{
    "sid":"123",
    "name":"jonshan",
    "pid":["102","152","521"]
}*/