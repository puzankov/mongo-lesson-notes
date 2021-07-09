const ObjectId = require('mongodb').ObjectID;

module.exports = (app, db) => {
    const collection = db.collection('notes');

    app.get('/notes/', (req,res)=> {
        // collection.find(() => {
        //     if (err) {
        //         res.status('500');
        //         res.json({
        //             status: 'error',
        //             message: 'Some error happened'
        //         })
        //     }
        //     res.json(item);
        // })
        collection.find().toArray((err, items)=>{
            res.json(items);
        })

    })

    app.get('/notes/:id/', (req,res)=> {
        let id = req.params.id;

        let details = {
            '_id': new ObjectId(id)
        };

        collection.findOne(details, (err, item) => {
            if (err) {
                res.status('500');
                res.json({
                    status: 'error',
                    message: 'Some error happened'
                })
            }
            res.json(item);
        })

    })

    app.post('/notes/', (req, res)=> {
        const note = {
            title: req.body.title,
            body: req.body.body
        }
        collection.insertOne(note, (err, result)=>{
            if (err) {
                res.status('500');
                res.json({
                    status: 'error',
                    message: 'Some error happened'
                })
            }
            console.log(result);

            res.json(result.ops[0]);
        })
    });

    app.put('/notes/:id/', (req,res)=> {
        let id = req.params.id;
        let note = {
            title: req.body.title,
            body: req.body.body
        }

        let details = {
            '_id': new ObjectId(id)
        };

        collection.update(details, note, (err, result) => {
            if (err) {
                res.status('500');
                res.json({
                    status: 'error',
                    message: 'Some error happened'
                })
            }
            console.log(result.message.documents[0]);
            note['_id'] = id;
            res.json(note);
        })

    });

    app.delete('/notes/:id/', (req,res)=> {
        let id = req.params.id;

        let details = {
            '_id': new ObjectId(id)
        };

        collection.deleteOne(details, (err, item) => {
            if (err) {
                res.status('500');
                res.json({
                    status: 'error',
                    message: 'Some error happened'
                })
            }
            res.json({status: 'success', id });
        })

    });



}