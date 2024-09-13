import { Link } from 'react-router-dom';
import './chatList.css';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react'; // Correct Clerk import

const logo = `${import.meta.env.BASE_URL}logo.png`;

const ChatList = () => {
  const { getToken } = useAuth(); // useAuth hook from Clerk

  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: async () => {
      const token = await getToken(); // Obtain the token

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        headers: {
          'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  return (
    <div className='chatList'>
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create new Chat</Link>
      <Link to="/">Explore Machar AI</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
            ? "Loading..."
            : error
            ? "Something went wrong!"
            : data?.map((chat) => (
                <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}>
                  {chat.title}
                </Link>
              ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src={logo} alt="" />
        <div className="texts">
          <span>Upgrade to Machar AI Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  )
}

export default ChatList;
