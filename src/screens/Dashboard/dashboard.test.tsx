import { saveStorageCity } from "@libs/asyncStorage/cityStorage";
import { Dashboard } from "@screens/Dashboard";
import { api } from "@services/api";
import { mockCityAPIResponse } from "@tests/mocks/api/mockCityAPIResponse";
import { mockWeatherAPIResponse } from "@tests/mocks/api/mockWeatherAPIResponse";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@tests/utils/customRender";

describe("Screen: Dashboard", () => {
  it("should be show city weather", async () => {
    jest.spyOn(api, "get").mockResolvedValue({ data: mockWeatherAPIResponse });

    const city = {
      id: "1",
      name: "Rio do Sul, BR",
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);

    render(<Dashboard />);

    const cityName = await waitFor(() => screen.findByText(/rio do sul/i));
    expect(cityName).toBeTruthy();
  });

  it("should be show another selected weather city", async () => {
    const city = {
      id: "1",
      name: "Rio do Sul, BR",
      latitude: 123,
      longitude: 456,
    };

    await saveStorageCity(city);

    jest
      .spyOn(api, "get")
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse })
      .mockResolvedValueOnce({ data: mockCityAPIResponse })
      .mockResolvedValueOnce({ data: mockWeatherAPIResponse });

    render(<Dashboard />);

    await waitForElementToBeRemoved(() => screen.queryByTestId("loading"));

    const cityName = "São Paulo";

    await waitFor(() => {
      act(() => {
        const search = screen.getByTestId("search-input");
        fireEvent.changeText(search, cityName);
      });
    });

    await waitFor(() => {
      act(() => {
        fireEvent.press(screen.getByText(cityName, { exact: false }));
      });
    });

    await waitFor(() => {
      expect(screen.getByText(cityName, { exact: false })).toBeTruthy();
    });
  });
});
