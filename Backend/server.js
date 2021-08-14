const express =  require('express');
const path =  require('path');
require('express-async-errors');
const cors = require("cors");

const {sequelize ,User} =  require('./models');
const Vasiti =  require('./src/route/vasiti.js');
const app = express()
app.use(express.json())
const corsOption = {
    origin: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    exposedHeaders: ["x-auth-token"],
  };
app.use(cors(corsOption));

app.use('/vasiti',Vasiti)
app.use(express.static(path.join(__dirname, "public")));

require("./src/middleware/errorHandler")(app);
const PORT = process.env.PORT || 24434

app.listen(PORT,async(request, response)=>{
    console.log(`server running on prot ${PORT}`)
    await sequelize.authenticate()
    // await sequelize.sync({force:true})
})