import axios from "axios";
import { useState, useEffect,useContext } from "react";
import UserContext from "./context/UserContext";
import { Link , useNavigate} from "react-router-dom";

const EmployeeList = () => {
  const [employee, setEmployee] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const clickDelete = async (uniqueId) => {
    setShowPopup(true);
    setDeleteId(uniqueId);
  
    try {
     
      await axios.delete("http://localhost:6001/delete_employee", {
        data: { deleteId: uniqueId }, 
      });
      
    } catch (error) {
      console.error("Error deleting employee:", error);
      
    }
    
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          "http://localhost:6001/fetch_employees_info"
        );
        const data = response.data;
        setEmployee(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployee();
  }, []);

  const handleDelete = async () => {
    if (deleteId) {
      try{
        axios.post('http://localhost:6001/delete_employee',{deleteId})
        const updatedEmployeeList = employee.filter(item => item.uniqueId !== deleteId);
        setEmployee(updatedEmployeeList);
      } catch (error) {
        console.error('Error adding connection:', error);
      }
   
    }
    setShowPopup(false);
  };

  const handleEdit = (item) => {
    setUser({
      uniqueId: item.uniqueId,
      name: item.name,
      email: item.email,
      mobile: item.mobile,
      designation: item.designation,
      gender: item.gender,
      course: item.course,

    });

    navigate('/EmployeeEdit')
  };

  const filteredEmployee = employee.filter((item) =>
  item.name.toLowerCase().includes(searchKeyword.toLowerCase())
);

  return (
    <div className=" mt-[50px]">
      <div className="w-full flex flex-col gap-1 mb-1">
        <div className="flex flex-row justify-end w-full">
          <div className=" w-[60%] max-w-[800px] flex flex-row justify-between items-center mx-2">
            {employee && <h1>Total Count: {employee.length} </h1>}
            <div className="w-[80%] flex flex-row justify-center">
              <Link to="/CreateEmployee">
                <button className="text-center bg-green-400 px-4 p-1 rounded-md ">
                  Create Employee
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-end w-full">
          <div className=" w-[60%] max-w-[800px] flex flex-row justify-between items-center mx-2">
            <h1>Search </h1>
            <input
              className="w-[80%] p-1 text-center border-2 border-black-2"
              placeholder="Enter search keyword"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            ></input>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto">
        <table className="min-w-full bg-white border-collapse">
          <thead className="bg-gray-800 text-white ">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Unique ID
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Image
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Email
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Mobile No.
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Gender
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Designation
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Course
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Create Date
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="overflow-y-auto text-gray-700">
            {filteredEmployee.map((item, index) => (
              <tr
                key={item.id}
                className={index % 2 === 0 ? "bg-gray-100" : "bg-gray-200"}
              >
                <td className="text-left py-3 px-4">{item.uniqueId}</td>
                <td className="text-left py-3 px-4">{item.name}</td>
                <td className="text-left py-3 px-4">
                  <img
                    src={item.image}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="text-left py-3 px-4">{item.email}</td>
                <td className="text-left py-3 px-4">{item.mobile}</td>
                <td className="text-left py-3 px-4">{item.gender}</td>
                <td className="text-left py-3 px-4">{item.designation}</td>
                <td className="text-left py-3 px-4">{item.course}</td>
                <td className="text-left py-3 px-4">
                  {new Date(item.createDate).toLocaleDateString()}
                </td>

                <td className="text-left py-3 px-4">
                  <button onClick={()=>handleEdit(item)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded">
                    Edit
                  </button>
                  <button
                    onClick={() => clickDelete(item.uniqueId)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                  {showPopup && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10">
                      <div className="bg-white p-6 rounded-lg">
                        <p>Do you want to Delete?</p>
                        <div className="mt-4 flex justify-end">
                          <button
                            className="bg-green-500 text-white px-4 py-2 mr-2"
                            onClick={handleDelete}
                          >
                            Yes
                          </button>
                          <button
                            className="bg-red-500 text-white px-4 py-2"
                            onClick={() => setShowPopup(false)}
                          >
                            No
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;
