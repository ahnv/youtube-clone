import { Button, HStack, Text } from "@chakra-ui/react"
import { FileUpload, FileUploadDropzone, FileUploadTrigger } from "@saas-ui/file-upload"
import { createField } from "@saas-ui/react"
import { forwardRef } from "react"

export const UploadField = createField(
  forwardRef<HTMLInputElement, any>((props, ref) => {
    const { onChange, ...rest } = props
    return (
      <FileUpload
        {...rest}
        onFileChange={({ acceptedFiles }) => {
          onChange?.(acceptedFiles[0])
        }}
        inputRef={ref}
      >
        {({ acceptedFiles, deleteFile }) => (
          <FileUploadDropzone>
            <Text fontSize="sm">Drag your file here</Text>
            {!acceptedFiles?.length ? (
              <FileUploadTrigger as={Button}>Select files</FileUploadTrigger>
            ) : (
              <HStack>
                <Text fontSize="sm">{acceptedFiles[0].name}</Text>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteFile(acceptedFiles[0])
                  }}
                >
                  Clear
                </Button>
              </HStack>
            )}
          </FileUploadDropzone>
        )}
      </FileUpload>
    )
  }),
  {
    isControlled: true,
  }
)