import React, {useState} from 'react';
import './App.css';
import * as ReactBootStrap from "react-bootstrap" ;
import {nanoid} from 'nanoid';

//create form field 
//add object to players array based on value typed in form field
//display object values in table

 const App = () => {
    const[players, setPlayers] = useState( [
      {position: "Forward",name: "Lebron",team: "Lakers"},
      {position: "Guard",name: "James Harden",team: "Rockets"},
      {position: "Guard",name: "Russell Westbrook",team: "Rockets"},
      {position: "Forward",name:"Luke Donic",team: "Mavericks"}
    ]); 
    const[addFormData, setAddFormData] = useState({
      name: '',
      position: '',
      team: ''
    })

    const handleAddFormChange = (event) => {
      event.preventDefault();
      const fieldName = event.target.getAttribute('name');
      const fieldValue = event.target.value;

      const newFormData = {...addFormData};
      newFormData[fieldName] = fieldValue;
      setAddFormData(newFormData);
    }

    const handleAddFormSubmit=(event)=>{
      event.preventDefault();
      const newPlayer = {
        id:nanoid(),
        name: addFormData.name,
        position: addFormData.position,
        team: addFormData.team
      };
      const newPlayers = [...players, newPlayer];
      setPlayers(newPlayers)
    }

    const handleDeleteClick = (playerId)=>{
      const newPlayers = [...players];
      const index = players.findIndex((player)=> player.id===playerId);
      newPlayers.splice(index,1);
      setPlayers(newPlayers);
    }
    
  return (
  
    < div className="App">
    <ReactBootStrap.Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Team</th>
      </tr>
    </thead>
    <tbody>
      {players.map((player)=>( 
        <tr>
          <td>{player.name}</td>
          <td>{player.position}</td>
          <td>{player.team}</td>
          <td>
            <button type="button" onClick={()=>handleDeleteClick(player.id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
    </ReactBootStrap.Table>

    <h2>Add a Player</h2>
    <form onSubmit={handleAddFormSubmit}>
      <input type="text" name="name" required="required" placeholder="Enter a name" onChange={handleAddFormChange}></input>
      <input type="text" name="position" required="required" placeholder="Enter a position" onChange={handleAddFormChange}></input>
      <input type="text" name="team" required="required" placeholder="Enter a team" onChange={handleAddFormChange}></input>
      <button type="submit">Add</button>
    </form>
    </div>
  );
}

export default App;