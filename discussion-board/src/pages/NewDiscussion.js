import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewDiscussion = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];

        const newDiscussion = {
            id: Date.now(),
            title,
            content,
        };

        const updatedDiscussions = [...storedDiscussions, newDiscussion];
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));

        navigate('/discussions');
    };

    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            backgroundColor: '#2c3e50',
            borderRadius: '10px',
            color: '#ecf0f1',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        },
        heading: {
            textAlign: 'center',
            fontSize: '24px',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        label: {
            fontWeight: 'bold',
            marginBottom: '5px',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #34495e',
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: '#34495e',
            color: '#ecf0f1',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            border: '1px solid #34495e',
            borderRadius: '6px',
            fontSize: '16px',
            backgroundColor: '#34495e',
            color: '#ecf0f1',
            resize: 'vertical',
        },
        button: {
            padding: '12px',
            border: 'none',
            borderRadius: '6px',
            backgroundColor: '#0078D4',
            color: '#fff',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Post a New Discussion</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <div>
                    <label htmlFor="title" style={styles.label}>Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        style={styles.input}
                    />
                </div>
                <div>
                    <label htmlFor="content" style={styles.label}>Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={styles.textarea}
                    />
                </div>
                <button
                    type="submit"
                    style={styles.button}
                >
                    Post Discussion
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
