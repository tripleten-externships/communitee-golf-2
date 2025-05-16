import { useEffect, useState,useCallback  } from 'react';
import submit from '../assets/submit.png';

const MOCK_CLIENT_ID = '1';
const MOCK_USER_ID = 'user-123';

type Message = {
  id: string; 
  content: string; 
  sentAt: string; 
  senderId: string;

}

const MessageArea = () => {

    
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState<string>('');

    const token = localStorage.getItem('token');
    const clientId = MOCK_CLIENT_ID;
    const userId = MOCK_USER_ID;

    const fetchMessages = useCallback(async () => {
  if (!clientId || !token) return;
  try {
    const res = await fetch(`http://localhost:8080/message-stream/${clientId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setMessages(data.messages);
    console.log('Fetched messages:', data.messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
  }
}, [clientId, token]);

   // Fetch messages on component mount
    useEffect(() => {
  fetchMessages();
}, [fetchMessages]);


// Mark as read after messages are loaded
useEffect(() => {
  fetchMessages().then(() => {
    fetch(`http://localhost:8080/message-stream/${clientId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to mark as read');
      })
      .catch((err) => console.error('Read marking failed:', err));
  });
}, [clientId, fetchMessages, token]);


    const handleSend = async() => {
        if (!input.trim()||!token ||!clientId) 
            return;

        console.log('Sending message:', input);
        try{
            setMessages((prev) => [
                ...prev,
                {
                  id: `${Date.now()}`,
                  content: input,
                  sentAt: new Date().toISOString(),
                  senderId: userId,
                },
              ]);
              

            const res = await fetch(`http://localhost:8080/message/${clientId}`, {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({content:input})

        });

        console.log('POST response:', res.status); 

        if (!res.ok) {
          const errData = await res.json();
          console.error('Server error:', errData);
          return;
        }
        setInput('');
        fetchMessages();
        }catch(err){
            console.error('Error sending message:', err);
        }};

        const formatTimestamp = (sentAt: string, now = new Date()) => {
            const  sentTime = new Date(sentAt);
            const diff = (now.getTime() - sentTime.getTime())/1000;

            if(diff < 60) return 'just now';
            if(diff < 3600) return `${Math.floor(diff/60)} mins ago`;
            if(diff < 86400) return `${Math.floor(diff/3600)} hours ago`;

            return sentTime.toLocaleTimeString([],{
              month: 'short',
              day: 'numeric',
              hour: '2-digit', 
              minute: '2-digit'});
        }


    return (
        <div className="flex flex-col h-full border border-gray-300 p-4 rounded-lg">
          <div className="flex-1 overflow-y-auto mb-4 flex flex-col">
            {messages.map((msg,index) => {
                const prev = messages[index - 1];
                const shouldShowTime = !prev || new Date(prev.sentAt).getMinutes() !== new Date(msg.sentAt).getMinutes()|| prev.senderId !== msg.senderId;
            
            return(
              <div key={msg.id} className="flex flex-col items-start">
              {shouldShowTime && (
                <span className={`text-[10px] text-gray-500 ${msg.senderId === userId ? 'self-end' : 'self-start'}`}>
                  {formatTimestamp(msg.sentAt)}
                </span>
              )}
              <div
                className={` text-sm mb-1 pt-[8px] pr-[12px] pb-[12px] pl-[12px] rounded inline-block max-w-[260px] break-words ${msg.senderId === userId ? 'bg-red-100 self-end rounded-[16px] rounded-tr-none' : 'bg-gray-100 self-start rounded-[16px] rounded-tl-none'}`}
              >
                <span className='m-0 p-0'>{msg.content}</span>
                
              </div>
              
              </div>
            );
            })}
          </div>
          <div className=" relative w-full">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Write a message..."
              className="w-full pr-10 p-2 rounded border border-gray-300"
            />
            <button
              onClick={handleSend}
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <img src={submit} alt="Send" className="w-[16px] h-[13.5px]"/>
            </button>
          </div>
        </div>
      );
}      

export default MessageArea;


// Uncomment the following lines to test the login functionality
/*fetch('http://localhost:8080/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'manager',
      password: 'golfcourse123'
    })
  })
    .then(res => res.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      console.log('Token stored:', data.token);
    });
  */