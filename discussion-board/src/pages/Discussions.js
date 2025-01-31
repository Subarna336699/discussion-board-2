import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        const updatedDiscussions = storedDiscussions.map(discussion => ({
            ...discussion,
            userReaction: null,
        }));
        setDiscussions(updatedDiscussions);
    }, []);

    const handleReaction = (id, reaction) => {
        setDiscussions(prevDiscussions =>
            prevDiscussions.map(discussion => {
                if (discussion.id === id) {
                    let updatedLikes = discussion.likes;
                    let updatedDislikes = discussion.dislikes || 0;

                    if (reaction === 'like') {
                        updatedLikes = discussion.userReaction === 'like' ? updatedLikes - 1 : updatedLikes + 1;
                        if (discussion.userReaction === 'dislike') updatedDislikes--;
                        discussion.userReaction = discussion.userReaction === 'like' ? null : 'like';
                    } else if (reaction === 'dislike') {
                        updatedDislikes = discussion.userReaction === 'dislike' ? updatedDislikes - 1 : updatedDislikes + 1;
                        if (discussion.userReaction === 'like') updatedLikes--;
                        discussion.userReaction = discussion.userReaction === 'dislike' ? null : 'dislike';
                    }

                    return {
                        ...discussion,
                        likes: updatedLikes,
                        dislikes: updatedDislikes,
                    };
                }
                return discussion;
            })
        );
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Discussions</h1>
            <div className="text-center mb-4">
                <Link to="/new-discussion" className="btn btn-primary">
                    ➕ Post a New Discussion
                </Link>
            </div>

            <ul className="list-group">
                {discussions.map(discussion => (
                    <li key={discussion.id} className="list-group-item mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <Link to={`/discussion/${discussion.id}`} className="h5 text-decoration-none">
                                {discussion.title}
                            </Link>
                            <div className="d-flex gap-2">
                                <button
                                    className={`btn btn-sm ${discussion.userReaction === 'like' ? 'btn-success' : 'btn-outline-success'}`}
                                    onClick={() => handleReaction(discussion.id, 'like')}
                                >
                                    ❤️ Like <span className="badge bg-secondary ms-1">{discussion.likes}</span>
                                </button>
                                <button
                                    className={`btn btn-sm ${discussion.userReaction === 'dislike' ? 'btn-danger' : 'btn-outline-danger'}`}
                                    onClick={() => handleReaction(discussion.id, 'dislike')}
                                >
                                    👎 Dislike <span className="badge bg-secondary ms-1">{discussion.dislikes || 0}</span>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Discussions;