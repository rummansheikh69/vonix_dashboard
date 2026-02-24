import { Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useGalleryStore } from "../store/useGalleryStore";
import { CiImageOn } from "react-icons/ci";

function EditModal({ project, isFetching }) {
  const { isUpdating, updateProject, categories, getAllCategories } =
    useGalleryStore();

  const [formData, setFormData] = useState({
    title: project?.title || "",
    description: project?.description || "",
    category: project?.category || "",
  });

  const [img, setImg] = useState(null);
  const [images, setImages] = useState(project?.images || []);
  const multiImgRef = useRef(null);
  const [previewImages, setPreviewImages] = useState([]); // ✅ Fix: This was missing!
  const [newImages, setNewImages] = useState([]); // ✅ Stores new images for upload
  const [removeImages, setRemoveImages] = useState([]); // ✅ Stores images to remove

  useEffect(() => {
    if (project) {
      getAllCategories();
      setImages(project.images || []);
      setImg(project.thumbnailImage || ""); // Reset single image preview when project changes
      setFormData({
        title: project.title || "",
        description: project.description || "",
        category: project.category || "",
      });
      setPreviewImages([]); // Clear previews when opening a NEW project
      setNewImages([]); // Reset new upload list
      setRemoveImages([]); // Reset removal list
    }
  }, [project]);

  //handle single image
  const imgRef = useRef(null);
  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMultipleImgChange = (e) => {
    const files = Array.from(e.target.files); // Convert FileList to Array
    const newImageList = [...newImages]; // Store only NEW images
    const previewList = [...previewImages]; // Ensure UI updates correctly

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (!previewList.includes(reader.result)) {
          newImageList.push(reader.result); // ✅ Store for upload
          previewList.push(reader.result); // ✅ Update UI Preview
          setNewImages([...newImageList]); // ✅ Store new images for backend
          setPreviewImages([...previewList]); // ✅ Fix: UI now updates properly
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveImage = (index) => {
    setRemoveImages((prev) => [...prev, images[index]]); // ✅ Add to remove list
    setImages((prev) => prev.filter((_, i) => i !== index)); // ✅ Remove from backend state
    setPreviewImages((prev) => prev.filter((_, i) => i !== index)); // ✅ Fix: Remove from UI instantly
  };
  return (
    <div>
      <dialog id="editModal" className="modal">
        <div className="modal-box max-w-3xl bg-zinc-900 ">
          {isFetching ? (
            <div className=" h-64 w-full flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProject(project._id, {
                  ...formData,
                  newImages,
                  removeImages,
                });
              }}
            >
              <div className=" px-4 md:px-10 pb-10">
                <div className=" flex items-center flex-col sm:flex-row gap-5">
                  <div className=" w-full">
                    <h5 className=" text-xs 2xl:text-sm font-light">Title</h5>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="Enter title"
                      className=" mt-2 w-full text-sm outline-none focus:border-zinc-600 px-3 font-normal py-1 bg-[#2a2a2a] border border-zinc-800 rounded-[3px]"
                    />
                  </div>
                  <div className=" w-full">
                    <h5 className=" text-xs 2xl:text-sm font-light">
                      Description
                    </h5>
                    <input
                      type="text"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder="Enter description"
                      className=" mt-2 w-full text-sm outline-none focus:border-zinc-600 px-3 font-normal py-1 bg-[#2a2a2a] border border-zinc-800 rounded-[3px]"
                    />
                  </div>
                </div>

                <div className=" flex items-center flex-col sm:flex-row gap-5 mt-10">
                  <div className=" w-full">
                    <h5 className=" text-xs 2xl:text-sm font-light">
                      Category
                    </h5>
                    <select
                      name="category"
                      id="category"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className=" mt-2 w-full text-sm outline-none focus:border-zinc-600 px-3 font-normal py-2 bg-[#2a2a2a] border border-zinc-800 rounded-[3px]"
                    >
                      <option value="">Select Category</option>
                      {categories?.map((cat) => (
                        <option key={cat?._id} value={cat?.name}>
                          {cat?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className=" w-full"></div>
                </div>

                <div className=" mt-6">
                  <p className="text-xs 2xl:text-sm font-light mb-2">
                    Change Thumbnail Image
                  </p>
                  <div className="flex justify-center items-center border border-zinc-600 rounded-md mt-2 md:w-80">
                    {!img && (
                      <div
                        onClick={() => imgRef.current.click()}
                        className="flex flex-col gap-1 w-full py-8 items-center cursor-pointer"
                      >
                        <CiImageOn className="fill-zinc-700 w-20 h-20 " />
                        <p className=" text-zinc-700">Upload Image</p>
                      </div>
                    )}

                    {/* image preview  */}
                    {img && (
                      <div className=" py-5 ">
                        <div className="relative w-full md:w-80 mx-auto">
                          <IoCloseSharp
                            className="absolute top-0 right-3 text-white bg-gray-700 rounded-full w-6 h-6 cursor-pointer"
                            onClick={() => {
                              setImg(null);
                              imgRef.current.value = null;
                            }}
                          />
                          <img
                            src={img}
                            className="w-full mx-auto h-72 object-contain rounded"
                          />
                        </div>
                      </div>
                    )}

                    {/* image selection input  */}
                    <input
                      accept="image/*"
                      type="file"
                      hidden
                      ref={imgRef}
                      onChange={handleImgChange}
                    />
                  </div>
                </div>

                <div className=" mt-4">
                  <p className="text-xs 2xl:text-sm font-light mb-2">
                    Change Images
                  </p>
                  {/* images  */}
                  <div className="flex flex-wrap gap-4 mt-2">
                    {/* ✅ Existing images from backend */}
                    {images?.map((img, index) => (
                      <div
                        key={`existing-${index}`}
                        className="relative  md:w-40 md:h-40 w-20 h-20 border border-border border-dashed rounded-md overflow-hidden"
                      >
                        <img src={img} className="object-cover w-full h-full" />
                        <IoCloseSharp
                          className="absolute top-1 right-1 text-white bg-gray-700 rounded-full w-5 h-5 cursor-pointer"
                          onClick={() => handleRemoveImage(index)}
                        />
                      </div>
                    ))}

                    {/* ✅ Newly added images preview */}
                    {previewImages.map((img, index) => (
                      <div
                        key={`preview-${index}`}
                        className="relative md:w-40 md:h-40 w-20 h-20 border border-border border-dashed rounded-md overflow-hidden"
                      >
                        <img src={img} className="object-cover w-full h-full" />
                        <IoCloseSharp
                          className="absolute top-1 right-1 text-white bg-gray-700 rounded-full w-5 h-5 cursor-pointer"
                          onClick={() => {
                            setPreviewImages((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                            setNewImages((prev) =>
                              prev.filter((_, i) => i !== index),
                            );
                          }}
                        />
                      </div>
                    ))}

                    {/* Upload New Images Button */}
                    <div
                      onClick={() => multiImgRef.current.click()}
                      className=" md:w-40 md:h-40 w-20 h-20 flex justify-center items-center border border-border border-dashed rounded-md cursor-pointer"
                    >
                      <span>+</span>
                    </div>
                    <input
                      accept="image/*"
                      type="file"
                      hidden
                      multiple
                      ref={multiImgRef}
                      onChange={handleMultipleImgChange}
                    />
                  </div>
                  {/* images end */}
                </div>

                {/* save button */}
                <div className=" mt-10 w-full">
                  <button className=" float-end text-base font-normal w-20 h-10 bg-zinc-800 rounded-md  flex items-center justify-center">
                    {isUpdating ? "Saving..." : "Save"}
                  </button>
                </div>
                {/* save button end */}
              </div>
            </form>
          )}

          <button
            onClick={() => document.getElementById("editModal").close()}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default EditModal;
