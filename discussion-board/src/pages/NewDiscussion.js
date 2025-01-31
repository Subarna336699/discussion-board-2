import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            likes: 0,
            dislikes: 0,
        };

        const updatedDiscussions = [...storedDiscussions, newDiscussion];
        localStorage.setItem('discussions', JSON.stringify(updatedDiscussions));

        navigate('/discussions');
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Post a New Discussion</h1>
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm bg-light">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-bold">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        className="form-control"
                        rows="5"
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Post Discussion
                </button>
            </form>
        </div>
    );
};

export default NewDiscussion;
