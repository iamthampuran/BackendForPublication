const express = require('express')
const PermPublication = require('./../models/PemPublication')
const router = express.Router()
const publication = require('../models/Publications')
//const data = require('./data')


router.post('/add',(req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    let{Year,Title,Faculties,Type,SubType,Name,Details,ImpactFactor,Affiliated,Branch} = req.body
    console.log(req.body)
    console.log('F =', Faculties)
    
    Title = Title.trim()
    Faculties = Faculties.trim()
    Type = Type.trim()
    SubType = SubType.trim()
    Name = Name.trim()
    Details = Details.trim()
    ImpactFactor = ImpactFactor.trim()
    Affiliated = Affiliated.trim()
    Branch = Branch.trim()
    //checking if the fields are empty
    if(Year == "" ||Title == "" || Faculties == "" || Type == "" || SubType == "" || Name == "" || Details == "" || ImpactFactor == "" || Affiliated == "" || Branch == ""){
        res.json({
            status: "FAILED",
            message: "Empty field"
        });
    }
    else{
        //checking if publication exist
        publication.find({Title}).then(result =>{
            if(result.length)
            {
                res.json({
                    status: "FAILED",
                    message: "Already exist!!!"
                })
            }
            else{
                const newPublication = new publication({
                    Year,Title,Faculties,Type,SubType,Name,Details,ImpactFactor,Affiliated,Branch
                });
                newPublication.save().then(result => {
                    res.json({
                        status: "SUCCESS",
                        message: "Publication Approval Requested!",
                        data: result,
                        //newdata: newPublication
                    });
                })
            }
        })
        
        .catch(err => {
            console.log(err)
            res.json({
                status: "FAILED",
                message: "Error occured while uploading"
            });
        }) 
    }
    
})

router.post('/retrieve', (req,res) =>{
    //let{Title} = req.body
    res.header("Access-Control-Allow-Origin", "*");
    console.log('Request: ',req.body)
    //console.log('Title = ',Title)
    if(req.body == ""){
        res.json({
            status:"FAILED",
            message:"Empty field"
        })
    }
    else{
        //console.log('titke=',Title)
        PermPublication.find(req.body)
        .then( data => {
            console.log(data)
            if (data.length){
                res.json({
                    status: "SUCCESS",
                    message: "Found!!",
                    data
                })
                console.log("Result: ",data)
            }
            else{
                res.json({
                    status: "FAILED",
                    message: "Not found"
                })
            }
        })
    }
})

router.get('/sort', (req,res) =>
{
    let {condition} = req.body
    publication.find({}).sort(condition)
    .then(data =>{
        console.log('The data is',data)
        if(data.length){
            res.json({
                status: "SUCCESS",
                message: "Sorted!!",
                data: data
            })
        }
        else{
            res.json({
                status: "FAILED",
                message: "Couldn't Sort"
            }) 
        }
    })
})


router.get('/filter', (req,res) =>
{
   let {time} = req.body
   const d = new Date
   const y = new Date
   console.log(y.getFullYear())
   console.log("Year = ",d.getFullYear()-time)
   console.log("Curr Date = ",d)
   d.setFullYear(d.getFullYear() - time)
   console.log("New Date = ",d)
   publication.find({
    DateOfApproval: {$gt:d, $lt:y}
   }).then(data =>{
    if(data.length){
        res.json({
            status: "SUCCESS",
            message: "Filtered!!",
            data: data
        })
    }
    else{
        res.json({
            status: "FAILED",
            message: "Couldn't Filter"
        }) 
    }
   })
   


    console.log("Request = ",req.body)
    
})



router.post('/verified', (req,res) =>{
    console.log(req.body)
    let {Title,Confirm} = req.body
    console.log(Title)
    Title = Title.trim()
    if(Confirm=="Yes"){
        publication.find({Title})
    .then(data =>{
        if(data.length){
            console.log(data)
            console.log(data[0].Faculties)
            newdata = {
                Faculties: data[0].Faculties,
                Title: data[0].Title,
                Year: data[0].Year,
                Type: data[0].Type,
                SubType: data[0].SubType,
                Name: data[0].Name,
                Details: data[0].Details,
                ImpactFactor: data[0].ImpactFactor,
                Affiliated: data[0].Affiliated,
                Branch: data[0].Branch
            }
            console.log(newdata)
            const newPermpublication = new PermPublication(newdata);
            console.log(newPermpublication)
            newPermpublication.save().then(result =>{   
                res.json({
                    status: "SUCCESS",
                    message: "Publication added to permanent database",
                    data: result
                });
                console.log(Title)
                publication.findOneAndDelete({"Title":data[0].Title}).then(data1 =>
                    {
                        console.log("File\n:",data1)
                    })
                console.log(publication.find())
            })
            
        }
        else{
            res.json({
                status: "FAILED",
                message: "Couldn't Find the given publication"
            })
        }
    })
    }
    else{
        publication.findOneAndDelete({"Title":data[0].Title}).then(data1 =>
            {
                console.log("File\n:",data1)
                res.json({
                    status: "SUCCESS",
                    message: "Sucessfully Removed"
                })
            })
    }
    
})

module.exports = router