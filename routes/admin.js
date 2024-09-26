// router/admin.js
const { Router } = require("express");
    const adminMiddleware = require("../middleware/admin")
    const userMiddleware = require("../middleware/user");
    const { User,Admin,Expense,Approval,Payment } = require("../db");
    const {JWT_SECRET} = require("../config");
    const router = Router();
    const jwt = require("jsonwebtoken");

    router.post('/signup',async function(req,res){
        console.log(req.body)
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        

        await Admin.create({
            name:name,
            email:email,
            password:password,
      })
        

        res.json({
            message:"User created successfully"
        })
    });


    router.post('/signin', async function(req,res){
        
        console.log(req.body);
        const email = req.body.email
        const password = req.body.password
    

        const user = await User.find({
            email,
            password,
        })
        if(user){
            const token =jwt.sign({
                email
            },JWT_SECRET)
            res.json({
                token
            })
        }
        else{
            res.json({
                message:"Invalid email or password"
            })
        }

    });

    router.put('/approval/:id', adminMiddleware , async function(req,res){
        
        const id = req.params.id;
        const status = req.body.status
        const comments = req.body.comments

        const admin = req.admin;

        const expense = await Expense.findById(id) 
        if(!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        const approval = new Approval({
            expense: expense._id,
            manager: req.admin.id, // Assuming the adminMiddleware adds user info
            status,
            comments,
        });


        await approval.save();
        res.json({
            message: 'Expense approved successfully',
        })
        
    })

    router.put("/payment/:id", adminMiddleware, async function(req,res){
       
        const id = req.params.id;
        const expense =  await Expense.findById(id)
        console.log(expense)
        const paymentstatus = req.body.paymentstatus
        const reimbursementDate = req.body.reimbursementDate

        if(!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        
        const payment = new Payment({
            expense: expense._id,
            paymentstatus,
            reimbursementDate,
        });
        console.log(payment)
        await payment.save();
        res.json({
            message: 'Expense paid successfully',
        })

    })

    router.get('/expenses', adminMiddleware, async (req, res) => {
        
        const response = await Payment.find({paymentstatus : 'pending'});

        res.json({
             response
        })

    })

   
    module.exports = router