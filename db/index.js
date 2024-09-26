// db.js
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/expense_app");

const Userschema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
    },
    email :{
        type : String,
        required : true,
    },
    password :{
        type : String,
        required : true,
    },
    role :{
        type : String,
        required : true,
    },
    department:{
        type : String,
        required : true,
    },
    createdAt :{
        type : Date,
        default : Date.now,
    },

});

const Adminschema = new mongoose.Schema({
    name:{
        type : String,

    },
    email:{
        type : String,
    },
    password:{
        type:String,
    },
})

const Expenseschema = new mongoose.Schema({

    employee : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    expense_date:{  
        type : Date,
        default : Date.now,
        
    },
    expense_type:{
        type : String,
        required : true,
    },
    expense_amount:{
        type : Number,
        required : true,
    },
    expense_description:{
        type : String,
        required : true,
    },
    receiptUrl : {
        type : String,
        required: false,
    },
});

const Approvalschema = new mongoose.Schema({

    expense : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Expense',
        required : true,
    },
    manager :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Admin',
        required : true,
    },
    status : {
        type : String,
        enum : ['approved','rejected'],
        required : true,
    },
    comments: {
        type: String,
        required: false,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
});

const Paymentschema = new mongoose.Schema({
    expense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',  // Reference to the Expense collection
        required: true,
      },
      paymentstatus :{
        type : String,
        enum : ['pending','completed'],
        default : 'pending',
        required : true,
      },
        reimbursementDate: {
            type:Date,
            required: true,
        },
});



const User = mongoose.model('User',Userschema);
const Admin = mongoose.model('Admin',Adminschema);
const Expense = mongoose.model('Expense',Expenseschema);
const Approval = mongoose.model('Approval',Approvalschema);
const Payment = mongoose.model('Payment',Paymentschema);

module.exports = {
    User,
    Admin,
    Expense,
    Approval,
    Payment,
    
}