import { useEffect, useMemo, useState } from "react";
import Select from "react-select";
// import { FixedSizeList } from 'react-window';
// import { FixedSizeList as List } from 'react-window';
import AsyncSelect from "react-select/async";
import ISO6391 from "iso-639-1";


const subjects = [
    { value: "Physics", label: "Physics" },
    { value: "Math", label: "Math" },
    { value: "Chemistry", label: "Chemistry" },
    { value: "History", label: "History" },
];

const levels = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
];

// Subtopics example per subject
const subTopics = {
    Physics: [
        { value: "Mechanics", label: "Mechanics" },
        { value: "Optics", label: "Optics" },
        { value: "Thermodynamics", label: "Thermodynamics" },
    ],
    Math: [
        { value: "Algebra", label: "Algebra" },
        { value: "Calculus", label: "Calculus" },
        { value: "Geometry", label: "Geometry" },
    ],
    Chemistry: [
        { value: "Organic", label: "Organic Chemistry" },
        { value: "Inorganic", label: "Inorganic Chemistry" },
        { value: "Physical", label: "Physical Chemistry" },
    ],
    History: [
        { value: "British", label: "British" },
        { value: "Mughal", label: "Mughal" },
        { value: "Babylon", label: "Babylon" },
        { value: "Bangladesh liberation war", label: "Bangladesh liberation war" },
    ],
};
function LanguageSelector({ onChange }) {
    const [value, setValue] = useState(null);

    // build languages once
    const allLanguages = useMemo(
        () =>
            ISO6391.getAllNames().map((name) => ({
                value: ISO6391.getCode(name), // e.g. "en"
                label: name,                  // e.g. "English"
            })),
        []
    );

    const defaultOptions = useMemo(() => allLanguages.slice(0, 20), [allLanguages]);

    // loadOptions can use callback OR return a Promise
    const loadOptions = (inputValue, callback) => {
        // if no input, show defaults
        if (!inputValue) {
            callback(defaultOptions);
            return;
        }

        const q = inputValue.trim().toLowerCase();

        // simple substring filter (fast). For fuzzy matching, integrate fuse.js.
        const filtered = allLanguages.filter((lang) =>
            lang.label.toLowerCase().includes(q) || (lang.value && lang.value.includes(q))
        );

        // return via callback
        callback(filtered);
        // OR return Promise.resolve(filtered)
    };

    const handleChange = (selected) => {
        setValue(selected);
        if (onChange) onChange(selected);
    };

    return (
        <div className="max-w-md mx-auto mt-6 p-4 bg-white shadow rounded-md">
            <label className="block mb-2 font-medium">Language</label>
            <AsyncSelect
                cacheOptions
                loadOptions={loadOptions}
                defaultOptions={defaultOptions}
                value={value}
                onChange={handleChange}
                placeholder="Search and select language..."
                isClearable
            />
        </div>
    );
}

const QuestionForm = ({ onSubmit }) => {
    const [subject, setSubject] = useState(null);
    const [level, setLevel] = useState(null);
    const [subTopic, setSubTopic] = useState(null);
    const [language, setLanguages] = useState("");
    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">Generate Questions</h2>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Subject</label>
                <Select
                    options={subjects}
                    value={subject}
                    onChange={setSubject}
                    placeholder="Select subject..."
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Level</label>
                <Select
                    options={levels}
                    value={level}
                    onChange={setLevel}
                    placeholder="Select difficulty level..."
                />
            </div>

            <div className="mb-4">
                <label className="block mb-2 font-medium">Sub-topic</label>
                <Select
                    options={subject ? subTopics[subject.value] : []}
                    value={subTopic}
                    onChange={setSubTopic}
                    placeholder={subject ? "Select sub-topic..." : "Select a subject first"}
                    isDisabled={!subject}
                />
            </div>
            <div className="mb-4">
                <LanguageSelector onChange={setLanguages} />
            </div>

            <button
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                onClick={() => onSubmit(subject, subTopic, level, language)}
                disabled={!subject || !level || !subTopic}
            >
                Generate Questions
            </button>
        </div>
    );
};

export default QuestionForm;
