import { Editor } from "@tinymce/tinymce-react"

const RichTextEditor: React.FC<{
  onChange: (content: string) => void
  value: string | null
}> = ({ onChange, value }) => {
  if (!value) value = ""

  return (
    <Editor
      apiKey="eunl29hhc04gt2orlwnk09pu4ilto10yhzkx4irqsks7u6d5"
      value={value}
      onEditorChange={(content) => onChange(content)}
      init={{
        height: 200,
        menubar: false,
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
