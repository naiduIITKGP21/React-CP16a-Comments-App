import {formatDistanceToNow} from 'date-fns'
import './index.css'

// Write your code here

const CommentItem = props => {
  const {commentDetails, onToggleLike, onDeleteComment} = props
  const {
    id,
    name,
    comment,
    isLiked,
    date,
    nameInitialClassName,
  } = commentDetails
  const initial = name[0].toUpperCase()
  const likeImage = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const postedTime = formatDistanceToNow(date)
  const likeTextClassName = isLiked ? 'button active' : 'button'

  const onClickLikeButton = () => {
    onToggleLike(id)
  }

  const onClickDeleteButton = () => {
    onDeleteComment(id)
  }

  return (
    <li className="comment-item">
      <div className="comment-container">
        <div className={`initial-container ${nameInitialClassName}`}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="username-time-container">
            <p className="username">{name}</p>
            <p className="time">{postedTime} ago</p>
          </div>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="buttons-container">
        <div className="like-container">
          <img className="like-image" alt="like" src={likeImage} />
          <button
            className={likeTextClassName}
            onClick={onClickLikeButton}
            type="button"
          >
            like
          </button>
        </div>
        <button
          className="button"
          type="button"
          onClick={onClickDeleteButton}
          testid="delete"
        >
          <img
            alt="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
