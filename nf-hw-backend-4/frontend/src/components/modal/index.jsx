const Modal = ({ isOpen, onClose, children, onPlaylistSelect, songId }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
        <div className="bg-gray-900 p-6 rounded-lg relative w-full max-w-lg shadow-lg">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-lg font-semibold text-white mb-4">Choose a Playlist</div>
          <ul className="text-white divide-y divide-gray-700">
            {children.map(playlist => (
              <li key={playlist._id} 
                  className="py-2 px-3 hover:bg-gray-800 cursor-pointer transition-colors duration-150 ease-in-out"
                  onClick={() => onPlaylistSelect(playlist._id, songId)}>
                {playlist.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

export default Modal