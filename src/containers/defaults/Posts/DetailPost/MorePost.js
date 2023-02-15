import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Badge, ListGroupItem } from 'reactstrap'
import randomColor from '~/utils/commons/randomColor'

function MorePost({ listPost }) {
    return (
        <>
            {listPost.map((post) => (
                <ListGroupItem key={post.postId}>
                    <NavLink
                        to={`/post/${post.postId}`}
                        style={{ textAlign: 'justify' }}
                    >
                        <Badge color={randomColor()} className="me-2">
                            {post.category.categoryName}
                        </Badge>
                        {post.title}
                    </NavLink>
                </ListGroupItem>
            ))}
        </>
    )
}

MorePost.propTypes = {
    listPost: PropTypes.array.isRequired,
}

export default MorePost
