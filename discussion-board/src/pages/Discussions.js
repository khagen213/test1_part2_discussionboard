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

    // Handle like action
    const handleLike = (id) => {
        const updatedLikes = { ...likes, [id]: (likes[id] || 0) + 1 };
        setLikes(updatedLikes);
        localStorage.setItem('likes', JSON.stringify(updatedLikes));
    };

    // Handle dislike action
    const handleDislike = (id) => {
        const updatedDislikes = { ...dislikes, [id]: (dislikes[id] || 0) + 1 };
        setDislikes(updatedDislikes);
        localStorage.setItem('dislikes', JSON.stringify(updatedDislikes));
    };

    // Styles
    const styles = {
        container: {
            maxWidth: '800px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#1c1e21',
            borderRadius: '10px',
            color: '#f1f1f1',
            boxShadow: '0 4px 12px rgba(13, 13, 13, 0.3)',
        },
        header: {
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px',
        },
        link: {
            display: 'inline-block',
            marginBottom: '20px',
            padding: '12px 20px',
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: '#0078D4',
            borderRadius: '6px',
            transition: 'background-color 0.3s ease',
            textAlign: 'center',
        },
        list: {
            listStyle: 'none',
            padding: '0',
        },
        listItem: {
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #333',
            borderRadius: '8px',
            backgroundColor: '#292c34',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
        },
        content: {
            fontSize: '16px',
            marginBottom: '15px',
        },
        button: {
            marginRight: '10px',
            padding: '10px 16px',
            border: 'none',
            borderRadius: '5px',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
        },
        likeButton: {
            backgroundColor: '#4caf50',
            color: '#fff',
        },
        dislikeButton: {
            backgroundColor: '#f44336',
            color: '#fff',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Discussions</h1>
            <Link to="/new-discussion" style={styles.link}>
                Post a New Discussion
            </Link>
            <ul style={styles.list}>
                {discussions.map((discussion) => (
                    <li key={discussion.id} style={styles.listItem}>
                        <h2 style={styles.title}>{discussion.title}</h2>
                        <p style={styles.content}>{discussion.content}</p>
                        <button
                            style={{ ...styles.button, ...styles.likeButton }}
                            onClick={() => handleLike(discussion.id)}
                        >
                            Like ({likes[discussion.id] || 0})
                        </button>
                        <button
                            style={{ ...styles.button, ...styles.dislikeButton }}
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
