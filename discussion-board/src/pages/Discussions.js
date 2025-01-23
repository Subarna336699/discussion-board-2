import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Component to display and manage discussions
const Discussions = () => {
    // State to hold discussions data
    const [discussions, setDiscussions] = useState([]);

    // useEffect hook to initialize discussions data from localStorage
    useEffect(() => {
        // Retrieve discussions from localStorage, or initialize to an empty array
        const storedDiscussions = JSON.parse(localStorage.getItem('discussions')) || [];
        
        // Add a new field `userReaction` to track user's current reaction (like/dislike)
        const updatedDiscussions = storedDiscussions.map(discussion => ({
            ...discussion,
            userReaction: null, // Initialize reaction as null
        }));

        // Update the state with the modified discussions
        setDiscussions(updatedDiscussions);
    }, []); // Dependency array is empty, so this runs only on the initial render

    // Function to handle user reactions (like/dislike)
    const handleReaction = (id, reaction) => {
        // Update the state based on the user's reaction
        setDiscussions(prevDiscussions =>
            prevDiscussions.map(discussion => {
                // Check if the current discussion matches the given id
                if (discussion.id === id) {
                    let updatedLikes = discussion.likes; // Initialize likes
                    let updatedDislikes = discussion.dislikes || 0; // Initialize dislikes

                    // Handle like reaction
                    if (reaction === 'like') {
                        updatedLikes = discussion.userReaction === 'like' ? updatedLikes + 1 : updatedLikes + 1;
                        if (discussion.userReaction === 'dislike') {
                            updatedDislikes--; // Decrease dislike count if user switches reaction
                        }
                        // Toggle the user's reaction to like or null
                        discussion.userReaction = discussion.userReaction === 'like' ? null : 'like';
                    }
                    // Handle dislike reaction
                    else if (reaction === 'dislike') {
                        updatedDislikes = discussion.userReaction === 'dislike' ? updatedDislikes + 1 : updatedDislikes + 1;
                        if (discussion.userReaction === 'like') {
                            updatedLikes--; // Decrease like count if user switches reaction
                        }
                        // Toggle the user's reaction to dislike or null
                        discussion.userReaction = discussion.userReaction === 'dislike' ? null : 'dislike';
                    }

                    // Return the updated discussion object
                    return {
                        ...discussion,
                        likes: updatedLikes,
                        dislikes: updatedDislikes,
                    };
                }
                // Return unmodified discussion if id does not match
                return discussion;
            })
        );
    };

    return (
        <div className="discussions-container">
            {/* Page Header */}
            <h1>Discussions</h1>

            {/* Link to create a new discussion */}
            <Link to="/new-discussion" className="new-discussion-link">➕ Post a New Discussion</Link>

            {/* List of discussions */}
            <ul className="discussion-list">
                {discussions.map(discussion => (
                    <li key={discussion.id} className="discussion-item">
                        <div className="discussion-box">
                            {/* Link to navigate to the discussion details */}
                            <Link to={`/discussion/${discussion.id}`} className="discussion-title">
                                {discussion.title}
                            </Link>

                            {/* Reaction buttons for like and dislike */}
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

            {/* Styling for the component */}
            <style jsx>{`
                /* Container styling for discussions page */
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

                /* Header styling */
                h1 {
                    text-align: center;
                    font-size: 2.4rem;
                    color: #333;
                    margin-bottom: 30px;
                }

                /* Link for creating new discussion */
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

                /* Hover effect for new discussion link */
                .new-discussion-link:hover {
                    background-color: #0056b3;
                    transform: translateY(-2px);
                }

                /* Styling for the discussion list */
                .discussion-list {
                    list-style-type: none;
                    padding: 0;
                }

                /* Individual discussion item styling */
                .discussion-item {
                    margin-bottom: 20px;
                    transition: transform 0.2s ease-in-out;
                }

                .discussion-item:hover {
                    transform: translateY(-5px);
                }

                /* Styling for each discussion box */
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

                /* Discussion title styling */
                .discussion-title {
                    font-size: 1.3rem;
                    color: #333;
                    font-weight: bold;
                    text-decoration: none;
                    margin-bottom: 15px;
                    display: block;
                }

                /* Reaction buttons styling */
                .reaction-buttons {
                    display: flex;
                    justify-content: center;
                    gap: 15px;
                    margin-top: 10px;
                }

                /* Styling for reaction buttons */
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

                /* Styling for active reaction buttons */
                .reaction-btn.active {
                    background-color: #28a745;
                    color: white;
                    transform: scale(1.05);
                }

                .reaction-btn:hover {
                    background-color: #e0e0e0;
                    transform: scale(1.1);
                }

                /* Counter styling for like/dislike counts */
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
