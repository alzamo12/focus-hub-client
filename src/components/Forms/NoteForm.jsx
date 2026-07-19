import Select from "react-select";
import "./noteform.css"
import React from "react";
import ReactQuill from "react-quill-new";
import SelectInput from "../Inputs/add_Class_And_Task_Form_Inputs/SelectInput";
import useInputStyles from "../../hooks/useInputStyles";
// React.lazy(() => import('react-quill-new'));
// const ReactQuill =  <Suspense>{React.lazy(() => import('react-quill-new'))}</Suspense>

const subjects = [
    { value: "Physics", label: "Physics" },
    { value: "Math", label: "Math" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "History", label: "History" },
    // { value: "History", label: "History" },
];

const NoteForm = ({ currentNote, setCurrentNote, title, setTitle, sub, setSub, handleNote, btnText }) => {

    const customStyles = useInputStyles();
    // const modules = {
    //     toolbar: {
    //         container: [
    //             [{ header: [1, 2, 3, false] }],
    //             ["bold", "italic", "underline", "strike"],
    //             [{ color: [] }, { background: [] }], // <-- Add this line for color
    //             [{ list: "ordered" }, { list: "bullet" }],
    //             ["link", "image"],
    //             ["table"],

    //             // ["increaseImageSize", "decreaseImageSize"],
    //             ["clean"],
    //         ],
    //         handlers: {
    //             table() {
    //                 this.quill.getModule("table").insertTable(3, 3);
    //             },
    //         },
    //     },
    //     table: true,
    //     // imageResize: {
    //     //     parchment: Quill.import("parchment"),
    //     //     modules: ["Resize", "DisplaySize"], // "Toolbar" not supported in v2
    //     //     handleStyle: {
    //     //         border: "2px solid #4A90E2",
    //     //         width: "12px",
    //     //         height: "12px",
    //     //         backgroundColor: "white",
    //     //         borderRadius: "50%",
    //     //     },
    //     // },

    // };

    const modules = {
        toolbar: {
            container: [
                [{ header: [1, 2, 3, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ color: [] }, { background: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "image"],

                // Modern, grouped table manipulation array layout strings
                ["table", "table-insert-row-above", "table-insert-row-below", "table-insert-column-left", "table-insert-column-right"],
                ["table-delete-row", "table-delete-column", "table-delete-table"],
                // ['formula'],
                // ["increaseImageSize", "decreaseImageSize"],
                ["clean"],
            ],
            handlers: {
                // Main initialization handler
                table() {
                    this.quill.getModule("table").insertTable(3, 3);
                },
                // Context structural editing triggers bound directly to internal operations
                "table-insert-row-above"() {
                    this.quill.getModule("table").insertRowAbove();
                },
                "table-insert-row-below"() {
                    this.quill.getModule("table").insertRowBelow();
                },
                "table-insert-column-left"() {
                    this.quill.getModule("table").insertColumnLeft();
                },
                "table-insert-column-right"() {
                    this.quill.getModule("table").insertColumnRight();
                },
                "table-delete-row"() {
                    this.quill.getModule("table").deleteRow();
                },
                "table-delete-column"() {
                    this.quill.getModule("table").deleteColumn();
                },
                "table-delete-table"() {
                    this.quill.getModule("table").deleteTable();
                }
            },
        },
        table: true,
        // imageResize: { ... }
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
        "blockquote",
        "code-block",
        "script",   // for sub/sup
        "strike",
    ];

    return (
        <div className="bg-base-100 shadow-lg rounded-2xl p-6 space-y-4 w-full">
            {/* subject input */}
            <div className='flex flex-col md:flex-row gap-4 w-full'>
                <div className='w-full md:w-1/2'>
                    <Select
                        options={subjects}
                        value={sub}
                        onChange={setSub}
                        placeholder="Please select your subject"
                        className='w-full input-lg rounded-md'
                        styles={customStyles}
                    />


                </div>
                <input
                    type="text"
                    className="w-full md:w-1/2 border dark:border-primary border-gray-300 
                    rounded-md input-lg px-2 text-lg dark:bg-black"
                    placeholder="Enter subject..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>

            {/*   text editor form */}
            <ReactQuill
                // ref={noteRef}
                theme='snow'
                value={currentNote}
                onChange={setCurrentNote}
                height="300px"
                modules={modules}
                formats={formats}
                style={{ height: "400px", paddingBottom: "40px" }}
                className=' not-dark:bg-white  rounded-2xl dark:border dark:border-primary dark:text-white'
                placeholder='Write your note here ....'
            />

            {/* submit button */}
            <button
                onClick={handleNote}
                className="w-full mt-4 py-2 bg-white dark:bg-black dark:text-accent border border-primary  text-secondary rounded-lg hover:bg-secondary hover:text-white"
            >
                {btnText}
            </button>
        </div>
    );
};

export default NoteForm;