import { render, screen, fireEvent } from "@testing-library/react";

import { vi } from "vitest";
import LessonOne from "./LessonOne"

describe("LessonOne", () => {
  it("Label과 Input, Button이 제대로 렌더링 되는지", () => {
    // arrange
    render(<LessonOne />);

    const nameLabel = screen.getByText(/이름/i);
    const nameInput = screen.getByRole("textbox");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    // assert
    expect(nameLabel).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();
    expect(checkbox).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it("이름을 입력 후 약관 동의한 다음, 제출 버튼을 클릭시 Alert 창으로 입력한 값이 출력되는지", () => {
    // arrange
    const alertMock = vi.fn();
    window.alert = alertMock;
    render(<LessonOne />);

    const nameInput = screen.getByRole("textbox");
    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    // act
    fireEvent.change(nameInput, { target: { value: "hello" } });
    fireEvent.click(checkbox);
    fireEvent.click(button);

    // assert
    expect(alertMock).toHaveBeenCalledWith("name: hello");
  });

  it("약관 미동의시 alert 창이 열리지 않는지", () => {
    // arrange - window.alert를 모킹
    const alertMock = vi.fn();
    window.alert = alertMock;
    render(<LessonOne />);

    const nameInput = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    // act
    fireEvent.change(nameInput, { target: { value: "hello" } });
    fireEvent.click(button);

    // assert
    expect(alertMock).not.toHaveBeenCalled();
  });
});
