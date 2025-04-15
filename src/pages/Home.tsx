const Home = () => {
  const pxl = window.innerWidth / 1920;
  // navigation bar
  return (
    <div
      className="h-full w-full flex flex-col justify-center"
      style={{
        width: pxl * 780,
        gap: pxl * 20,
        paddingTop: pxl * 200,
        paddingRight: pxl * 45,
        paddingLeft: pxl * 45,
      }}
    >
      <div
        className="flex flex-col"
        style={{
          paddingLeft: pxl * 50,
          paddingRight: pxl * 50,
          gap: pxl * 25,
        }}
      >
        <div className="flex flex-col" style={{ gap: pxl * 10 }}>
          <div
            className="w-full flex justify-between bg-gray-200"
            style={{ height: pxl * 35, gap: pxl * 10 }}
          ></div>
          <div className="w-full flex flex-col" style={{ height: pxl * 70 }}>
            <div
              className="w-full flex"
              style={{
                height: pxl * 5,
                paddingLeft: pxl * 5,
                paddingRight: pxl * 5,
              }}
            >
              <div className="flex-1 bg-gray-400" />
            </div>
            <div className="w-full flex" style={{ height: pxl * 5 }}>
              <div className="h-full bg-gray-400" style={{ width: pxl * 10 }} />
              <div className="flex-1 bg-gray-600" />
              <div className="h-full bg-gray-400" style={{ width: pxl * 10 }} />
            </div>
            <div className="flex-1 flex">
              <div className="h-full bg-gray-400" style={{ width: pxl * 5 }} />
              <div className="h-full bg-gray-600" style={{ width: pxl * 5 }} />
              <div className="flex-1 bg-gray-300" style={{ padding: pxl * 5 }}>
                children
              </div>
              <div className="h-full bg-gray-200" style={{ width: pxl * 5 }} />
              <div className="h-full bg-gray-400" style={{ width: pxl * 5 }} />
            </div>
            <div className="w-full flex" style={{ height: pxl * 5 }}>
              <div className="h-full bg-gray-400" style={{ width: pxl * 10 }} />
              <div className="flex-1 bg-gray-200" />
              <div className="h-full bg-gray-400" style={{ width: pxl * 10 }} />
            </div>
            <div
              className="w-full flex"
              style={{
                height: pxl * 5,
                paddingLeft: pxl * 5,
                paddingRight: pxl * 5,
              }}
            >
              <div className="flex-1 bg-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
