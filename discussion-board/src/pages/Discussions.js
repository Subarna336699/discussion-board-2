import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Discussions = () => {
    const [discussions, setDiscussions] = useState([]);

    useEffect(() => {
        // Fetch discussions from localStorage or initialize with an empty array
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        const updatedDiscussions = storedDiscussions.map(discussion => ({
            ...discussion,
            userReaction: null, // Track user reaction ('like' or 'dislike')
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
                        updatedLikes = discussion.userReaction === 'like' ? updatedLikes + 1 : updatedLikes + 1;
                        if (discussion.userReaction === 'dislike') {
                            updatedDislikes--;
                        }
                        discussion.userReaction = discussion.userReaction === 'like' ? null : 'like';
                    } else if (reaction === 'dislike') {
                        updatedDislikes = discussion.userReaction === 'dislike' ? updatedDislikes + 1 : updatedDislikes + 1;
                        if (discussion.userReaction === 'like') {
                            updatedLikes--;
                        }
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
        <div className="discussions-container">
            <h1>Discussions</h1>
            <Link to="/new-discussion" className="new-discussion-link">➕ Post a New Discussion</Link>
            <ul className="discussion-list">
                {discussions.map(discussion => (
                    <li key={discussion.id} className="discussion-item">
                        <div className="discussion-box">
                            <Link to={`/discussion/${discussion.id}`} className="discussion-title">
                                {discussion.title}
                            </Link>
                            <div className="reaction-buttons">
                                <button
                                    className={`reaction-btn ${discussion.userReaction === 'like' ? 'active' : ''}`}
                                    onClick={() => handleReaction(discussion.id, 'like')}
                                >
                                    ❤️ Like <span className="counter">{discussion.likes}</span>
                                </button>
                                <button
                                    className={`reaction-btn ${discussion.userReaction === 'dislike' ? 'active' : ''}`}
                                    onClick={() => handleReaction(discussion.id, 'dislike')}
                                >
                                    👎 Dislike <span className="counter">{discussion.dislikes || 0}</span>
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            <style jsx>{`
                /* Modern and sleek styling */
                .discussions-container {
                    font-family: 'Roboto', sans-serif;
                    background-color: #f4f7fc;
                    max-width: 900px;
                    margin: 30px auto;
                    padding: 25px;
                    border-radius: 15px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                }

                h1 {
                    text-align: center;
                    font-size: 2.4rem;
                    color: #333;
                    margin-bottom: 30px;
                }

                .new-discussion-link {
                    display: inline-block;
                    background-color: #0069d9;
                    color: white;
                    text-align: center;
                    padding: 12px 25px;
                    font-size: 1.2rem;
                    border-radius: 5px;
                    text-decoration: none;
                    margin-bottom: 20px;
                    transition: background-color 0.3s ease, transform 0.2s ease;
                }

                .new-discussion-link:hover {
                    background-color: #0056b3;
                    transform: translateY(-2px);
                }

                .discussion-list {
                    list-style-type: none;
                    padding: 0;
                }

                .discussion-item {
                    margin-bottom: 20px;
                    transition: transform 0.2s ease-in-out;
                }

                .discussion-item:hover {
                    transform: translateY(-5px);
                }

                .discussion-box {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
                    transition: box-shadow 0.3s ease, transform 0.2s ease;
                }

                .discussion-box:hover {
                    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
                    transform: translateY(-3px);
                }

                .discussion-title {
                    font-size: 1.3rem;
                    color: #333;
                    font-weight: bold;
                    text-decoration: none;
                    margin-bottom: 15px;
                    display: block;
                }

                .reaction-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 10px;
                }

                .reaction-btn {
                    background-color: #f4f7fc;
                    border: none;
                    border-radius: 30px;
                    padding: 10px 20px;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                    color: #333;
                }

                .reaction-btn.active {
                    background-color: #28a745;
                    color: white;
                    transform: scale(1.05);
                }

                .reaction-btn:hover {
                    background-color: #e0e0e0;
                    transform: scale(1.1);
                }

                .counter {
                    margin-left: 5px;
                    font-size: 1.2rem;
                    font-weight: bold;
                }
            `}</style>
        </div>
    );
};

export default Discussions;
