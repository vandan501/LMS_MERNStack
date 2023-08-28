import Course from "../models/course.model.js"
import AppError from "../utils/error.util.js";
import cloudinary from 'cloudinary';
import fs from 'fs/promises';




const getAllCourses = async function(req,res,next){
try {
    const course=await Course.find({}).select('-lectures');
    if(!course)
    {
        return next(new AppError("Course are not available"))
    }
    res.status(200).json({
        success:true,
        message:"All Courses ",
        course,
    })
 
} catch (e) {
    return next(new AppError(e.message,500));
}
    
} 

const getLecturesByCourseId=async function(req,res,next){
    try {
        const { id }=req.params;
        const course= await Course.findById(id);

        if(!course)
        {
            return next(new AppError("Invalid Course Id",400));
        }

        res.status(200).json({
            success:true,
            message:"Course lectures fetched successfully",
            lectures:course.lectures
        });
     
    } catch (e) {
        return next(new AppError(e.message,500));
    }

}

const createCourse=async function(req,res,next)
{
    try {
        const { title ,description ,category,createdBy } = req.body;
   
            if(!title || !description || !category ||!createdBy)
            {
            return next(new AppError("All fileds are required",400))
            }
const course=await Course.create({
    title,
    description,
    category,
    createdBy,
    thumbnail:  {
        public_id: 'Dummy',
        secure_url: 'Dummy',
                },
});
 
if(!course)
{
    return next(new AppError("Course could not created please try again",500));
}

if (req.file) {
    try {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      console.log(JSON.stringify(result));
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    } catch (e) {
      return next(new AppError(e.message, 500));
    }
  }
       await course.save();
    res.status(200).json({
    success:true,
    message:"course created successfully",
    course,
    })
} catch (e) {
        return next(new AppError(e.message,500))
}


}
const updateCourse=async function(req,res,next)
{
try {
    const { id }=req.params;
    const course = await Course.findById(id);

    if (!course) {
        return next(new AppError("Course with given id does not exist", 400));
    }
    await course.updateOne(
        {
            $set: req.body
        },
        {
            runValidator: true
        }
    );
    res.status(200).json({
        success:true,
        message:"course updated successfully",
        course
    })


} catch (e) {
    return next( new AppError(e.message,500))
}
}

const removeCourse=async function(req,res,next)
{

    try {
   
        const { id }=req.params;
        const course = await Course.findById(id);
        if (!course) {
            return next(new AppError("Course with given id does not exist", 400));
        }
        await course.deleteOne();
        
        res.status(200).json({
            success:true,
            message:"Course deleted SuccessFully"
        })
        
    } catch (e) {
        return next( new AppError(e.message,500))
        
    }

}

export{
    getAllCourses,
    getLecturesByCourseId,
    createCourse,
    updateCourse,
    removeCourse
}