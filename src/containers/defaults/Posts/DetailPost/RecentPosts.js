import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import { Badge, ListGroupItem } from 'reactstrap'
import convertToUrl from '~/utils/commons/convertToUrl'
import randomColor from '~/utils/commons/randomColor'

function RecentPosts({ listPost }) {
    return (
        <>
            {listPost?.map((post) => (
                <ListGroupItem key={post.postId}>
                    <NavLink
                        to={`/${convertToUrl(post.title)}/${post.postId}`}
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

RecentPosts.propTypes = {
    listPost: PropTypes.array.isRequired,
}

export default RecentPosts