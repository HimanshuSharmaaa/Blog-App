import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

const RTE = ({ name, control, label, defaultValue = "WELCOME TO BLOG APP HERE YOU CAN STORE YOUR MEMORIES." }) => {
  // control in props, comes from react hook form and it is responsible for send all the state of these component to the form , and these contol pass from the RTE. 
  return (
    <div>
      {label && <label>{label}</label>}
      <Controller
        name={name || "content"}
        // jo bhi parent element esko call krega yeh control dega
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="tshrtoosjlcnxa76t88k1flbxoldyeqdc6m2q6pzch67g6p7"
            initialValue={defaultValue}
            init={{
              initialValue: defaultValue,
              branding: false,
              height: 500,
              menubar: true,
              plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | image | bold italic forecolor |  alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
              content_style:
                "body {font-family : Helvetica , Arial , sans-serif ; font-size : 14px;}",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
};

export default RTE;