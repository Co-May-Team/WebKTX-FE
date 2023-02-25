import PropTypes from 'prop-types'
import { FaEye } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { Badge, ListGroupItem } from 'reactstrap'
import convertToUrl from '~/utils/commons/convertToUrl'
import randomColor from '~/utils/commons/randomColor'

function MostViewPosts({ listPost }) {
    return (
        <>
            {listPost.map((post) => (
                <ListGroupItem key={post.postId}>
                    <NavLink
                        to={`/${convertToUrl(post.title)}/${post.postId}`}
                        style={{ textAlign: 'justify' }}
                    >
                        <Badge color={randomColor()} className="me-2">
                            {post.category.categoryName}
                        </Badge>
                        {post.title}
                        <Badge color="secondary" className="float-end d-flex">
                        <FaEye className="me-1" />
                        {post.viewed}
                        </Badge>
                    </NavLink>
                </ListGroupItem>
            ))}
        </>
    )
}

MostViewPosts.propTypes = {
    listPost: PropTypes.array.isRequired,
}

export default MostViewPosts