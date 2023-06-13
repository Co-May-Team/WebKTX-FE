/* eslint-disable react-hooks/exhaustive-deps */
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "super" }, { script: "sub" }],
    [{ align: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
  history: {
    delay: 1000,
    maxStack: 50,
    userOnly: false,
  },
}

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic", 
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "background",
  "code-block",
  "code",
  "script",
  "align",
  "direction",
]
export default function QuillEditor({ content, onChange, ...props }) {
  return (
    <ReactQuill
      defaultValue={content}
      placeholder='Nhập nội dung bài viết...'
      onChange={onChange}
      modules={modules}
      formats={formats}
      {...props}
    />
  )
}
