export const SideBar = () => {
  const pxl = window.innerWidth / 1920;

  return (
    <div
      className="h-full bg-gray-400 flex flex-col justify-end"
      style={{
        width: pxl * 350,
        paddingLeft: pxl * 10,
        paddingRight: pxl * 10,
      }}
    >
      <div className="h-3/5 flex flex-col" style={{ gap: pxl * 10 }}>
        <div
          className="border-gray-600"
          style={{
            paddingLeft: pxl * 5,
            paddingRight: pxl * 5,
            borderTopWidth: pxl * 5,
            paddingTop: pxl * 15,
          }}
        >
          <div
            className="flex leading-none bg-gray-600 text-gray-600"
            style={{
              height: pxl * 45,
              fontSize: pxl * 48,
              fontFamily: "'pxlLarge', monospace",
            }}
          ></div>
        </div>
        <div
          className="flex-1 flex flex-col bg-gray-600"
          style={{ gap: pxl * 5 }}
        >
          <div className="flex bg-gray-500" style={{ height: pxl * 65 }} />
          <div className="flex bg-gray-500" style={{ height: pxl * 65 }} />
          <div className="flex bg-gray-500" style={{ height: pxl * 65 }} />
        </div>
      </div>
    </div>
  );
};
