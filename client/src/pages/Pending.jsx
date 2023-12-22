import { MdEdit } from "react-icons/md";
import { useDeleteNoteMutation, useGetPendingNotesQuery } from "../context/redux/slices/NoteSlices"
import moment from "moment"
import { TiDelete } from "react-icons/ti";
import toast from "react-hot-toast";
const Pending = () => {
  const { data: Notes = [] } = useGetPendingNotesQuery();
  console.log(Notes);
  const [deleteNote] = useDeleteNoteMutation();
  const notes = Notes?.getNotes || [];
  const handleDates = (date) => {
    const formatDate = moment(date).format('YYYY-MM-DD');
    return formatDate
  }
  const handleDeleteNote = (id) => {
    if (confirm('Are you sure you want to delete')) {
      deleteNote(id)
        .then((res) => {
          const status = res.data.status;
          const message = res.data.message
          if (status) {
            toast.success(message);
          } else {
            toast.error(message);
          }
        }).catch((err) => {
          console.log(err);
        })
    }
  }
  return (
    <div className="w-[90%] lg:w-[85%] absolute right-3 md:right-0  p-2 lg:p-4">
      <div className="w-full flex flex-row justify-start items-center gap-10">
        <h1>Pending Notes</h1>
      </div>
      <hr className="w-full mt-10" />
      <div className="w-full mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {
          notes?.map(note => {
            return (
              <div className="w-full rounded shadow p-4 cursor-pointer space-y-4" key={note?._id}>
                <div className="w-full flex flex-row justify-between items-center gap-2">
                  <p className="text-[#004C42]">{handleDates(note?.date)}</p>
                  <p className="text-[#004C42]">{note?.time}</p>
                </div>
                <div className="w-full space-y-2">
                  <h1 className="text-xl font-medium capitalize">{note?.title}</h1>
                  <hr className="w-full mt-5" />
                  <p className="font-normal tracking-wide text-base text-justify">{note?.description}</p>
                  <div className="w-full flex flex-row justify-end items-center gap-3">
                    <TiDelete onClick={() => handleDeleteNote(note?._id)} className="inline text-red-500" size={20} />
                    <MdEdit className="inline text-[#004C42]" size={20} />
                  </div>
                </div>

              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Pending