import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CommentSection.scss";

function CommentSection({ isLoggedIn, loggedInUser }) {
  const id = useParams().id;
  const [commentData, setCommentData] = useState({
    title: "",
    comment: "",
  });
  const [comments, setComments] = useState(null);
  const [users, setUsers] = useState(null);

  const getComments = async (commentId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/products/${id}/comments`,
        { data: { id: commentId } }
      );

      setComments(response.data);
    } catch (error) {
      console.log("Error getting comments", error);
    }
  };

  useEffect(() => {
    getComments();
  }, [id]);

  const onDeleteButtonClicked = async (commentId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/products/${id}/comments`,
        { data: { id: commentId } }
      );

      getComments();
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/users`
      );

      setUsers(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (!comments || !users) {
    return <p>Loading...</p>;
  }

  const formattedTimestamp = (created_at) => {
    const date = new Date(created_at);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleInputChange = (event) => {
    setCommentData({
      ...commentData,
      [event.target.name]: event.target.value,
    });
  };

  let comment = {
    product_id: id,
    user_id: loggedInUser,
    title: commentData.title,
    comment: commentData.comment,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (commentData.title === "" || commentData.comment === "") {
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/products/${id}/comments`,
        comment
      );

      setComments((prevComments) => [...prevComments, response.data]);

      setCommentData({
        title: "",
        comment: "",
      });

      getComments();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <>
      <section className="comment-container">
        <h2 className="comment-container__title">{comments.length} Comments</h2>
        {isLoggedIn ? (
          <section className="comment-container__section">
            <form className="comment-container__form" onSubmit={handleSubmit}>
              <div className="comment-container__form-container">
                <h2 className="comment-container__form-heading">
                  WE'D LOVE TO HEAR YOUR THOUGHTS!
                </h2>
                <input
                  className="comment-container__form-input"
                  name="title"
                  placeholder="Comment title"
                  value={commentData.title}
                  onChange={handleInputChange}
                ></input>
                <textarea
                  className="comment-container__form-textarea"
                  name="comment"
                  placeholder="Leave a comment"
                  value={commentData.comment}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <button className="comment-container__form-button">
                Leave a Comment
              </button>
            </form>
          </section>
        ) : (
          ""
        )}
        <section className="comment-section">
          {comments
            .slice(0)
            .reverse()
            .map((comment) => {
              const user =
                comment.user_id !== undefined
                  ? users.find((user) => user.id === comment.user_id)
                  : null;

              return (
                <div className="comment-section__container" key={comment.id}>
                  <h4 className="comment-section__details-title">
                    {comment.title}
                  </h4>

                  <div className="comment-section__details">
                    <p className="comment-section__details-name">
                      {user ? user.name || "Unknown User" : "Loading..."}
                    </p>
                    <p className="comment-section__details-timestamp">
                      {formattedTimestamp(comment.created_at)}
                    </p>
                  </div>
                  <div className="comment-section__details-content">
                    {comment.comment}
                  </div>
                  {isLoggedIn ? (
                    <button
                      className="comment-section__details-button"
                      onClick={() => onDeleteButtonClicked(comment.id)}
                    >
                      delete comment
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
        </section>
      </section>
    </>
  );
}

export default CommentSection;
