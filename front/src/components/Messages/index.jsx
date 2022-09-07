import React, { useContext } from "react";

import { MessageContext } from "../../contexts/messages";

export default () => {
  const { messages } = useContext(MessageContext);

  return (
    <React.Fragment>
      {messages.length > 0 ? (
        <div>
          {messages.map((message) => {
            return (
              <div key={message.id}>
                <div>
                  <h1>
                    {message.title}
                  </h1>
                  <p>{message.content}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <p>Sem messages para exibir</p>
        </div>
      )}
    </React.Fragment>
  );
};
