const express = require('express');
const router = express.Router();
router.use(express.json());

//const app = express()
//app.use(express.json());
//const port = 8082
const company = require("../models/company");
router.get('/', (req, res) => res.send('company page!'))

//const company = [];


router.post('/addcompany', (req, res) => {
    const cdata = req.body;
    company.create(cdata);
    return res.json({ data: "Company Data Are Added" });
});


module.exports = router;
//module.exports = company;


/*{
    "cid":"1021",
    "name":"HRK",
    "pid":["101","102","103"]
},
{
    "cid":"4521",
    "name":"shree ram",
    "pid":["103","123","152"]
},
{
    "cid":"1021",
    "name":"TATA",
    "pid":["102","152","521"]
}*/