var express    = require('express');       
var app        = express(); 
var port = process.env.PORT || 1738;
var bodyParser = require('body-parser');

var tabs = {
    
};

var Drink = function( desc, price ){
    this.desc = desc;
    this.price = price;
}

app.use('/landing', express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/pitchr', function(req, res) {
    res.json({ status: 'Pitchr API v1' }); 
});

app.post('/pitchr/openTab', function(req, res){
    console.log('Got new tab request')
    var tabID = req.body.tabID;
    if(req.body.tabID === undefined){
        res.send({success: false});
    }else{
        tabs[tabID] = {};
        tabs[tabID].open = true;
        tabs[tabID].total = 0;
        tabs[tabID].drinks = [];
        tabs[tabID].name = req.body.name;
    }
    console.log({success: true, status: 'Tab Opened for: '+tabID})
    res.send({success: true, status: 'Tab Opened for: '+tabID});
});


app.post('/pitchr/addDrink', function(req, res){
    var tabID = req.body.tabID;
    var drink = req.body.drink;
    
    if(req.body.tabID === undefined || req.body.drink === undefined ){
        res.send({success: false});
    }else{
        if(tabs[tabID] === undefined){
            res.send({success: false});
        }
         console.log('Drink')
         console.log(drink);
         tabs[tabID].drinks.push(drink);
         tabs[tabID].total += drink.price;
         console.log('Current drinks on tab');
         console.log(tabs[tabID].drinks);
         console.log('Current total: $'+tabs[tabID].total);
         
         res.send({success: true});
    }
});

app.post('/pitchr/getTab', function(req, res){
       var tabID = req.body.tabID;
   console.log('request for tab: '+tabID);
   console.log(tabs)
   res.send({success: true, result: tabs[tabID]});
});

app.get('/pitchr/getAllTabs', function(req, res){
   res.send({success: true, result: tabs});
});

app.post('/pitchr/closeTab', function(req, res){
    console.log('Got close tab request')
    var tabID = req.body.tabID;
    if(req.body.tabID === undefined){
        res.send({success: false});
    }else{
        tabs[tabID] = {};
        tabs[tabID].open = true;
        tabs[tabID].total = 0;
        tabs[tabID].drinks = [];
        
        tabs[tabID].open = false;
        res.send({success: true, result: tabs[tabID]});
    }
});



app.listen(port);
console.log('Magic happens on port ' + port);