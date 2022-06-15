const express = require('express')
const Publication = require('./../models/User')
const router = express.Router()
const publication = require('./../models/User')


router.post('/add',(req,res) => {
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
        Publication.find({Title}).then(result =>{
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
                        newdata: newPublication
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
    let{Title,} = req.body
    console.log('Title = ',Title)
    if(Title == ""){
        res.json({
            status:"FAILED",
            message:"Empty field"
        })
    }
    else{
        //console.log('titke=',Title)
        publication.find({Title})
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

module.exports = router