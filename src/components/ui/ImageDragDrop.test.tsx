import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ImageDragDrop from "./ImageDragDrop";
import { vi } from "vitest";
import { useDropzone } from "react-dropzone";

vi.mock("react-dropzone", () => ({
  useDropzone: vi.fn(() => ({
    getRootProps: vi.fn(),
    getInputProps: vi.fn(),
    isDragActive: false,
  })),
}));

vi.mock("../../assets/icons", () => ({
  CircleX: ({ size, className }: { size: number; className: string }) => (
    <div
      data-testid="remove-icon"
      className={className}
      style={{ fontSize: size }}
    />
  ),
}));

describe("ImageDragDrop", () => {
  const onChangeMock = vi.fn();

  beforeEach(() => {
    onChangeMock.mockClear();
  });

  it("renders the default state", () => {
    render(<ImageDragDrop dataUrl={null} onChange={onChangeMock} />);

    expect(screen.getByText("Drag and drop an image here")).toBeInTheDocument();
    expect(screen.getByText("or click to browse")).toBeInTheDocument();
  });

  it("renders image preview when an image is dropped", async () => {
    const acceptedFile = new File(["dummy content"], "image.png", {
      type: "image/png",
    });

    useDropzone.mockReturnValue({
      getRootProps: () => ({ onClick: vi.fn() }),
      getInputProps: () => ({}),
      isDragActive: false,
    });

    const readerMock = vi.fn();
    const mockFileReader = {
      onloadend: readerMock,
      readAsDataURL: vi.fn(),
    };
    global.FileReader = vi.fn(() => mockFileReader);

    render(<ImageDragDrop dataUrl={null} onChange={onChangeMock} />);

    fireEvent.drop(screen.getByText("Drag and drop an image here"), {
      dataTransfer: { files: [acceptedFile] },
    });

    mockFileReader.onloadend();

    await waitFor(() => expect(readerMock).toHaveBeenCalled());
  });

  it("renders an alert when a non-image file is dropped", async () => {
    const alertMock = vi.fn();
    global.alert = alertMock;

    const nonImageFile = new File(["dummy content"], "document.txt", {
      type: "text/plain",
    });

    useDropzone.mockReturnValue({
      getRootProps: () => ({ onClick: vi.fn() }),
      getInputProps: () => ({}),
      isDragActive: false,
    });

    render(<ImageDragDrop dataUrl={null} onChange={onChangeMock} />);

    fireEvent.drop(screen.getByText("Drag and drop an image here"), {
      dataTransfer: { files: [nonImageFile] },
    });
  });

  it("removes the image when the remove button is clicked", () => {
    const previewDataUrl = "data:image/png;base64,dummyBase64String";
    render(<ImageDragDrop dataUrl={previewDataUrl} onChange={onChangeMock} />);

    const removeButton = screen.getByTestId("remove-icon");
    fireEvent.click(removeButton);

    expect(screen.queryByAltText("Preview")).not.toBeInTheDocument();
    expect(onChangeMock).toHaveBeenCalledWith("");
  });

  it("updates preview when the dataUrl prop changes", () => {
    const { rerender } = render(
      <ImageDragDrop
        dataUrl="data:image/png;base64,oldDataUrl"
        onChange={onChangeMock}
      />
    );

    expect(screen.getByAltText("Preview")).toHaveAttribute(
      "src",
      "data:image/png;base64,oldDataUrl"
    );

    rerender(
      <ImageDragDrop
        dataUrl="data:image/png;base64,newDataUrl"
        onChange={onChangeMock}
      />
    );

    expect(screen.getByAltText("Preview")).toHaveAttribute(
      "src",
      "data:image/png;base64,newDataUrl"
    );
  });
});
