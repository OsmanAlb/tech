import { useState } from "react";

const Create = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('mario');

  return (
    <div className="create">
      <form>
        <label className="name_style">Тема обращения</label>
        <input 
        className="form-control_0" 
          type="text" 
          placeholder="Пожалуйста, укажите тему"
          required 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="name_style">Описание проблемы</label>
        <textarea 
          className="form-control" 
          placeholder="Пожалуйста, опишите подробнее проблему"
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {/* <label>Blog author:</label>
        <select
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button>Add Blog</button> */}
      </form>
    </div>
  );
}
 
export default Create;