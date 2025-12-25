

// import Highlight from '@tiptap/extension-highlight'
// import TextAlign from '@tiptap/extension-text-align'
// import { EditorContent, useEditor } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { Heading1, Heading2 } from 'lucide'
// import { Toggle } from './Toggle'


// const MenuBar = ({ editor }) => {
//   if (!editor) {
//     return null
//   }

//   const Options = [
//     {
//         icon: <Heading1 className = "size-4"/>,
//         onClick: ()=> editor.chain().focus().toggleHeading({ level: 1 }).run(),
//         preesed: editor.isActive('heading', { level: 1 }),
//     },
//     {
//         icon: <Heading2 className = "size-4"/>,
//         onClick: ()=> editor.chain().focus().toggleHeading({ level: 2 }).run(), 
//         preesed: editor.isActive('heading', { level: 2 }),
//     }
//   ]
//   return (
//     <div className="control-group">
//       <div className="button-group border rounded-md m-5 space-x-1">
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={editor.isActive('heading', { level: 1 }) ? 'is-active p-1' : 'p-1'}>
//           H1
//         </button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}>
//           H2
//         </button>
//         <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}>
//           H3
//         </button>
//         <button onClick={() => editor.chain().focus().setParagraph().run()} className={editor.isActive('paragraph') ? 'is-active' : ''}>
//           Paragraph
//         </button>
//         <button onClick={() => editor.chain().focus().toggleBold().run()} className={editor.isActive('bold') ? 'is-active' : ''}>
//           Bold
//         </button>
//         <button onClick={() => editor.chain().focus().toggleItalic().run()} className={editor.isActive('italic') ? 'is-active' : ''}>
//           Italic
//         </button>
//         <button onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? 'is-active' : ''}>
//           Strike
//         </button>
//         <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={editor.isActive('highlight') ? 'is-active' : ''}>
//           Highlight
//         </button>
//         <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}>
//           Left
//         </button>
//         <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''}>
//           Center
//         </button>
//         <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}>
//           Right
//         </button>
//         <button onClick={() => editor.chain().focus().setTextAlign('justify').run()} className={editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''}>
//           Justify
//         </button>
//       </div>
//       {/* {
//         Options.map((option,index)=> (
//             <Toggle key={index}>{option.icon}</Toggle>
//         ))
//       } */}
//     </div>
//   )
// }

// // export default () => {
// //   const editor = useEditor({
// //     extensions: [
// //       StarterKit,
// //       TextAlign.configure({
// //         types: ['heading', 'paragraph'],
// //       }),
// //       Highlight,
// //     ],
// //     content: `
// //       <h3 style="text-align:center">
// //         Devs Just Want to Have Fun by Cyndi Lauper
// //       </h3>
// //       <p style="text-align:center">
// //         I come home in the morning light<br>
// //         My mother says, <mark>“When you gonna live your life right?”</mark><br>
// //         Oh mother dear we’re not the fortunate ones<br>
// //         And devs, they wanna have fun<br>
// //         Oh devs just want to have fun</p>
// //       <p style="text-align:center">
// //         The phone rings in the middle of the night<br>
// //         My father yells, "What you gonna do with your life?"<br>
// //         Oh daddy dear, you know you’re still number one<br>
// //         But <s>girls</s>devs, they wanna have fun<br>
// //         Oh devs just want to have
// //       </p>
// //       <p style="text-align:center">
// //         That’s all they really want<br>
// //         Some fun<br>
// //         When the working day is done<br>
// //         Oh devs, they wanna have fun<br>
// //         Oh devs just wanna have fun<br>
// //         (devs, they wanna, wanna have fun, devs wanna have)
// //       </p>
// //     `,
// //   })

// //   return (
// //     <>
// //       <MenuBar editor={editor} />
// //       <EditorContent editor={editor} />
// //     </>
// //   )
// // }
// export default MenuBar;

import {
    RiBold,
    RiItalic,
    RiStrikethrough,
    RiCodeSSlashLine,
    RiListOrdered2,
  } from "react-icons/ri";
  import { Editor } from "@tiptap/react";
  import { AiOutlineRedo, AiOutlineUndo } from "react-icons/ai";
  import { BsTypeUnderline } from "react-icons/bs";
  import { IoListOutline } from "react-icons/io5";


  const Button = ({
    onClick,
    isActive,
    disabled,
    children,
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`p-2 ${isActive ? "bg-violet-500 text-white rounded-md" : ""}`}
    >
      {children}
    </button>
  );

  export default function MenuBar({
    editor,
  }) {
    if (!editor) return null;
  
    let TextTypographyButtons = [
      {
        icon: <RiBold className="size-5" />,
        onClick: () => editor.chain().focus().toggleBold().run(),
        isActive: editor.isActive("bold"),
      },
      {
        icon: <BsTypeUnderline className="size-5" />,
        onClick: () => editor.chain().focus().toggleUnderline().run(),
        isActive: editor.isActive("underline"),
      },
      {
        icon: <RiItalic className="size-5" />,
        onClick: () => editor.chain().focus().toggleItalic().run(),
        isActive: editor.isActive("italic"),
        disabled: !editor.can().chain().focus().toggleItalic().run(),
      },
      {
        icon: <RiStrikethrough className="size-5" />,
        onClick: () => editor.chain().focus().toggleStrike().run(),
        isActive: editor.isActive("strike"),
        disabled: !editor.can().chain().focus().toggleStrike().run(),
      },
      // {
      //   icon: <RiCodeSSlashLine className="size-5" />,
      //   onClick: () => editor.chain().focus().toggleCode().run(),
      //   isActive: editor.isActive("code"),
      //   disabled: !editor.can().chain().focus().toggleCode().run(),
      // },
      {
        icon: <IoListOutline className="size-5" />,
        onClick: () => editor.chain().focus().toggleBulletList().run(),
        isActive: editor.isActive("bulletList"),
      },
      {
        icon: <RiListOrdered2 className="size-5" />,
        onClick: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: editor.isActive("orderedList"),
        disabled: !editor.can().chain().focus().toggleOrderedList().run(),
      },
    ];

    const UndoAndRedoActions = [
      {
        icon: <AiOutlineUndo className="size-5" />,
        onClick: () => editor.chain().focus().undo().run(),
        isActive: editor.isActive("undo"),
        disabled: !editor.can().chain().focus().undo().run(),
      },
      {
        icon: <AiOutlineRedo className="size-5" />,
        onClick: () => editor.chain().focus().redo().run(),
        isActive: editor.isActive("redo"),
        disabled: !editor.can().chain().focus().redo().run(),
      },
    ]

    const CodingButtons = [
      {
        icon: <RiCodeSSlashLine className="size-5" />,
        onClick: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: editor.isActive("codeBlock"),
        disabled: !editor.can().chain().focus().toggleCodeBlock().run(),
      },
    ]
    const buttons = [ ...TextTypographyButtons, ...CodingButtons ,...UndoAndRedoActions ];

    return (
      <div className="border rounded-md my-5 ">
        <div className="mb-2 flex space-x-2">
        {buttons.map(({ icon, onClick, isActive, disabled }, index) => (
          <Button
            key={index}
            onClick={onClick}
            isActive={isActive}
            disabled={disabled}
          >
            {icon}
          </Button>
        ))}
      </div>
      </div>
      
    );
  }
  