const express = require('express');
const router = express.Router();
const AccountModel = require('../models/account');

const PAGE_SIZE = 2;

// get data
router.get('/', async (req, res, next) => {
    let page = req.query.page;
    console.log(page);

    if (page) {
        // get by page
        page = parseInt(page);
        page = page < 1 ? 1 : 1;
        var skip = (page - 1) * PAGE_SIZE;
        
        console.log(page);

        AccountModel.find({}).skip(skip).limit(PAGE_SIZE)
            .then((result) => {
                return res.json(result)
            }).catch((err) => {
                console.log('error');
                return res.status(500).json(err);
            });

    } else {
        // get all
        await AccountModel.find()
            .then((result) => {
                return res.json(result)
            }).catch((err) => {
                return res.status(500).json(err);
            });
    }

})


// add new data
router.post('/', (req, res, next) => {

})

// update data
router.put('/:id', async (req, res, next) => {
    let id = req.params.id;
    let newpassword = req.body.newpassword;

    console.log(newpassword);

    await AccountModel.findByIdAndUpdate(id, {
        password: newpassword
    })
        .then((result) => {
            res.json('Done')
        }).catch((err) => {
            res.json(err)
        });
})


// delete
router.delete('/:id', (req, res, next) => {
    AccountModel.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.json('Delete Done')
        }).catch((err) => {
            res.json(err)
        });
})

// export router
module.exports = router;