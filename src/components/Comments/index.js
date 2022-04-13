import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// Write your code here
class Comments extends Component {
  state = {
    commentList: [],
    nameInput: '',
    commentInput: '',
  }

  onAddComment = event => {
    event.preventDefault()
    const {nameInput, commentInput} = this.state
    const nameInitialBackgroundClassName =
      initialContainerBackgroundClassNames[
        Math.floor(Math.random() * initialContainerBackgroundClassNames.length)
      ]
    const newComment = {
      id: uuidv4(),
      name: nameInput,
      comment: commentInput,
      date: new Date(),
      isLiked: false,
      nameInitialClassName: nameInitialBackgroundClassName,
    }

    this.setState(prevStat => ({
      commentList: [...prevStat.commentList, newComment],
      nameInput: '',
      commentInput: '',
    }))
  }

  renderCommentList = commentList =>
    commentList.map(eachObject => (
      <CommentItem
        onToggleLike={this.onToggleLike}
        onDeleteComment={this.onDeleteComment}
        key={eachObject.id}
        commentDetails={eachObject}
      />
    ))

  onChangeNameInput = event => {
    this.setState({nameInput: event.target.value})
  }

  onChangeCommentInput = event =>
    this.setState({commentInput: event.target.value})

  onToggleLike = id => {
    this.setState(prevStat => ({
      commentList: prevStat.commentList.map(eachObject => {
        const {isLiked} = eachObject
        if (id === eachObject.id) {
          return {...eachObject, isLiked: !isLiked}
        }
        return eachObject
      }),
    }))
  }

  onDeleteComment = id => {
    this.setState(prevStat => ({
      commentList: prevStat.commentList.filter(
        eachObject => eachObject.id !== id,
      ),
    }))
  }

  render() {
    const {nameInput, commentInput, commentList} = this.state
    const commentsCount = commentList.length

    return (
      <div className="app-container">
        <div className="comments-container">
          <h1 className="app-heading">Comments</h1>

          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description">
                Say something about 4.0 Technologies
              </p>
              <input
                className="name-input"
                onChange={this.onChangeNameInput}
                value={nameInput}
                type="text"
                placeholder="Your Name"
              />
              <textarea
                className="comment-input"
                onChange={this.onChangeCommentInput}
                value={commentInput}
                placeholder="Your Comment"
                rows="6"
              />
              <button className="add-button" type="submit">
                Add Comment
              </button>
            </form>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentsCount}</span>Comments
          </p>
          <ul className="comments-list">
            {this.renderCommentList(commentList)}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
