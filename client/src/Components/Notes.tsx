import React, { useState, useEffect, FormEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NotePage.css';

const NotePage: React.FC = () => {
  const [notes, setNotes] = useState<{ title: string; content: string }[]>([]);
  const [noteInput, setNoteInput] = useState<string>('');
  const [titleInput, setTitleInput] = useState<string>('');

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Add a new note and save to localStorage
  const addNote = (e: FormEvent) => {
    e.preventDefault();
    if (titleInput.trim() && noteInput.trim()) {
      const newNote = { title: titleInput, content: noteInput };
      const updatedNotes = [...notes, newNote];
      setNotes(updatedNotes);
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      setTitleInput('');
      setNoteInput('');
    }
  };

  // Remove a note and update localStorage
  const removeNote = (index: number) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  return (
    <div className="container mt-4" style={{ backgroundColor: '#f0f8ff', padding: '20px', borderRadius: '8px' }}>
      <h1 className="text-center">Notes</h1>
      <form onSubmit={addNote}>
        {/* <input
          type="text"
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
          placeholder="Note Title"
          className="form-control mb-2"
        /> */}
        <textarea
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Write a note..."
          cols = {500}
          rows={20}
          className="form-control note-textarea mb-2"
        ></textarea>
        <button type="submit" className="btn btn-success mb-3">Add Notes</button>
        {/* <button className="btn btn-danger mb-3" onClick={() => removeNote(0)}>Delete</button>
        <button className="btn btn-primary mb-3" onClick={() => removeNote(0)}>View Notes</button> */}
      </form>

      <ul className="list-group">
        {notes.length === 0 ? (
          <p>Whats on your mind?</p>
        ) : (
          notes.map((note, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <h5>{note.title}</h5>
                <p>{note.content}</p>
              </div>
              <button className="btn btn-danger" onClick={() => removeNote(index)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default NotePage;