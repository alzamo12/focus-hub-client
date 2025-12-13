import Select from "react-select";
import React from "react";


const ReactQuill = React.lazy(() => import('react-quill-new'));

// Quill.register("modules/table", Table);
// Quill.register("modules/imageResize", ImageResize);
const subjects = [
    { value: "Physics", label: "Physics" },
    { value: "Math", label: "Math" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "History", label: "History" },
    // { value: "History", label: "History" },
];
const NoteForm = ({ currentNote, setCurrentNote, title, setTitle, sub, setSub, handleNote }) => {
    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }], // <-- Add this line for color
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],
                ["table"],

                // ["increaseImageSize", "decreaseImageSize"],
                ["clean"],
            ],
            handlers: {
                table() {
                    this.quill.getModule("table").insertTable(3, 3);
                },
            },
        },
        table: true,
        // imageResize: {
        //     parchment: Quill.import("parchment"),
        //     modules: ["Resize", "DisplaySize"], // "Toolbar" not supported in v2
        //     handleStyle: {
        //         border: "2px solid #4A90E2",
        //         width: "12px",
        //         height: "12px",
        //         backgroundColor: "white",
        //         borderRadius: "50%",
        //     },
        // },

    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "color",
        "background",
        "list",
        "bullet",
        "link",
        "image",
        "table",
    ];

    // console.log(sub)
    return (
        <div className="bg-white shadow-lg rounded-2xl p-6 space-y-4 w-full">
            <div className='flex flex-col md:flex-row gap-4 w-full'>
                <div className='w-full md:w-1/2'>
                    <Select
                        options={subjects}
                        value={sub}
                        onChange={setSub}
                        placeholder="Please select your subject"
                        className='w-full input-lg rounded-md'
                    />
                </div>
                <input
                    type="text"
                    className="w-full md:w-1/2 border border-gray-300 rounded-md input-lg px-2 text-lg"
                    placeholder="Enter subject..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            <ReactQuill
                theme='snow'
                value={currentNote}
                onChange={setCurrentNote}
                height="300px"
                modules={modules}
                formats={formats}
                style={{ height: "400px", paddingBottom: "40px" }}
                className='bg-white  rounded-2xl'
                placeholder='Write your note here ....'
            />

            <button
                onClick={handleNote}
                className="w-full mt-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
                Edit Note
            </button>
        </div>
    );
};

export default NoteForm;