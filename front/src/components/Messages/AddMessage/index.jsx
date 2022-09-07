import React, { useState, useContext } from "react";

import { MessageContext } from "../../../contexts/messages";

export default () => {
  const { addMessage, messages } = useContext(MessageContext);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      id: messages.length + 1,
      title,
      content,
    };

    addMessage(newMessage);
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmit}>
        <div className="w-full mb-5">
          <label htmlFor="title">Title</label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="This is a title"
          />
        </div>
        <div className="w-full mb-5">
          <label htmlFor="content">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="Lorem ipsum..."
          />
        </div>
        <div>
          <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Message
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
