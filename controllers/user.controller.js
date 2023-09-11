const excelJS = require("exceljs");
const userModel = require("../models/User");
const PDFDocument = require('pdfkit');
const { validateParams } = require('../utils/validate-params');
const getExcelSheet = async (req,res) => {
    try{
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("User Details");
    worksheet.columns = [
      { header: "S No.", key: "s_no", width:10 }, 
      { header: "Name", key: "name", width:30 },
      { header: "Email", key: "email", width:30 },
      { header: "Image", key: "image", width:40 },
  ];
  const userList = await userModel.find({});
  if(userList.length > 0){
    for(let i=0;i<userList.length;i++){
        userList[i].s_no=i+1;
        worksheet.addRow(userList[i]);
    }
  }
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
  });
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=user-details.xlsx');
  workbook.xlsx.write(res)
      .then(() => {
        res.end();
      });
  }
  catch(error){
      res.status(500).send({error:error.toString()})
  }
}
const getPdf = async (req,res) => {
  try{
    const _id  = req.params.id;
    if(!validateParams(_id))
     throw 'Invalid User Id.';
    const user = await userModel.findOne({ _id });
     if(!user){
      throw 'User does not exist.';
     }
    const data =`Name: ${user.name}, Email: ${user.email}, Image: ${user.image}`;
    const pdf = new PDFDocument();
    pdf.pipe(res);
    pdf.fontSize(18).text('User Detail', { align: 'center',underline: true, bold: true });
    pdf.moveDown();
    pdf.fontSize(16).text(`Name: ${user.name}`, 100, 100);
    pdf.moveDown();
    pdf.fontSize(16).text(`Email: ${user.email}`, 100, 125);
    pdf.moveDown();
    pdf.fontSize(16).text(`Profile Image: ${user.image}`, 100, 150);
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename='+user.name+'.pdf');
    pdf.end();
  }
  catch(error){
    res.status(500).send({error:error.toString()})
  }
}
module.exports = {
    getExcelSheet,
    getPdf
}