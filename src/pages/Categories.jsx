import { Loader2 } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { useGalleryStore } from "../store/useGalleryStore";
import { useEffect } from "react";
import CreateCategoryModal from "../components/CreateCategoryModal";
import { IoTrashOutline } from "react-icons/io5";

function Categories() {
  const {
    categories,
    isFetchingCategories,
    getAllCategories,
    deleteCategory,
    isDeletingCategory,
  } = useGalleryStore();

  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div className="w-full min-h-screen pb-10 bg-[#121212]">
      <Sidebar />
      <div className="sm:pl-64 h-full w-full ">
        <div className=" w-full h-full px-6 sm:px-10 pt-5">
          <div className=" flex items-center justify-between w-full border-b border-zinc-800 py-1">
            <h1 className=" text-2xl font-bold text-[#ababab] ">Categories</h1>
            <button
              onClick={() =>
                document.getElementById("create_category").showModal()
              }
              className=" px-4 py-1.5 font-medium text-zinc-200 bg-zinc-800 rounded-lg"
            >
              Create
            </button>
            <CreateCategoryModal />
          </div>
          {isFetchingCategories ? (
            <div className=" mt-5 w-full flex items-center justify-center h-screen">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <div className=" mt-5">
              <div className=" grid grid-cols-2 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-9 gap-3">
                {categories?.map((cat) => (
                  <div
                    key={cat._id}
                    className=" relative flex flex-col items-center justify-center gap-2 bg-[#0a0a0a] w-full rounded-lg overflow-hidden border border-[#1a1a1a] group h-20 "
                  >
                    {/* delete icon */}
                    <div
                      onClick={() => deleteCategory(cat?._id)}
                      className=" absolute right-3 top-3  opacity-0 group-hover:opacity-100 duration-200 flex bg-zinc-800 hover:bg-zinc-900 z-[100] w-8 h-8 rounded-full items-center justify-center"
                    >
                      {isDeletingCategory ? (
                        <Loader2 className="h-4 w-4 animate-spin text-white" />
                      ) : (
                        <IoTrashOutline className=" size-4 2xl:size-5 text-white" />
                      )}
                    </div>
                    {/* delete icon end */}
                    <p className=" text-2xl font-medium capitalize text-zinc-200">
                      {cat?.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
