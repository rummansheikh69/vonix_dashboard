import { useState } from "react";
import { useGalleryStore } from "../store/useGalleryStore";

function CreateCategoryModal() {
  const { isCreatingCategory, createCategory } = useGalleryStore();

  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(name);
    setName("");
    document.getElementById("create_category").close();
  };
  return (
    <dialog id="create_category" className="modal">
      <div className="modal-box bg-zinc-900">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm text-zinc-200">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full bg-zinc-800 border-zinc-700 text-zinc-200"
              placeholder="Enter category name"
            />
          </div>
          <div className="modal-action mt-4">
            <button
              type="button"
              onClick={() => document.getElementById("create_category").close()}
              className="btn btn-sm bg-zinc-800 border-zinc-700 text-zinc-200 hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isCreatingCategory}
              className={`btn btn-sm bg-blue-600 border-blue-500 text-white hover:bg-blue-500 ${
                isCreatingCategory ? "loading" : ""
              }`}
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default CreateCategoryModal;
