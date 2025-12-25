import './styles.css'

// import { Color } from '@tiptap/extension-color'
// import ListItem from '@tiptap/extension-list-item'
// import TextStyle from '@tiptap/extension-text-style'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'

// // eslint-disable-next-line react/prop-types
// const MenuBar = ({ editor }) => {
//     if (!editor) {
//         return null
//     }

//     return (
//         <>
//             <button
//                 onClick={() => editor.chain().focus().toggleBold().run()}
//                 disabled={
//                     !editor.can()
//                         .chain()
//                         .focus()
//                         .toggleBold()
//                         .run()
//                 }
//                 className={editor.isActive('bold') ? 'is-active' : ''}
//             >
//                 bold
//             </button>
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleItalic().run()}*/}
//             {/*    disabled={*/}
//             {/*        !editor.can()*/}
//             {/*            .chain()*/}
//             {/*            .focus()*/}
//             {/*            .toggleItalic()*/}
//             {/*            .run()*/}
//             {/*    }*/}
//             {/*    className={editor.isActive('italic') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    italic*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleStrike().run()}*/}
//             {/*    disabled={*/}
//             {/*        !editor.can()*/}
//             {/*            .chain()*/}
//             {/*            .focus()*/}
//             {/*            .toggleStrike()*/}
//             {/*            .run()*/}
//             {/*    }*/}
//             {/*    className={editor.isActive('strike') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    strike*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleCode().run()}*/}
//             {/*    disabled={*/}
//             {/*        !editor.can()*/}
//             {/*            .chain()*/}
//             {/*            .focus()*/}
//             {/*            .toggleCode()*/}
//             {/*            .run()*/}
//             {/*    }*/}
//             {/*    className={editor.isActive('code') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    code*/}
//             {/*</button>*/}
//             {/*<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>*/}
//             {/*    clear marks*/}
//             {/*</button>*/}
//             {/*<button onClick={() => editor.chain().focus().clearNodes().run()}>*/}
//             {/*    clear nodes*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().setParagraph().run()}*/}
//             {/*    className={editor.isActive('paragraph') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    paragraph*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}*/}
//             {/*    className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    h1*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}*/}
//             {/*    className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    h2*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}*/}
//             {/*    className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    h3*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}*/}
//             {/*    className={editor.isActive('heading', { level: 4 }) ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    h4*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}*/}
//             {/*    className={editor.isActive('heading', { level: 5 }) ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    h5*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}*/}
//             {/*    className={editor.isActive('heading', { level: 6 }) ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    h6*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleBulletList().run()}*/}
//             {/*    className={editor.isActive('bulletList') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    bullet list*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleOrderedList().run()}*/}
//             {/*    className={editor.isActive('orderedList') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    ordered list*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleCodeBlock().run()}*/}
//             {/*    className={editor.isActive('codeBlock') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    code block*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().toggleBlockquote().run()}*/}
//             {/*    className={editor.isActive('blockquote') ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    blockquote*/}
//             {/*</button>*/}
//             {/*<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>*/}
//             {/*    horizontal rule*/}
//             {/*</button>*/}
//             {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
//             {/*    hard break*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().undo().run()}*/}
//             {/*    disabled={*/}
//             {/*        !editor.can()*/}
//             {/*            .chain()*/}
//             {/*            .focus()*/}
//             {/*            .undo()*/}
//             {/*            .run()*/}
//             {/*    }*/}
//             {/*>*/}
//             {/*    undo*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().redo().run()}*/}
//             {/*    disabled={*/}
//             {/*        !editor.can()*/}
//             {/*            .chain()*/}
//             {/*            .focus()*/}
//             {/*            .redo()*/}
//             {/*            .run()*/}
//             {/*    }*/}
//             {/*>*/}
//             {/*    redo*/}
//             {/*</button>*/}
//             {/*<button*/}
//             {/*    onClick={() => editor.chain().focus().setColor('#958DF1').run()}*/}
//             {/*    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}*/}
//             {/*>*/}
//             {/*    purple*/}
//             {/*</button>*/}
//         </>
//     )
// }

// const Tiptap = () => {
//     const editor = useEditor({
//         extensions: [
//             Color.configure({ types: [TextStyle.name, ListItem.name] }),
//             TextStyle.configure({ types: [ListItem.name] }),
//             StarterKit.configure({
//                 bulletList: {
//                     keepMarks: true,
//                     keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//                 },
//                 orderedList: {
//                     keepMarks: true,
//                     keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
//                 },
//             }),
//         ],
//         content: `
//       <h2>
//         Hi there,
//       </h2>
//       <p>
//         this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
//       </p>
//       <ul>
//         <li>
//           That’s a bullet list with one …
//         </li>
//         <li>
//           … or two list items.
//         </li>
//       </ul>
//       <p>
//         Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
//       </p>
//       <pre><code class="language-css">body {
//   display: none;
// }</code></pre>
//       <p>
//         I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
//       </p>
//       <blockquote>
//         Wow, that’s amazing. Good work, boy! 👏
//         <br />
//         — Mom
//       </blockquote>
//     `,
//     })
//     const publishBlog = ()=>{
//         const data = editor.getHTML()
//         console.log({data})
//     }
//     return (
//         <div className="rich-text-editor">
//             <MenuBar editor={editor} />
//             <EditorContent editor={editor} />
//             <button onClick={publishBlog}> Publish </button>
//         </div>
//     )
// }
// export default  Tiptap

import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import BulletList from '@tiptap/extension-bullet-list'
import ListItem from '@tiptap/extension-list-item'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import MenuBar from './MenuBar'
import Underline from '@tiptap/extension-underline'
import CodeBlock from '@tiptap/extension-code-block'
import Placeholder from '@tiptap/extension-placeholder'
import Bold from '@tiptap/extension-bold'

const RichTextEditor = ( { initialContent, setInitialContent, doesShowMenuBar = true, height = "min-h-[100px]" }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          // keepMarks: true,
          // keepAttributes: false, // TODO: Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
          HTMLAttributes:{
            class: 'list-disc pl-5',
            itemTypeName: 'listItem'
          }
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false, // TODO: Making this as `false` because marks are not preserved when I try to preserve attrs, awaiting a bit of help
          HTMLAttributes:{
            class: 'list-decimal pl-5',
            itemTypeName: 'listItem'
          }
        },
        codeBlock: {
          HTMLAttributes: {
            class: 'bg-gray-800 text-white p-4 rounded-md overflow-x-auto min-w-full',
          },
          // languageClassPrefix: 'language-go',
          // defaultLanguage: 'plaintext',
        },
        // bold: {
        //   HTMLAttributes: {
        //     class: 'font-bold'
        //   }
        // }
      }),
      // TextAlign.configure({
      //   types: ['heading', 'paragraph'],
      // }),
      Highlight,
      Underline.configure({
        HTMLAttributes: {
          class: 'underline decoration-2 decoration-[#64E09A] underline-offset-4',
        },
      }),
      // CodeBlock.configure({
      //   HTMLAttributes: {
      //     class: 'bg-gray-800 text-white p-4 rounded-md overflow-x-auto',
      //   },
      //   languageClassPrefix: 'language-go',
      //   defaultLanguage: 'plaintext',
      // }),
      Placeholder.configure({
        placeholder: "Short Preview Of Your content"
      }),
      Bold.configure({
        HTMLAttributes: {
          class: 'font-bold text-[#00DF9A]'
        }
      })

    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: `${[height]} cursor-text rounded-md border p-5 ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 `,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      // console.log('HTML : Editor content updated:', html)
      // const json  = editor.getJSON()
      // console.log('JSON : Editor content updated:', json)
      setInitialContent(html)
    },
  })

  // editor.commands.setCodeBlock({ language: 'go' })

  useEffect(() => {
    return () => editor?.destroy()
  }, [editor])


  return (
    <div className="w-full  mx-auto">
      { doesShowMenuBar ? <MenuBar editor={editor} /> : null }
      <div className="min-h-[150px]">
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}

export default RichTextEditor
