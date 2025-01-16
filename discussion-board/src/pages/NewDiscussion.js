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
            id: Date.now(), // Use current timestamp as unique ID
            title,
            content,
            likes: 0,
            dislikes: 0,
        };

        const updatedDiscussions = [...storedDiscussions, newDiscussion];
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));

        navigate('/discussions');
    };

    // Define styles
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '50px auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#f9f9f9',
        },
        heading: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        label: {
            fontWeight: 'bold',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: '#fff',
        },
        textarea: {
            width: '100%',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            backgroundColor: '#fff',
            resize: 'vertical',
            minHeight: '100px',
        },
        button: {
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#007bff',
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
                    onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Post Discussion
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
