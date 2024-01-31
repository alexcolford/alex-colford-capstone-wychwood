import "./CommentSection.scss";

function CommentSection({ comments, users }) {
  if (!users) {
    return <p>Loading users...</p>;
  }

  if (!comments || comments.length === 0) {
    return <p>No comments available.</p>;
  }

  const formattedTimestamp = (created_at) => {
    const date = new Date(created_at);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <>
      <section className="comment-container">
        <h2 className="comment-container__title">{comments.length} Comments</h2>
        <section className="comment-container__section">
          <form className="comment-container__form">
            <div className="comment-container__form-container">
              <label
                className="comment-container__form-label"
                htmlFor="comment"
              >
                WE'D LOVE TO HEAR YOUR THOUGHTS!
              </label>
              <textarea
                className="comment-container__form-textarea"
                name="comment"
                placeholder="Leave a comment"
              ></textarea>
            </div>
            <button className="comment-container__form-button">
              LEAVE A COMMENT
            </button>
          </form>
        </section>
        <section className="comment-section">
          {comments.map((comment) => {
            const user = users.find((user) => user.id === comment.user_id);

            return (
              <div className="comment-section__container" key={comment.id}>
                <h4 className="comment-section__details-title">
                  {comment.title}
                </h4>
                <div className="comment-section__details">
                  <p className="comment-section__details-name">{user.name}</p>
                  <p className="comment-section__details-timestamp">
                    {formattedTimestamp(comment.created_at)}
                  </p>
                </div>
                <div className="comment-section__details-content">
                  {comment.comment}
                </div>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
}

export default CommentSection;