/* eslint-disable react-hooks/exhaustive-deps */
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import React, { useEffect, useRef, useState } from 'react'

const QuillEditor = (props) => {
    const editorRef = useRef(null)
    const quillRef = useRef(null)

    useEffect(() => {
        const handleChange = () => {
            props.handleEditorChange(quillRef.current.root.innerHTML)
        }
        quillRef.current = new Quill(editorRef.current, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [
                        { list: 'ordered' },
                        { list: 'bullet' },
                        { indent: '-1' },
                        { indent: '+1' },
                    ],
                    ['link', 'image', 'video'],
                    [{ color: [] }, { background: [] }],
                    [{ font: [] }],
                    [{ align: [] }],
                    ['clean'],
                ],
            },
            placeholder: 'Nhập nội dung tại đây...',
            formats: [
                'header',
                'bold',
                'italic',
                'underline',
                'strike',
                'blockquote',
                'list',
                'bullet',
                'indent',
                'link',
                'image',
                'video',
                'color',
                'background',
                'font',
                'align',
                'clean',
            ],
        })
        quillRef.current.root.innerHTML = props.content
        quillRef.current.on('text-change', handleChange)
        return () => {
            quillRef.current.off('text-change', handleChange)
        }
    }, [])
    useEffect(() => {
        if (quillRef.current) {
            quillRef.current.root.innerHTML = props.content
        }
    }, [props.content])
    return <div ref={editorRef} />
}

export default QuillEditor
