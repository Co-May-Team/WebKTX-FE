function isSaved(postInfo) {
  const savedPosts = JSON.parse(localStorage.getItem("savedPosts"))
  return savedPosts?.find((savedPost) => savedPost?.postId === postInfo?.postId)
}
function toggleSavePost(postInfo) {
  if (isSaved(postInfo)) {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts"))
    localStorage.setItem(
      "savedPosts",
      JSON.stringify(
        savedPosts.filter((savedPost) => savedPost.postId !== postInfo.postId)
      )
    )
  } else {
    if (JSON.parse(localStorage.getItem("savedPosts")) === null) {
      localStorage.setItem("savedPosts", JSON.stringify([]))
    }
    localStorage.setItem(
      "savedPosts",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("savedPosts")),
        { ...postInfo, savedAt: new Date() },
      ])
    )
  }
}

export { isSaved, toggleSavePost }
