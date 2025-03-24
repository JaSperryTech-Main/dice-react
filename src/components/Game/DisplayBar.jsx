const DisplayBar = ({ player }) => {
  return (
    <aside className="w-[33vw] h-screen border border-black p-5 box-border bg-[#f8f8f8] flex justify-center  text-center">
      <div className="w-full flex ">
        <p className="text-lg font-semibold">Gold: {player.gold}</p>
      </div>
    </aside>
  );
};

export default DisplayBar;
