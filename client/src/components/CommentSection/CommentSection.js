import "./CommentSection.scss";

function CommentSection({ comments, users, isLoggedIn }) {
  console.log("isLoggedIn", isLoggedIn);

  if (!comments || comments.length === 0) {
    return <p>No comments available.</p>;
  }

  if (!users) {
    return <p>Cannot fetch users.</p>;
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
        {isLoggedIn ? (
          <section className="comment-container__section">
            <form className="comment-container__form">
              <div className="comment-container__form-container">
                <h2 className="comment-container__form-heading">
                  WE'D LOVE TO HEAR YOUR THOUGHTS!
                </h2>
                <input
                  className="comment-container__form-input"
                  name="title"
                  placeholder="Comment title"
                ></input>
                <textarea
                  className="comment-container__form-textarea"
                  name="comment"
                  placeholder="Leave a comment"
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
          {comments.map((comment) => {
            const user = users.find((user) => user.id === comment.user_id);
            if (!user) {
              console.error(
                `User not found for comment with user_id: ${comment.user_id}`
              );
              return null;
            }

            return (
              <div className="comment-section__container" key={comment.id}>
                <h4 className="comment-section__details-title">
                  {comment.title}
                </h4>
                <div className="comment-section__details">
                  {/* i sometimes get an error - Cannot read properties of undefined (reading "name"); doesn't always happen */}
                  <p className="comment-section__details-name">
                    {user.name || "Unknown User"}
                  </p>
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
