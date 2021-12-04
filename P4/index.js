require("dotenv").config();
const express = require('express')
const app = express()
app.use(express.json());
const port = 8082
const mongoose = require("mongoose");



//connect Model
mongoose.connect(process.env.con).then( () =>
    console.log("mongodb connected.....")
);

const productaaray = require("./models/product");
const companydata = require("./models/company");
const sellerdata = require("./models/seller");

const productrouter = require("./router/product");
const sellerrouter = require("./router/seller");
const companyrouter = require("./router/company");const company = require("./models/company");
;



//fetch company form product name

app.post('/pname', async (req, res) => {
    const pname =  req.body.pname;

    const pid = await productaaray.findOne({
        title: pname
    });


    if (pid) {
        const cdata = await companydata.findOne({
            company_id: pid.company_id
        });
        res.json({ "passing product name fetch company details": cdata });
    } else {
        res.json({ data: "not found" });
    }
});


//fetch seller form product name

app.post("/sname/", async (req,res)=> {
    const pname = req.body.pname;
    var temp = []

    const pdata = await productaaray.findOne({
        title:pname
    })

    
    if (pdata) {
        const sdata = await sellerdata.find({
            seller_id: pdata.seller_id
        })

        res.json({ "passing product name fetch seller details": sdata });
        
    } else {
        res.json({ data: "not found" });
    }
});

//fetch all product of company

app.post('/allcompany', async (req, res) => {
    const cname = req.body.cname;

    const cdata = await companydata.findOne({
        name: cname
    })


    if(cdata){
        const pdata = await productaaray.find({
            product_id: cdata.product_id
        })

        if (pdata) {
            res.json({ "passing product name fetch seller details": pdata });
            
        } else {
            res.json({ data: "not found" });
        }
    }else{
        res.json({ data: "No data found" });
    }    
});


//fetch all product of seller
app.post("/allseller", async (req,res) => {
    const sname = req.body.sname;

    const sdata = await sellerdata.findOne({
        name: sname
    })

    if(sdata){
        const pdata = await productaaray.find({
            product_id: sdata.product_id
        })

        if (pdata){
            res.json({ "fetch all product of seller": pdata });
        } else {
            res.json({ data: "product not found" });
        }
    }else{
        res.json({ data : "No data found"});
    }
});


//update seller

app.put("/update_seller", async (req, res) => {
    const sid = req.body.sid;
    const add = req.body.pid;

    const sdata = await sellerdata.findOne({
        product_id: add
    });

    const fsid = await sellerdata.findOne({
        seller_id: sid
    })


    if (sdata) {

        for (let j = 0; j < fsid.product_id.length; j++) {

            if (fsid.product_id[j] == add) {
                fsid.product_id.splice(j, fsid.product_id.length)
            }
            else {
                console.log("Not deleted");
            }
        }

        res.json({ data: "seller deleted successfully" });
    }else{
        fsid.product_id.push(add);
        res.json({ data: "seller Added successfully" });
    }

    const updateuser = await sellerdata.findOneAndUpdate(
        { seller_id: sid },
        { product_id: fsid.product_id },
        { new: true }
    );
});

//update company
app.put("/update_company", async (req, res) => {
    const cid = req.body.cid;
    const add = req.body.addpid;

    const cdata = await companydata.findOne({
        product_id: add
    });

    const fsid = await companydata.findOne({
        company_id: cid
    })

    if (cdata) {

        for (let j = 0; j < fsid.product_id.length; j++) {

            if(fsid.product_id[j] == add){
                fsid.product_id.splice(j, fsid.product_id.length)
            }
            else{
                console.log("Not deleted");
            }
        }
        res.json({ data: "company deleted successfully" });
    }
    else {
        fsid.product_id.push(add);

        res.json({ data: "company Added successfully" });
    }

    const updateuser = await companydata.findOneAndUpdate(
        { company_id: cid },
        { product_id: fsid.product_id },
        { new: true }
    );
});

//update product

app.put("/update_product", async (req, res) => {
    const pid = req.body.pid;
    const add = req.body.addpid;


    const catedata = await productaaray.findOne({
        category: add
    })

    const fsid = await productaaray.findOne({
        product_id: pid
    })

    if (catedata) {

        for (let j = 0; j < fsid.category.length; j++) {

            if (fsid.category[j] == add) {
                fsid.category.splice(j, fsid.category.length)
            }
            else {
                console.log("Not deleted");
            }
        }
        res.json({ data: "product deleted successfully" });
    }
    else {
        fsid.category.push(add);

        res.json({ data: "product Added successfully" });
    }

    const updateuser = await productaaray.findOneAndUpdate(
        { product_id: pid },
        { category: fsid.category },
        { new: true }
    );

});

//delete company

app.delete("/delete_company", async (req,res) => {

    const deletecompany = await companydata.findOneAndDelete({
        name: req.body.name,
    });
    return res.json({ data: "company deleted successfully" });
});

//delete seller

app.delete("/delete_seller", async (req, res) => {
    const deleteseller = await sellerdata.findOneAndDelete({
        name: req.body.name,
    });
    return res.json({ data: "seller deleted successfully" });
});


//delete product
app.delete("/delete_product", async (req, res) => {
    const cname = req.body.name;

    const deleteproduct = await productaaray.findOneAndDelete({
        title: req.body.name,
    });
    return res.json({ data: "product deleted successfully" });
});

app.use("/product", productrouter);
app.use("/seller", sellerrouter);
app.use("/company", companyrouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
