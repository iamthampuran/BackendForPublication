const express = require('express')
const PermPublication = require('./../models/PemPublication')
const router = express.Router()
const publication = require('./../models/User')
//const data = require('./data')


router.get('/add',(req,res) => {
    let{Faculties,Title,Required,DateOfApproval,Type,SubType,PublicationName,ImpactFactor,Affiliated} = req.body
    console.log(req.body)
    console.log('F =', Faculties)
    Faculties = Faculties.trim()
    Title = Title.trim()
    Required = Required.trim()
    DateOfApproval = DateOfApproval
    Type = Type.trim()   
    SubType = SubType.trim()
    PublicationName = PublicationName.trim()
    ImpactFactor = ImpactFactor.trim()
    Affiliated = Affiliated.trim()
    //checking if the fields are empty
    if(Faculties == "" || Title == "" || DateOfApproval == "" || Required == "" || Type == "" || SubType == "" || PublicationName == "" || ImpactFactor == "" || Affiliated == ""){
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
                    Faculties,
                    Title,
                    Required,
                    DateOfApproval,
                    Type,
                    SubType,
                    PublicationName,
                    ImpactFactor,
                    Affiliated
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
        publication.find(req.body)
        .then( data => {
            console.log(data)
            if (data.length){
                res.json({
                    status: "SUCCESS",
                    message: "Found!!",
                    data: data
                })
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



router.get('/verified', (req,res) =>{
    console.log(req.body)
    let {Title} = req.body
    console.log(Title)
    Title = Title.trim()
    publication.find({Title})
    .then(data =>{
        if(data.length){
            console.log(data)
            console.log(data[0].Faculties)
            newdata = {
                Faculties: data[0].Faculties,
                Title: data[0].Title,
                Required: data[0].Required,
                DateOfApproval: data[0].DateOfApproval,
                Type: data[0].Type,
                SubType: data[0].SubType,
                PublicationName: data[0].PublicationName,
                ImpactFactor: data[0].ImpactFactor,
                Affiliated: data[0].Affiliated
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
                
                publication.deleteOne(data[0])
            })
            
        }
        else{
            res.json({
                status: "FAILED",
                message: "Couldn't Find the given publication"
            })
        }
    })
})

module.exports = router