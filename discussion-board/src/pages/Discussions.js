import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);
    const [likes, setLikes] = useState({});
    const [dislikes, setDislikes] = useState({});

    // Load discussions, likes, and dislikes from localStorage 
    useEffect(() => {
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        setDiscussions(storedDiscussions);

        const storedLikes = JSON.parse(localStorage.getItem('likes')) || {};
        const storedDislikes = JSON.parse(localStorage.getItem('dislikes')) || {};
        setLikes(storedLikes);
        setDislikes(storedDislikes);
    }, []);

     // Handle like action (used some help from AI (ChatGPT))
     const handleLike = (id) => {
        const updatedLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    // Handle dislike action (used some help from AI (ChatGPT))
    const handleDislike = (id) => {
        const updatedDislikes = { ...dislikes, [id]: (dislikes[id] || 0) + 1 };
        setDislikes(updatedDislikes);
        localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
    };
    
    return (
        <div className="container my-5 p-4 bg-dark text-white rounded shadow">
            <h1 className="text-center mb-4">Discussions</h1>
            <Link to="/new-discussion" className="btn btn-primary mb-4">
                Post a New Discussion
            </Link>
            <ul className="list-group">
                {discussions.map((discussion) => (
                    <li key={discussion.id} className="list-group-item bg-secondary text-white mb-3">
                        <h2>{discussion.title}</h2>
                        <p>{discussion.content}</p>
                        <button
                            className="btn btn-info me-2"
                            onClick={() => handleLike(discussion.id)}
                        >
                            Like ({likes[discussion.id] || 0})
                        </button>
                        <button
                            className="btn btn-info"
                            onClick={() => handleDislike(discussion.id)}
                        >
                            Dislike ({dislikes[discussion.id] || 0})
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Discussions;
