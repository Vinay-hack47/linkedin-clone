import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  
} from "@/components/ui/dialog";
import ProfilePhoto from "./ProfilePhoto";
import { Textarea } from "./ui/textarea";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import { Image } from "lucide-react";
import { createPostAction } from "@/lib/serveractions";


export function PostDialog({
  setOpen,
  open,
  src,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  src: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSeclectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSeclectedFile(dataUrl);
    }
  };

  const changeHandler = (e:React.ChangeEvent<HTMLTextAreaElement>) =>{
    setInputText(e.target.value);

  }

 const postActionHandler = async (formData: FormData) =>{
  const inputText = formData.get("inputText") as string;
  
  try {
    await createPostAction(inputText, selectedFile);
    
  } catch (error) {
    console.log(error);
  }
  setInputText("");
  setOpen(false);
 }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="sm:max-w-[425px] "
      >
        <DialogHeader>
          <DialogTitle className="flex gap-4">
            <ProfilePhoto src={src}></ProfilePhoto>
            <div>
              <h1>Rajput Vinaykumar</h1>
              <p className="text-sm">Post to anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={(formData) =>{
          const promise = postActionHandler(formData);
          toast.promise(promise,{
            loading: "Creating post...",
            success: "Post created successfully",
            error: "Failed to create post"
          })
        }}>
          <div className="flex flex-col">
            <Textarea
              id="name"
              name="inputText"
              value={inputText}
              onChange={changeHandler}
              className="border-none text-lg focus-visible:ring-0"
              placeholder="Type your post here"
            ></Textarea>

            <div className="my-4">
              {selectedFile && (
                <img
                  src={selectedFile}
                  alt="previewImage"
                  width={300}
                  height={300}
                />
              )}
            </div>
          </div>


          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button className="cursor-pointer" type="submit">Post</Button>
            </div>
          </DialogFooter>
        </form>
        <Button className="cursor-pointer" onClick={() => inputRef?.current?.click()} variant={"ghost"}>
          <Image className="text-blue-500"></Image>
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
