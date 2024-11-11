import { Heading, Input, VStack } from "@chakra-ui/react";
import { Field, Form, FormLayout, SubmitButton } from "@saas-ui/react";
import { useRef } from "react";

export default function Upload() {
  const uploadRef = useRef<HTMLInputElement>(null);

  return (
    <VStack px="12" py="6">
      <Heading as="h1" size="md" mb="8" textAlign="center">
        Upload new video
      </Heading>
      <Form
        w="80%"
        defaultValues={{
          title: "",
          description: "",
        }}
        onSubmit={async () => {
          uploadRef.current?.click();
        }}
      >
        {(form) => (
          <FormLayout>
            <Field
              name="title"
              label="Title"
              type="text"
              placeholder="Title of your video"
              rules={{ required: true }}
            />

            <Field
              name="description"
              type="textarea"
              label="Description"
              placeholder="Description of your video"
              rules={{
                required: true,
              }}
            />

            <Input
              type="file"
              name="file"
              hidden
              accept="video/*"
              ref={uploadRef}
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  alert(
                    JSON.stringify(
                      {
                        title: "This file is ready to be uploaded",
                        uploadDate: {
                          title: form.getValues().title,
                          description: form.getValues().description,
                          file: `File: ${file.name} (${file.size} bytes) [${file.type}]`,
                        },
                      },
                      null,
                      2
                    )
                  );
                }
              }}
              transformation={{
                post: [
                  {
                    type: "abs",
                    protocol: "hls",
                    value: "sr-240_360_480_720_1080",
                  },
                ],
              }}
            />
            <SubmitButton loadingText="Uploading...">
              Select File and Upload
            </SubmitButton>
          </FormLayout>
        )}
      </Form>
    </VStack>
  );
}
