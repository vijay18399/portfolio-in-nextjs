import React, { useEffect, useState, useContext } from "react";
import { Trash,PanelLeftClose } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import templateMap from "@/utils/templateMap";
import dynamic from "next/dynamic";
import { MuiColorInput } from "mui-color-input"; // Color picker


import { useSelector, useDispatch } from 'react-redux'; 
const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });
import { setSelectedSectionId} from "@/features/page/pageSlice";

import { globalContext } from '@/context/GlobalContext'

export default function SectionEditorForm({ sectionSelected, handleSave }) {
    const { activeTab, setActiveTab } = useContext(globalContext);
      const dispatch = useDispatch();
  const bgOptions = {
    label: "Background Color",
    options: ["#FFF3E0", "#E3F2FD", "#F5F5F5", "#FAFAFA"],
  };
  const onClose =()=>{
      dispatch(setSelectedSectionId(null));
  }
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      [{ color: [] }],
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "align",
    "color",
  ];

  const [formData, setFormData] = useState({});
  
  const onHandleSave = () => {
    handleSave(formData);
    setActiveTab("")
   
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleQuillChange = (value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      description: value,
    }));
  };

  const handleLinkChange = (index, field, value) => {
    const updatedLinks = formData?.links?.map((link, i) =>
      i === index ? { ...link, [field]: value } : link
    );
    setFormData((prevFormData) => ({
      ...prevFormData,
      links: updatedLinks,
    }));
  };

  const addLink = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      links: [...(prevFormData.links || []), { title: "", href: "" }],
    }));
  };

  const removeLink = (index) => {
    const updatedLinks = formData?.links?.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      links: updatedLinks,
    }));
  };

  const handleBgColorChange = (color) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      styles: {
        ...prevFormData.styles,
        backgroundColor: color,
      },
    }));
  };

  const handleItemChange = (index, field, value) => {
    if (formData?.items[index][field] !== value) {
      const updatedItems = formData?.items?.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      setFormData((prevFormData) => ({
        ...prevFormData,
        items: updatedItems,
      }));
    }
  };

  const addItem = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: [
        ...(prevFormData.items || []),
        {
          title: "",
          logo: "",
          role: "",
          location: "",
          duration: "",
          responsibilities: "",
        },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = formData?.items?.filter((_, i) => i !== index);
    setFormData((prevFormData) => ({
      ...prevFormData,
      items: updatedItems,
    }));
  };

  useEffect(() => {
    if (sectionSelected) {
      const allowedProps = templateMap[sectionSelected.template]?.properties || [];
      const initialData = Object.keys(sectionSelected.data || {}).reduce((acc, key) => {
        if (allowedProps.includes(key)) {
          acc[key] = sectionSelected.data[key] ?? (key === "links" ? [] : "");
        }
        return acc;
      }, {});
      setFormData(initialData);
    } else {
      setFormData({});
    }
  }, [sectionSelected]);

  if (!sectionSelected) {
    return null;
  }

  return (
    <div className="editor-panel-container">
      <div className="editor-title">
   
        <span>
          Edit Section
        </span>
        <PanelLeftClose onClick={onClose} />
        </div>
      <div className="scrollable">
        {/* Background Color Picker */}
        <div className="input-group">
          <label className="label">{bgOptions.label}</label>
          <div className="color-picker-container">
            <div className="color-options">
              {bgOptions.options.map((color) => (
                <div
                  key={color}
                  className="color-option"
                  style={{ backgroundColor: color }}
                  onClick={() => handleBgColorChange(color)}
                />
              ))}
            </div>
            <MuiColorInput
              format="hex"
              value={formData.styles?.backgroundColor || "#FFFFFF"}
              onChange={handleBgColorChange}
            />
          </div>
        </div>

        {templateMap[sectionSelected.template]?.properties.includes("title") && (
          <div className="input-group">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
        )}

        {templateMap[sectionSelected.template]?.properties.includes("github_username") && (
          <div className="input-group">
            <label className="label">Github Username</label>
            <input
              type="text"
              name="github_username"
              value={formData.github_username || ""}
              onChange={handleChange}
              className="input"
            />
          </div>
        )}

        {templateMap[sectionSelected.template]?.properties.includes("description") && (
          <div className="input-group">
            <label className="label">Description</label>
            <QuillEditor
              value={formData.description || ""}
              onChange={handleQuillChange}
              modules={quillModules}
              formats={quillFormats}
            />
          </div>
        )}

        {templateMap[sectionSelected.template]?.properties.includes("imageUrl") && (
          <>
            <div className="input-group">
              <label className="label">Image URL</label>
              <input
                type="text"
                name="imageUrl"
                placeholder="Enter image URL"
                value={formData.imageUrl || ""}
                onChange={handleChange}
                className="input"
              />
            </div>
            {formData.imageUrl && <img src={formData.imageUrl} alt="Preview" className="image-preview" />}
          </>
        )}
  {templateMap[sectionSelected.template]?.properties.includes("links") &&
      <div className="blocks-header">
      Links
        <button className="add-item-button" onClick={addLink}>
          Add Link
        </button>
      </div>
  }
      
    
        {formData.links?.map((link, index) => (
          <div className="link-item" key={index}>
            <div className="link-header">
              <div className="link-type-toggle">
                <button
                  className={`toggle-button ${!link.isImage ? "active" : ""}`}
                  onClick={() => handleLinkChange(index, "isImage", false)}
                >
                  Text Link
                </button>
                <button
                  className={`toggle-button ${link.isImage ? "active" : ""}`}
                  onClick={() => handleLinkChange(index, "isImage", true)}
                >
                  Image Link
                </button>
              </div>
              <button className="delete-button" onClick={() => removeLink(index)}>
                <Trash size={16} />
              </button>
            </div>

            {link.isImage ? (
              <>
                <div className="input-group">
                  <label className="label">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={link.imageUrl || ""}
                    onChange={(e) => handleLinkChange(index, "imageUrl", e.target.value)}
                    className="input"
                  />
                </div>
                {link.imageUrl && (
                  <div className="image-preview-container">
                    <img src={link.imageUrl} alt="Link preview" className="image-preview" />
                  </div>
                )}
                <div className="input-group">
                  <label className="label">Link URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={link.href || ""}
                    onChange={(e) => handleLinkChange(index, "href", e.target.value)}
                    className="input"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="input-group">
                  <label className="label">Link Text</label>
                  <input
                    type="text"
                    placeholder="e.g. 'View Project'"
                    value={link.title || ""}
                    onChange={(e) => handleLinkChange(index, "title", e.target.value)}
                    className="input"
                  />
                </div>
                <div className="input-group">
                  <label className="label">Link URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com"
                    value={link.href || ""}
                    onChange={(e) => handleLinkChange(index, "href", e.target.value)}
                    className="input"
                  />
                </div>
              </>
            )}
          </div>
        ))}

     { templateMap[sectionSelected.template]?.properties.includes("items") &&
        <div className="blocks-header">
          Experience
          <button className="add-item-button" onClick={addItem}>
            Add Item
          </button>
        </div>  }
       
        {formData.items?.map((item, index) => (
          <div className="link-item" key={index}>
            <div className="link-header">
                 Experince  {index+1}
                <button className="delete-button" onClick={() => removeItem(index)}>
                  <Trash size={16} />
                </button>
            </div>
        

            <div className="input-group">
              <label className="label">Title</label>
              <input
                type="text"
                value={item.title}
                onChange={(e) => handleItemChange(index, "title", e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Logo URL</label>
              <input
                type="text"
                value={item.logo}
                onChange={(e) => handleItemChange(index, "logo", e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Role</label>
              <input
                type="text"
                value={item.role}
                onChange={(e) => handleItemChange(index, "role", e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Location</label>
              <input
                type="text"
                value={item.location}
                onChange={(e) => handleItemChange(index, "location", e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Duration</label>
              <input
                type="text"
                value={item.duration}
                onChange={(e) => handleItemChange(index, "duration", e.target.value)}
                className="input"
              />
            </div>

            <div className="input-group">
              <label className="label">Responsibilities</label>
              <QuillEditor
                value={item.responsibilities}
                onChange={(responsibilities) => handleItemChange(index, "responsibilities", responsibilities)}
                modules={quillModules}
                formats={quillFormats}
              />
            </div>
          </div>
        ))}

      </div>
      <button className="save-button" onClick={onHandleSave}>Apply</button>
    </div>
  );
}
