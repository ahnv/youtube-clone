"use client";

import { UploadField } from "@/components/UploadField";
import { Heading, Progress, useDisclosure, VStack } from "@chakra-ui/react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { Field, Form, FormLayout, SubmitButton, SubmitHandler } from "@saas-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface FormValues {
  title: string;
  description: string;
  file: File | null;
}

const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!;

const authenticator = async () => {
  try {
    const response = await fetch("/api/imagekit/auth");

    if (!response.ok) {
      throw new Error("Failed to authenticate with ImageKit");
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to authenticate with ImageKit" };
  }
};

export default function Upload() {
  const [progress, setProgress] = useState<ProgressEvent<EventTarget> | null>(null);

  const { isOpen: isUploading, onOpen: onUploading, onClose: onUploaded } = useDisclosure();

  const router = useRouter();

  const handleUpload: SubmitHandler<FormValues> = async (values) => {
    if (!values.file) {
      return;
    }

    onUploading();

    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      onUploaded();
      alert("Failed to authenticate for upload: " + authError);
      return;
    }

    const { signature, expire, token } = authParams;

    try {
      await upload({
        // Authentication parameters
        expire,
        token,
        signature,
        publicKey,
        file: values.file,
        fileName: values.file.name,
        folder: "/CityJSVideos",
        useUniqueFileName: true,
        customMetadata: {
          Title: values.title,
          Description: values.description,
        },
        transformation: {
          post: [
            {
              type: "abs",
              protocol: "hls",
              value: "sr-240_360_480_720_1080",
            },
          ],
        },
        onProgress: (event) => {
          setProgress(event);
        },
      });
      onUploaded();
      alert("Video uploaded successfully");

      router.push("/");
    } catch (error) {
      if (error instanceof ImageKitAbortError) {
        alert("Upload aborted: " + error.reason);
      } else if (error instanceof ImageKitInvalidRequestError) {
        alert("Invalid request: " + error.message);
      } else if (error instanceof ImageKitUploadNetworkError) {
        alert("Network error: " + error.message);
      } else if (error instanceof ImageKitServerError) {
        alert("Server error: " + error.message);
      } else {
        alert("Upload error: " + error);
      }
      onUploaded();
    }
  };

  return (
    <VStack px="12" py="6">
      <Heading as="h1" size="md" mb="8" textAlign="center">
        Upload new video
      </Heading>
      <Form<unknown, FormValues>
        w="80%"
        defaultValues={{
          title: "",
          description: "",
          file: null,
        }}
        onSubmit={handleUpload}
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

            <UploadField name="file" accept="video/*" maxFiles={1} />

            <SubmitButton isLoading={isUploading} loadingText="Uploading...">
              Upload
            </SubmitButton>
            {progress ? <Progress value={progress ? (progress.loaded / progress.total) * 100 : 0} /> : null}
          </FormLayout>
        )}
      </Form>
    </VStack>
  );
}
