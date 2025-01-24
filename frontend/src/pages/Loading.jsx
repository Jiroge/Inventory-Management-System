export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-blue-500"></div>
        <p className="mt-4 text-gray-500">Loading data, please wait...</p>
      </div>
    </div>
  );
}
