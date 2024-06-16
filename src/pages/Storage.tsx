import { AiFillPlusCircle } from "react-icons/ai"
import Button from "../components/ui/Button"
import EmptyState from "../components/EmptyState";
import TitleLoader from "../components/loaders/TitleLoader";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsCreateFileModalOpen } from "../store/slices/modalSlice";
import { useGetUserFilesQuery } from "../store/services/getItems";
import { RootState } from "../store/store";
import ItemLoader from "../components/loaders/ItemLoader";
import FileItem from "../components/FileItem";
import { BiSolidDownArrow } from "react-icons/bi";
import { useState } from "react";
import { sortUserFiles } from "../helpers/func/sortFunc/sortUserFiles";


const Storage = () => {
  const [filterMethod, setFilterMethod] = useState("")
  const [isDesc, setIsDesc] = useState(true)

  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user)
  const userId = user?._id ? user._id : ""
  const { data: files, isLoading } = useGetUserFilesQuery(userId)

  const sortedFiles = sortUserFiles(files, isDesc, filterMethod)

  return (
    <>
      <div className='flex items-center justify-between mb-5 md:mb-8'>
        <h2 className='text-2xl md:text-3xl font-bold'>My Storage</h2>
        {files?.length === 0 ? <Button
          bgColor='bg-transparent'
          color='text-primary'
          className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg'
          onClick={() => dispatch(setIsCreateFileModalOpen(true))}
        >
          <AiFillPlusCircle size={24} className="text-primary" />
          <p className="hidden sm:block">New PDF File</p>
        </Button> : null}
      </div>
      {(files?.length !== 0) ? <div className="flex-1 flex flex-col">
        <h5 className='text-content mb-3'>
          {(isLoading || !files) ? (<TitleLoader />) : `PDF Files (${(files.length)})`}
        </h5>
        <div className='bg-white rounded-t-lg pt-3 flex-1'>
          <div className='flex justify-between gap-4 items-center px-4 pb-3'>
            {(isLoading || !files) ? (<TitleLoader />) : <h4 className="text-base sm:text-lg font-semibold text-primary">
              My Storage
            </h4>}
            <Button
              bgColor='bg-transparent'
              color='text-primary'
              className='flex items-center gap-2 hover:bg-content/10 border-none py-1 px-2 rounded-lg text-sm'
              onClick={() => dispatch(setIsCreateFileModalOpen(true))}
            >
              <AiFillPlusCircle size={20} className="text-primary" />
              <p className="hidden sm:block">New PDF file</p>
            </Button>

          </div>
          {(isLoading || !files) ? (<div className='flex flex-col gap-5 px-2 sm:px-4 mt-4'>
            {[...new Array(5)].map((_, i) => (
              <ItemLoader key={i} />
            ))}
          </div>) : <div className='flex flex-col'>
            <div className="flex items-center px-5 py-3 justify-between">
              <div className='text-content/70 basis-8/12'>
                <button className="w-fit items-center flex gap-2 group" onClick={() => {
                  setFilterMethod("Title")
                  setIsDesc(!isDesc)
                }}
                >
                  <p className="group-hover:text-primary transition">Title</p>
                  <BiSolidDownArrow size={14} className="text-content/70 group-hover:text-primary transition"
                  />
                </button>
              </div>
              <div className='text-content/70 hidden sm:block basis-2/12'>
                <button className="w-fit items-center flex gap-2 group" onClick={() => {
                  setFilterMethod("Uploaded At")
                  setIsDesc(!isDesc)
                }}
                >
                  <p className="group-hover:text-primary transition">Uploaded At</p>
                  <BiSolidDownArrow size={14} className="text-content/70 group-hover:text-primary transition"
                  />
                </button>
              </div>
              <p className='text-content/70 basis-2/12 text-right'>
                Actions
              </p>
            </div>
            {sortedFiles.map((file, i) => (
              <FileItem
                key={file._id}
                file={file}
                i={i}
              />
            ))}
          </div>}
        </div>
      </div> : <EmptyState
        title="You don't have any PDF files yet"
        buttonText='Create new PDF file'
        onClick={() => dispatch(setIsCreateFileModalOpen(true))}
      />}
    </>
  )
}

export default Storage

