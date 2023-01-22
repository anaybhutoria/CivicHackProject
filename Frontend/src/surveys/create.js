import React, {useState} from 'react'

const TextLabel = ({ t }) => {
  return (
    <label className="block text-gray-700 font-medium mb-2">
      {t}
    </label>
  )
}


export default function FormBuilder() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [days, setDays] = useState(1)
    const [fields, setFields] = useState([])
    const [mp, setMp] = useState(0)
    const [sections, setSections] = useState([]);

    const handleSubmit = (e) => {
    const headers = new Header({"Content-Type": "application/json"})
    e.preventDefault();
      fetch(`http://localhost:5000/survey/add`, {
          method: 'POST',
          header: headers,
        body: JSON.stringify({
            future_days: days,
            fields: sections,
            title: title,
            desc: desc,
            max: mp
        })
    })
  }

  const handleAddSection = () => {
    setSections([...sections, { label: '', placeholder: '' }]);
  }

  const handleChange = (e, index) => {
    const newSections = [...sections];
    newSections[index][e.target.name] = e.target.value;
    setSections(newSections);
  }


    return (
        <div>
            <h1 class="text-2xl font-medium text-indigo-600">Form Builder</h1>
            <TextLabel t={"Form Title:"} />
            <input 
                class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
                type="text" 
                onChange={e => setTitle(e.target.value)} 
                value={title}
            />
            <TextLabel t={"Form Description:"} />
            <input 
                class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
                type="text" 
                onChange={e => setDesc(e.target.value)} 
                value={desc}
            />
            <TextLabel t={"Survey Length (days):"} />
            <input 
                class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
                type="number" 
                onChange={e => setDays(e.target.value)} 
                value={days}
            />
            <TextLabel t={"Survey Response Limit (people):"} />
            <input 
                class="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal" 
                type="number" 
                onChange={e => setMp(e.target.value)} 
                value={mp}
            />
            {sections.map((section, index) => (
        <div key={index} className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Section {index + 1}
          </label>
          <input
            className="border border-gray-400 p-2 rounded-md"
            type="text"
            name="label"
            value={section.label}
            onChange={(e) => handleChange(e, index)}
            placeholder="Label"
          />
          <input
            className="border border-gray-400 p-2 rounded-md mt-2"
            type="text"
            name="placeholder"
            value={section.placeholder}
            onChange={(e) => handleChange(e, index)}
            placeholder="Placeholder"
          />
        </div>
            ))}
            <button
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        onClick={handleAddSection}
      >
        Add Section
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 mt-4"
        type="submit"
        onClick={handleSubmit}
      >
        Save
      </button>
        </div>
    )
}
