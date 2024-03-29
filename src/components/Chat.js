import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
} from "@mui/icons-material";
import MicIcon from "@mui/icons-material/Mic";
import "./Chat.css";
import axios from "./axios";

const Chat = ({ messages }) => {
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  const sendMessage = async (e) => {
    e.preventDefault();
    await axios.post("/messages/new", {
      message: input,
      name: "thewebdev",
      timestamp: new Date().toUTCString(),
      received: true,
    });
    setInput("");
  };
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/
b${seed}.svg`}
        />
        <div className="chat__headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${message.received && "chat__receiver"}`}
          >
            <span className="chat__name">{message.name}</span>
            {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};
export default Chat;
