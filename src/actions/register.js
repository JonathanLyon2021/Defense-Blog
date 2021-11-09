import axios from "axios";

const Register = async (email, password)=> {
    try{ 
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const {data} = await axios.post(
            "http://localhost:8000/api/users/signup",
            config
        )
            if(data){
                return data;
            } else {
                return "Database Error";
            }

    }catch(err){
        console.log(err);
    }
}

export default Register;