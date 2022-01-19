const express = require('express');
const router = express.Router();
const superheros = require('../models/product_model')

router.get('/', (req, res) => {
    
    const allSuperheros = superheros.find();
    /* 
    1. the first param of render() is the .ejs file 
    that we want to inject data into.
    
    2. the second param is the data that we want 
    to inject into the .ejs file (it must be an object)
    */

    /*	
    there will be a variable available inside
    the show.ejs file called product, 
    and its value the foundItem
   */
    const context = { superheros: allSuperheros };
    res.render('index.ejs', context);

});

router.post('/', (req, res) => {
    // Start by console logging things out here for the req, then req.body
    products.create(req.body, (error, createdProduct) => {
        if(error) console.log(error);
        console.log(createdProduct);


        res.redirect("/superheros");
    })
})

router.get("/new", function(req, res) {
    res.render("new.ejs")
})

// show route
// this route will catch GET requests to /products/index/ and respond with a single product
router.get('/:superherosId', (req, res) => {
    
    products.findById(req.params.superherosId, (error, foundProduct) => {
        if (error) {
            console.log(req.params)
            console.log(error);
            const context = { error: error };
            return res.status(404).render("404", context);
        }
        /* 
        1. the first param of render() is the .ejs file 
        that we want to inject data into.
        
        2. the second param is the data that we want 
        to inject into the .ejs file (it must be an object)
        */

        /*	
        there will be a variable available inside
        the show.ejs file called product, 
        and its value the foundItem
       */
        res.render('show.ejs', {superhero: foundProduct});
    });
    
});

router.delete('/:superheroId', (req, res) => {
    products.findByIdAndDelete(req.params.superheroId, (error, deleteProduct) => {
        if(error) {
            console.log(error);
            res.send(error);
        }

        console.log(deleteProduct);
        res.redirect('/superheros')
    })
})

router.get('/:superheroId/edit', (req, res) => {
    products.findById(req.params.superheroId, (error, updateSuperhero) => {
        if(error) console.log(error);

        console.log(updateSuperhero);
        res.render('edit.ejs', { superhero: updateSuperhero})
    })
})

router.put('/:superheroId', (req, res) => {
    console.log(`The request is ${req}`)
    // console.log(`The request's body is ${req.body}`)

    products.findByIdAndUpdate(req.params.superheroId, req.body,(error, updateSuperhero) => {
        if (error) return console.log(error);

        console.log(updateSuperhero);

        return res.redirect(`/superheros`);
    });
});

module.exports = router;