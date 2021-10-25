
import './App.css';
import {useState,useEffect, useRef} from 'react'

function App() {

 const [user,setuser] = useState([])
 const nameRef = useRef();
 const emailref = useRef();
          
  useEffect(() => {
    fetch('http://localhost:5000/users')
    .then(response => response.json())
    .then(data => setuser(data))
  },[])
  


  const handleUser = (e)=>{
  const name = nameRef.current.value;
  const email = emailref.current.value;
  
  const newUser = {name: name,email: email}

    fetch('http://localhost:5000/users',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const addUser = data;
      const newMember = [...user,addUser];
      setuser(newMember)
    })
    
    nameRef.current.value = '';
    emailref.current.value = '';
    e.preventDefault();
  }


  

  return (
    <div className="App">
        <h3>Users: {user.length}</h3>
        
       <form action="" onSubmit={handleUser}>
         <input ref={nameRef} type="text" placeholder="Name"/>
         <input ref={emailref} type="email" placeholder="Email"/>
         <input type="submit" value="submit"/>
       </form>


        <h3>
          {
            user.map(user => <li key={user.id}>id: {user.id} Name: {user.name} email: {user.email}:</li>)
          }
         
          </h3>
    </div>
  );
}

export default App;
