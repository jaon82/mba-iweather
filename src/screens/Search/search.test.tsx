import { Search } from "@screens/Search";
import { api } from "@services/api";
import { mockCityAPIResponse } from "@tests/mocks/api/mockCityAPIResponse";
import { fireEvent, render, screen, waitFor } from "@tests/utils/customRender";

describe("Screen: Search", () => {
  it("should be show city option", async () => {
    jest.spyOn(api, "get").mockResolvedValue({ data: mockCityAPIResponse });

    render(<Search />);

    const searchInput = screen.getByTestId("search-input");
    fireEvent.changeText(searchInput, "São Paulo");

    const option = await waitFor(() => screen.findByText(/são paulo/i));

    expect(option).toBeTruthy();
  });
});
