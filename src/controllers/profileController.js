const profilrModel = require("../models/profieModel");
const {isValidObjectId}=require("../validotor/validaor")

const aws = require("../controllers/awsontroller");

exports.profileFile = async function (req, res) {
  try {
    let userId = req.params.userId;
    let files = req.files;
    let data = req.body;
 


    mimetype = files[0].mimetype.split("/"); //---["image",""] check only image
    if (mimetype[0] !== "image")
      return res
        .status(400)
        .send({ status: false, message: "Please Upload the Image File only" });
    if (files && files.length > 0)
      var uploadedFile = await aws.uploadFile(files[0]);
    data.profileImage = uploadedFile;
    data.userId = userId;
    const createProfile = await profilrModel.create(data);
    return res.status(201).send({
      status: true,
      message: "profile upload Successfully",
      data: createProfile,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};
exports.updateprofilDetails = async (req, res) => {
  try {
   let userId = req.params.userId;
   let data = req.body;
   let files = req.files;

   
   
   if (!isValidObjectId(userId))
     return res
       .status(400)
       .send({ status: false, message: "please enter valid userId" });
       
   
 //   let update={}
  
  
   if (files.length > 0) {
     mimetype = files[0].mimetype.split("/");
     if (mimetype[0] !== "image")
       return res.status(400).send({
         status: false,
         message: "Please Upload the Image File only",
       });
     if (files && files.length > 0)
       var uploadedFileURL = await aws.uploadFile(files[0]);
       data.userId = userId;
       data.profileImage = uploadedFileURL;
       
   }

  

   let updateProfile = await profilrModel.findByIdAndUpdate(
     { _id: userId },
     data,
     { new: true }
   );
   return res.status(200).send({
     status: true,
     message: "User profile updated",
     data: data,
   });
 } catch (error) {
   return res.status(500).send({ status: false, message: error.message });
 }
};
