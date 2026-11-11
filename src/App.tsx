import { Suspense, Component } from "react";

import ImageSlider from "./components/ImageSlider/ImageSlider";

import { FaArrowsRotate } from "react-icons/fa6";

export type FetchImageType = {
  id: number;
  download_url: string;
};
// const url: string = "https://picsum.photos/v2/list?page=65&limit=10";

async function fetchImgArr(
  pageNum: string,
  limit: string,
): Promise<FetchImageType[]> {
  const response = await fetch(
    `https://picsum.photos/v2/list?page=${pageNum}&limit=${limit}`,
  );
  if (!response.ok) {
    throw new Error(`HTTP Error, status: ${response.status}`);
  }
  const data: FetchImageType[] = await response.json();
  return data;
}

const getImgFromAPI = fetchImgArr("65", "5");

interface ErrorBoundaryProps {
  children: React.ReactNode;
}
interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ImgErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };
  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }
  public render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <p>Failed to load images:</p>
          <p>{this.state.error?.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  console.log(getImgFromAPI);
  return (
    <>
      <h1 className="text-5xl">this is from App</h1>
      <ImgErrorBoundary>
        <Suspense
          fallback={
            <div className="flex justify-center mt-15">
              <span>
                <FaArrowsRotate className="text-5xl animate-spin text-yellow-300" />
              </span>
            </div>
          }
        >
          <ImageSlider imgPromise={getImgFromAPI} />
        </Suspense>
      </ImgErrorBoundary>
    </>
  );
}

export default App;
