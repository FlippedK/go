import React, {useState, useEffect, useRef} from "react";
import axios from "axios";
import './App.css';

function App() {
  const [notes, setNotes] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  const inputTitle = useRef(null);
  const inputInfo = useRef(null);
  const inputData = "2022-04-16T00:00:00";

  useEffect(() => {
    axios.get(
      'http://localhost:9090/api/notes', {
        withCredentials: false
      }).then(r => {
        console.log(r.data);
        setNotes(r.data);
      });
  }, [isUpdate]);

  const addNote = () => {
    axios.post('http://localhost:9090/api/note/add',
    {
      title: inputTitle.current.value,
      info: inputInfo.current.value,
    },
    {
      withCredentials: false
    }
    ).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  const DelNote = (id) => {
    axios.delete(`http://localhost:9090/api/note/${id}`,
    {
      withCredentials: false
    }
    ).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  const editNote = () => {
    axios.put(`http://localhost:9090/api/note/edit/`,
    {
      title: inputTitle.current.value,
      info: inputInfo.current.value,
      created_at: inputData,
    },
    {
      withCredentials: false
    }
    ).then(() => {
      setIsUpdate(!isUpdate);
    });
  }

  return (
    <div className="App">

      <label>Заголовок</label>
      <input ref={inputTitle} type="text"/>
      <label>Описание</label>
      <input ref={inputInfo} type="text"/>
      <button onClick={() => addNote()}>Добавить</button>

    {!!notes && notes.map((note, index) => (
      <div key={'note_' + index}>{note.title}
      <button onClick={() => DelNote(note.id)}>Удалить</button>
      <button onClick={() => editNote(note.id)}>Изменить</button>
      </div>
    ))}

    </div>
  );
}

export default App;
