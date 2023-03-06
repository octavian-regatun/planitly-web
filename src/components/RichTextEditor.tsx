import { Editor } from "@tinymce/tinymce-react"
import { useRef } from "react"

const RichTextEditor: React.FC<{
  onChange: (content: string) => void
  value: string
}> = ({ onChange, value }) => {
  if (!value) value = ""

  return (
    <Editor
      apiKey="eunl29hhc04gt2orlwnk09pu4ilto10yhzkx4irqsks7u6d5"
      // ref={editorRef}
      value={value}
      onEditorChange={(content) => onChange(content)}
      // onInit={(evt, editor: unknown) => (editorRef.current = editor)}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code help wordcount",
        ],
        toolbar:
          "undo redo | formatselect | " +
          "bold italic backcolor | alignleft aligncenter " +
          "alignright alignjustify | bullist numlist outdent indent | " +
          "removeformat | help",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  )
}

export default RichTextEditor
