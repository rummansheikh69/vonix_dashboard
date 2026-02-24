import React, { useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoCloseSharp } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import { useGalleryStore } from "../store/useGalleryStore";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";

function Home() {
  const [img, setImg] = useState(null);
  const [images, setImages] = useState([]); // Stores Base64 images
  const multiImgRef = useRef(null);

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

  // ✅ Handle multiple image uploads (without extra buttons)
  const handleMultipleImgChange = (e) => {
    const files = e.target.files;
    const newImages = [...images];

    Object.values(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push(reader.result); // Convert to Base64
        setImages([...newImages]); // Update state correctly
      };
      reader.readAsDataURL(file);
    });
  };

  // ✅ Remove Image from Preview
  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const { isUploading, uploadProject, categories, getAllCategories } =
    useGalleryStore();

  useEffect(() => {
    getAllCategories();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
  });

  const validateForm = () => {
    if (!formData.title.trim()) return toast.error("Title is required");
    if (!formData.description.trim())
      return toast.error("Description is required");
    if (images.length === 0)
      return toast.error("At least one image is required");
    if (!img) return toast.error("Thumbnail image is required");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true)
      uploadProject({ ...formData, images, thumbnailImage: img });
  };

  return (
    <div className="w-full min-h-screen pb-10 bg-[#121212]">
      <Sidebar />
      <div className="sm:pl-64 h-full w-full ">
        <form onSubmit={handleSubmit}>
          <div className=" w-full h-full px-6 sm:px-10 pt-10">
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
                <h5 className=" text-xs 2xl:text-sm font-light">Description</h5>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter description"
                  className=" mt-2 w-full text-sm outline-none focus:border-zinc-600 px-3 font-normal py-1 bg-[#2a2a2a] border border-zinc-800 rounded-[3px]"
                />
              </div>
            </div>

            <div className=" flex items-center flex-col sm:flex-row gap-5 mt-10">
              <div className=" w-full">
                <h5 className=" text-xs 2xl:text-sm font-light">Category</h5>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className=" mt-2 w-full text-sm outline-none focus:border-zinc-600 px-3 font-normal py-2 bg-[#2a2a2a] border border-zinc-800 rounded-[3px]"
                >
                  <option value="" defaultChecked>
                    Select Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" w-full"></div>
            </div>

            {/* //single image */}
            <div className=" mt-6">
              <p className="text-xs 2xl:text-sm font-light mb-2">
                Upload Images
              </p>
              <div className="flex justify-center items-center border border-zinc-600 rounded-md mt-2 w-80">
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
                  <div className=" py-5 w-max">
                    <div className="relative w-80 mx-auto">
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

            {/* Multiple Image Upload */}
            <div className=" w-full mt-10 place-content-center">
              <p className="text-xs 2xl:text-sm font-light mb-2">
                Upload Images
              </p>
              <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-3">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="relative p-1 w-40 h-40 border border-zinc-600 border-dashed rounded-md overflow-hidden"
                  >
                    <img
                      src={img}
                      alt={`upload-${index}`}
                      title={`upload-${index}`}
                      className="object-contain w-full h-full"
                    />
                    <IoCloseSharp
                      className="absolute top-1 right-1 text-white bg-gray-700 rounded-full w-4 h-4 2xl:w-5 2xl:h-5 cursor-pointer"
                      onClick={() => handleRemoveImage(index)}
                    />
                  </div>
                ))}

                {/* Click to Upload */}
                <div
                  onClick={() => multiImgRef.current.click()}
                  className="flex justify-center items-center w-40 h-40 border border-zinc-600 border-dashed rounded-md cursor-pointer"
                >
                  <CiImageOn className="fill-zinc-700 w-10 h-10" />
                  <span className="text-zinc-700">+</span>
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
            </div>

            <button
              disabled={isUploading}
              className=" w-full h-9 text-sm bg-[#2a2a2a] hover:bg-[#3a3a3a] duration-200 mt-10 rounded-md border border-zinc-800 flex items-center justify-center"
              type="submit"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
