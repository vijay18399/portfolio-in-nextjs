import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Trash } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";
import templateMap from "@/utils/templateMap";
import dynamic from "next/dynamic";
import { MuiColorInput } from "mui-color-input"; // Color picker

const QuillEditor = dynamic(() => import("react-quill-new"), { ssr: false });

export default function SectionEditorForm({ sectionSelected, handleSave }) {
  const bgOptions = {
    label: "Background Color",
    options: [ "#FFF3E0", "#E3F2FD", "#F5F5F5", "#FAFAFA"],
  };

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
    <EditorPanelContainer>
      <Title>Edit Section</Title>
      <Scrollable>
        {/* Background Color Picker */}

          <InputGroup>
            <Label>{bgOptions.label}</Label>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <ColorOptions>
              {bgOptions.options.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  onClick={() => handleBgColorChange(color)}
                />
              ))}
            </ColorOptions>
            <MuiColorInput
              format="hex"
              value={formData.styles?.backgroundColor || "#FFFFFF"}
              onChange={handleBgColorChange}
            />
            </div>
          </InputGroup>

        {templateMap[sectionSelected.template]?.properties.includes("title") && (
          <InputGroup>
            <Label>Title</Label>
            <Input
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </InputGroup>
        )}

        {templateMap[sectionSelected.template]?.properties.includes("github_username") && (
          <InputGroup>
            <Label>Github Username</Label>
            <Input
              type="text"
              name="github_username"
              value={formData.github_username || ""}
              onChange={handleChange}
            />
          </InputGroup>
        )}

        {templateMap[sectionSelected.template]?.properties.includes("description") && (
          <InputGroup>
            <Label>Description</Label>
            <QuillEditor
              value={formData.description || ""}
              onChange={handleQuillChange}
              modules={quillModules}
              formats={quillFormats}
            />
          </InputGroup>
        )}

        {templateMap[sectionSelected.template]?.properties.includes("imageUrl") && (
          <>
            <InputGroup>
              <Label>Image URL</Label>
              <Input
                type="text"
                name="imageUrl"
                placeholder="Enter image URL"
                value={formData.imageUrl || ""}
                onChange={handleChange}
              />
            </InputGroup>
            {formData.imageUrl && <ImagePreview src={formData.imageUrl} alt="Preview" />}
          </>
        )}

        {templateMap[sectionSelected.template]?.properties.includes("links") && (
          <LinksContainer>
            <Row>
              <Label>Links</Label> <AddButton onClick={addLink}>+ Add Link</AddButton>
            </Row>
            {formData.links?.map((link, index) => (
              <LinkItem key={index}>
                <InputGroup>
                  <Label>Link Text</Label>
                  <Input
                    type="text"
                    placeholder="Text"
                    value={link.title}
                    onChange={(e) => handleLinkChange(index, "title", e.target.value)}
                  />
                </InputGroup>
                <InputGroup>
                  <Label>Link Route</Label>
                  <Input
                    type="text"
                    placeholder="Route"
                    value={link.href}
                    onChange={(e) => handleLinkChange(index, "href", e.target.value)}
                  />
                </InputGroup>
                <DeleteButton onClick={() => removeLink(index)}>
                  <Trash size={32} />
                </DeleteButton>
              </LinkItem>
            ))}
          </LinksContainer>
        )}
      </Scrollable>
      <SaveButton onClick={onHandleSave}>Save</SaveButton>
    </EditorPanelContainer>
  );
}

// Styled Components
const Scrollable = styled.div`
  height: calc(100vh - 118px);
  overflow-y: auto;
  padding-right: 14px;
`;

const EditorPanelContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 285px;
  padding: 10px;
  border-left: 1px solid #ccc;
  background: white;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 900;
  padding: 5px;
  border-bottom: 1px solid #e5e5e5;
`;

const LinksContainer = styled.div`
  margin-top: 12px;
`;

const SaveButton = styled.button`
  margin-top: 12px;
  background: var(--fill-primary-active);
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 900;
  margin-bottom: 5px;
`;

const Input = styled.input`
  min-height: 36px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
  background: white;
  border: 1px solid rgb(202, 202, 202);
  border-radius: 8px;
  padding: 0px 12px;
`;

const LinkItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
`;

const DeleteButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: red;
  display: flex;
  align-items: center;
`;

const AddButton = styled.button`
  background: #0288d1;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border: none;
  border-radius: 15px;
  cursor: pointer;
  font-weight: bold;
  &:hover {
    opacity: 0.8;
  }
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ImagePreview = styled.img`
  width: 100%;
  max-width: 300px;
  height: auto;
  border-radius: 8px;
  margin-top: 10px;
  border: 1px solid #ccc;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;

  &:hover {
    border-color: var(--fill-primary-active);
  }
`;