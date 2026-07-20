import AnimalReport from "../models/AnimalReport.js";
export const createReport=async(req,res)=>{
    try{
        const report=await AnimalReport.create(req.body);
        res.status(200).json({
            message:"Report created successfully",
            report
        });
    }
    catch(err){
        res.status(400).json({
            message:err.message
        });
    }
};
export const getAllReports=async(req,res)=>{
    try{
        const reports=await AnimalReport.find();
        res.status(200).json(reports);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}
export const getReportById=async(req,res)=>{
    try{
        const report=await AnimalReport.findById(req.params.id);
        if(!report){
            return res.status(404).json({
                message:"Report not found"
            });
        }
        res.json(report);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}
export const updateReport=async(req,res)=>{
 try{
    const report=await AnimalReport.findByIdAndUpdate(req.params.id);
    if(!report){
        return res.status(404).json({
            message:"Report not found"
        })
    }
    res.json(report);
}  
 catch(err){
    res.json({
        message:err.message
    })
 } 
};
export const deleteReport=async(req,res)=>{
    try{
        const report=await AnimalReport.findByIdAndDelete(req.params.id);
        if(!report){
            return res.status(404).json({
                message:"Report not found"
            });
        }
        res.json({
            message:"report deleted successfully"
        });
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}