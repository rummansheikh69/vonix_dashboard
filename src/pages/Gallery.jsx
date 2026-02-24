import Sidebar from "../components/Sidebar";
import { TbEye } from "react-icons/tb";
import { MdOutlineModeEdit } from "react-icons/md";
import EditModal from "../components/EditModal";
import { useEffect, useState } from "react";
import { useGalleryStore } from "../store/useGalleryStore";
import { Loader2 } from "lucide-react";
import { IoTrashOutline } from "react-icons/io5";

function Gallery() {
  const [projectId, setProjectId] = useState("");
  const {
    projects,
    isFetching,
    fetchAllProjects,
    isFetcinghProjectForEdit,
    fetchProjectForEdit,
    projectForEdit,
    isDeleting,
    deleteProject,
  } = useGalleryStore();

  useEffect(() => {
    fetchAllProjects();
  }, []);

  const openModal = (id) => {
    setProjectId(id);
    setTimeout(() => {
      fetchProjectForEdit(id);
    }, 130);
    document.getElementById("editModal").showModal();
  };

  return (
    <div className="w-full min-h-screen pb-10 bg-[#121212]">
      <Sidebar />
      <div className="sm:pl-64 h-full w-full ">
        <div className=" w-full h-full px-6 sm:px-10 pt-5">
          <h1 className=" text-2xl font-bold text-[#ababab] border-b border-zinc-800 py-1">
            Projects
          </h1>
          {isFetching ? (
            <div className=" mt-5 w-full flex items-center justify-center h-screen">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <div className=" mt-5 w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {projects?.map((project) => (
                <div
                  key={project?._id}
                  className="  relative h-64 bg-[#0a0a0a] w-full rounded-lg overflow-hidden border border-[#1a1a1a] group cursor-pointer"
                >
                  <div className="absolute right-3 top-3 flex items-center gap-2">
                    {/* edit icon */}
                    <div
                      onClick={() => openModal(project?._id)}
                      className="  opacity-0 group-hover:opacity-100 duration-200 flex bg-zinc-800 hover:bg-zinc-900 z-[100] w-8 h-8 rounded-full items-center justify-center"
                    >
                      <MdOutlineModeEdit className=" size-4 2xl:size-5 text-white" />
                    </div>
                    {/* edit icon end */}
                    {/* delete icon */}
                    <div
                      onClick={() => deleteProject(project?._id)}
                      className="  opacity-0 group-hover:opacity-100 duration-200 flex bg-zinc-800 hover:bg-zinc-900 z-[100] w-8 h-8 rounded-full items-center justify-center"
                    >
                      {isDeleting ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                      ) : (
                        <IoTrashOutline className=" size-4 2xl:size-5 text-white" />
                      )}
                    </div>
                    {/* delete icon end */}
                  </div>
                  <div
                    className={` absolute inset-0 px-5 pt-5 bg-cover bg-center `}
                    style={{
                      backgroundImage: `url(${project?.thumbnailImage})`,
                    }}
                  >
                    <div className=" absolute left-0 right-0 w-full bottom-0 h-28 bg-gradient-to-t from-[#030303] z-10 to-transparent">
                      <div className=" w-full h-full flex items-center justify-center px-5 ">
                        <div className=" w-full flex items-end justify-between gap-2">
                          <div className="">
                            <h3 className=" text-[17px] 2xl:text-2xl">
                              {project?.title}
                            </h3>
                            <h4 className=" text-[11px] 2xl:text-sm leading-none font-light truncate max-w-64">
                              {project?.description}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <EditModal
            project={projectForEdit}
            isFetching={isFetcinghProjectForEdit}
          />
        </div>
      </div>
    </div>
  );
}

export default Gallery;
