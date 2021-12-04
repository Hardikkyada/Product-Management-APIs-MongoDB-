const express = require('express');
const router = express.Router();
router.use(express.json());
const mongoose = require("mongoose");

const productaaray = require("../models/product");

router.get('/', (req, res) => res.send('product page!'))

router.get("/list", async (req, res) => {
	const listproduct = await productaaray.find();

	if (listproduct.length === 0) {
		return res.json({ data: "Product data not Found" });
	}
	return res.json({ data: listproduct });
});


router.post('/addpro',(req,res) => {

	const newproduct = req.body;
	productaaray.create(newproduct);
	return res.json({ data: "Product Data Added" });

});

router.post('/pname',(req,res) => {
    const pname = req.body.pname;
	const productdata = productaaray.filter((p) => p.title === pname);
	//const ciid = productdata.filter((c) => (c.cid));
	const fcid = companydata.filter((p) => p.cid === productdata[0].cid);

	if (productdata.length == 0) {
		//res.json({ data: productdata.cid });
		res.json({data : "not found"});
	} else {
		res.json({ data:  fcid});
	}
});

//module.exports = productaaray;
module.exports = router;

/*{
	"pid":"101",
	"title":"fan",
	"price":"2000",
	"category":["Tower Fans","Wall Mounted Fans","Misting Fans"],
    "cid":"456",
	"sid":["123","456","152"]
},
{
    "pid":"102",
	"title":"refrigerator",
	"price":"15000",
	"category":["Top freezer","Bottom freezer"],
    "cid":"456",
	"sid":["123","456","152"]
},
{
    "pid":"103",
	"title":"television",
	"price":"12000",
	"category":["LCD","LED","4K"],
    "cid":"456",
	"sid":["123","456","152"]
}*/