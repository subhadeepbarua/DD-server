const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 6001;
const cors = require('cors');


app.use(cors());
app.use(bodyParser.json());

const loginRoute = require('./routes/login');
const createEmployeeRoute = require('./routes/createEmployee')
const editEmployeeRoute = require('./routes/editEmployee')
const fetchEmployeesInfoRoute = require('./routes/fetchEmployeesInfo')
const deleteEmployeeRoute = require('./routes/deleteEmployee')

app.use('/login_check', loginRoute)
app.use('/create_employee', createEmployeeRoute)
app.use('/update_employee', editEmployeeRoute)
app.use('/delete_employee', deleteEmployeeRoute);
app.use('/fetch_employees_info', fetchEmployeesInfoRoute)

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });