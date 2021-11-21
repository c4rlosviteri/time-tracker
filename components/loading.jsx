function Loading() {
  return (
    <div className="h-screen w-screen grid place-items-center">
      <span
        className="animate-spin border-4 border-gray-400 h-6 w-6 block rounded-full"
        style={{
          borderRightColor: "black",
        }}
      />
    </div>
  );
}

export default Loading;
