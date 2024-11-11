import { Heading, Progress, useDisclosure, VStack } from "@chakra-ui/react";
import {
  createField,
  Field,
  Form,
  FormLayout,
  SubmitButton,
} from "@saas-ui/react";
import { IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";

const UploadField = createField(IKUpload, {
  isControlled: true,
});

export default function Upload() {
  const [progress, setProgress] =
    useState<ProgressEvent<XMLHttpRequestEventTarget> | null>(null);

  const {
    isOpen: isUploading,
    onOpen: onUploading,
    onClose: onUploaded,
  } = useDisclosure();

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

            <UploadField
              name="file"
              hidden
              accept="video/*"
              ref={uploadRef}
              useUniqueFileName={true}
              customMetadata={{
                Title: form.getValues().title,
                Description: form.getValues().description,
              }}
              folder="/CityJSVideos"
              onUploadProgress={setProgress}
              onUploadStart={() => {
                onUploading();
              }}
              onSuccess={() => {
                onUploaded();
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
            <SubmitButton isLoading={isUploading} loadingText="Uploading...">
              Select File and Upload
            </SubmitButton>
            {progress ? (
              <Progress
                value={progress ? (progress.loaded / progress.total) * 100 : 0}
              />
            ) : null}
          </FormLayout>
        )}
      </Form>
    </VStack>
  );
}
