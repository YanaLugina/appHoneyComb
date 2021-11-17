import { useState } from 'react';
import './App.css';
import FormPerson from "./components/FormPerson";
import Persons from "./components/Persons";

const App = ({ combs }) => {
  const [arrPerson, setArrPerson] = useState([{ id: 1, name: 'rrr', serName: 'DDD', phone: '7434555' }]);
  const [arr, setArr] = useState([]);
  const createVar = combs.getVariable('idt', 2);
  console.log('get createVar:', createVar);
  combs.setVariableDefinition(
      'arrList',
      [],
      { type: 'getStoreId', url: '/planets', method: 'GET', transformAfter: (data) => data.results}
      );

  const handleGetArrList = async() => {
      const data = await combs.getVariable('arrList', [], true);
      setArr(data);
      console.log('defVArId----', data);
  };

  const handleCreate = (value) => {

    const localId = combs.setVariable('idt', s => ++s, 2);
    setArrPerson(s => [...s, {...value, id: localId}]);

    handleGetArrList();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Header</h1>
      </header>
      <footer>
        <h2>Body</h2>
        <section style={{ width: '400px' }}>
          <Persons persons={arrPerson} />
        </section>
        <section>
          <FormPerson handleCreate={handleCreate} />
        </section>
          {
              arr.length > 0 && arr.map(item => item.name)
          }
      </footer>
    </div>
  );
}

export default App;
