import { Colors, pxl } from "../constants/ThemeConstants";

const Home = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex" style={{ margin: pxl * 100 }}>
        {Object.entries(Colors).map(([key, color]) => (
          <div
            key={key}
            style={{
              width: pxl * 50,
              height: pxl * 50,
              backgroundColor: color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
