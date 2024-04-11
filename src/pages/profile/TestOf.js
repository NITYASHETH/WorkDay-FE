import React from 'react';

function TestOf() {
  return (
    <div className="bg-indigo-400 flex justify-center flex-col sm:flex-row items-center min-h-screen p-4 relative">
      <input type="checkbox" id="toggle-more" className="sr-only peer/toggle-more" />
      <input type="checkbox" id="toggle-status" className="sr-only peer/toggle-status" />

      {/* Add JSX equivalents for radio inputs and their labels */}

      <div
        className="group bg-white/30 backdrop-blur-md ring-8 ring-black/5 border border-white/20 py-6 px-4 sm:py-16 sm:px-8 space-y-4 shadow-lg rounded-xl w-full max-w-sm text-center sm:translate-x-24 tansition-all duration-500 relative peer-checked/toggle-status:[&_#panel-status]:scale-100 peer-checked/toggle-status:[&_#panel-status]:opacity-100 peer-checked/toggle-status:[&_#panel-status_label]:scale-100 peer-checked/face-1:[&_#image-1]:scale-100 peer-checked/face-1:[&_#image-1]:opacity-100 peer-checked/face-1:[&_#toggle-1_svg]:text-teal-600 peer-checked/face-2:[&_#image-2]:scale-100 peer-checked/face-2:[&_#image-2]:opacity-100 peer-checked/face-2:[&_#toggle-2_svg]:text-teal-600 peer-checked/face-3:[&_#image-3]:scale-100 peer-checked/face-3:[&_#image-3]:opacity-100 peer-checked/face-3:[&_#toggle-3_svg]:text-teal-600 peer-checked/face-4:[&_#image-4]:scale-100 peer-checked/face-4:[&_#image-4]:opacity-100 peer-checked/face-4:[&_#toggle-4_svg]:text-teal-600"
        style={{
          position: 'relative',
          '--speed': '10s',
          '--border-w': '-5px',
          '--border-clr': '#00000030',
        }}
      >
        {/* Add JSX equivalents for avatar images and text */}
      </div>

      <div className="grid grid-cols-3 gap-2 rounded-xl cursor-pointer bg-black/10 border border-white/30 ring-2 ring-black/5 p-2 place-content-center outline-none ring-0 relative overflow-hidden hover:text-white/70 transition-all duration-300">
        {/* Add JSX equivalents for labels and icons */}
      </div>

      <div
        id="panel-status"
        className="absolute left-6 -top-12 sm:-left-16 sm:top-2 flex flex-col items-center gap-4 sm:gap-6 rounded-xl bg-teal-950/[99%] ring-8 ring-black/5 p-6 origin-bottom sm:origin-right scale-y-0 sm:scale-y-100 sm:scale-x-0 sm:scale-y-100 peer-checked/toggle-more:scale-100 peer-checked/toggle-more:duration-500 block py-2 px-4 rounded-lg transition-all duration-300 text-white -translate-x-56 relative isolate before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-300 before:-z-10 hover:before:bg-teal-700 peer-checked/toggle-more:translate-x-0"
        style={{
          position: 'absolute',
          left: '6px',
          top: '-12px',
          transformOrigin: 'bottom',
          '--speed': '10s',
          '--border-w': '-5px',
          '--border-clr': '#00000030',
        }}
      >
        {/* Add JSX equivalents for status panel */}
      </div>

      <div
        className="rounded-xl bg-teal-950/[99%] ring-8 ring-black/5 py-6 px-4 flex flex-col min-w-60 text-sm transition-all overflow-hidden sm:translate-x-20 origin-top scale-y-0 sm:origin-left sm:scale-x-0 sm:scale-y-100 peer-checked/toggle-more:scale-100 peer-checked/toggle-more:duration-500 block py-2 px-4 rounded-lg transition-all duration-300 text-white -translate-x-56 relative isolate before:absolute before:inset-0 before:rounded-lg before:transition-all before:duration-300 before:-z-10 hover:before:bg-teal-700 peer-checked/toggle-more:translate-x-0"
        style={{
          position: 'relative',
          '--speed': '10s',
          '--border-w': '-5px',
          '--border-clr': '#00000030',
        }}
      >
        {/* Add JSX equivalents for links */}
      </div>

      <p className="absolute bottom-4 left-2/4 -translate-x-2/4 text-sm">
        <a href="https://wallpapers.com/wallpapers/soothing-green-abstract-art-39nynng61vo5ktcp.html" className="hover:text-white" target="_blank">Wallpaper by ssss</a> on Wallpapers.com
      </p>
    </div>
  );
}

export default TestOf;
