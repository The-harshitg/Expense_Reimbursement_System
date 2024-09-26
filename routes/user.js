    // router/user.js

    const { Router } = require("express");
    const adminMiddleware = require("../middleware/admin")
    const userMiddleware = require("../middleware/user");
    const { User,Expense } = require("../db");
    const {JWT_SECRET} = require("../config");
    const router = Router();
    const jwt = require("jsonwebtoken");
      


    router.post('/signup',async function(req,res){
        
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const role = req.body.role
        const department = req.body.department

        await User.create({
            name:name,
            email:email,
            password:password,
            role:role,
            department:department

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

    // employeee sumbit expenses

    router.post("/expenses", userMiddleware , async (req,res)=>{

        
        const expense_amount = req.body.expense_amount
        const expense_description = req.body.expense_description
        const expense_date = req.body.expense_date
        const expense_type = req.body.expense_type
        const receiptUrl = req.body.receiptUrl

        const user = req.user;
        console.log(user);

        const expense = new Expense({
            employee : user._id,
            expense_amount,
            expense_description,
            
            expense_type,
            receiptUrl,
        });

        await expense.save();
        res.status(201).json({ message: 'Expense submitted successfully', expenseId: expense._id });

    });

    router.get('/expenses', userMiddleware, async (req, res) => {
        
        const response = await Expense.find({});

        res.json({
             response
        })

    })
    

    module.exports = router;