import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = 'http://localhost/assignment-3-backend/';

function App() {
  const [items, setItems] = useState([]);
  const [item, setItem] = useState('');
  const [amount, setAmount] = useState('1');


  function save(e) {
    e.preventDefault();
    const json = JSON.stringify({description:item,amount:amount})
    console.log(json)
    axios.post(URL + 'add.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
      .then((response) => {
        setItems(items => [...items,response.data]);
        setItem('');
        setAmount('');
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }

  function remove(id) {
    const json = JSON.stringify({id:id})
    axios.post(URL + 'delete.php',json,{
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    .then((response) => {
      const newListWithoutRemoved = items.filter((item) => item.id !== id);
      setItems(newListWithoutRemoved);
    }).catch (error => {
      alert(error.response ? error.response.data.error : error);
    })
  }
  useEffect(() => {
    axios.get(URL)
      .then((response) => {
        setItems(response.data)
        console.log(response.data)
      }).catch(error => {
        alert(error.response ? error.response.data.error : error);
      })
  }, [])

  return (
    <div className="container">
      <h2>Shopping list</h2>
      <form onSubmit={save}>
        <label>New item</label>
        <input value={item} onChange={e => setItem(e.target.value)} />
        <input className="input-amount" type="number" min='1' value={amount} onChange={e => setAmount(e.target.value)} />
        <button>Save</button>
      </form>
      <table>
        <tbody>
        {items?.map(item => (
          <tr key={item.id}>{item.description} 
          <th className="amount">{item.amount}</th>
          <th><a href="#" className="delete" onClick={() => remove(item.id)}>Delete</a></th>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
