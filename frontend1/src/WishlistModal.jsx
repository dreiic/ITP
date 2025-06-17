import React from "react";

export default function WishlistModal({ wishlist, onClose, navigate }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="wishlist-modal"
        onClick={e => e.stopPropagation()} // da klik unutar modala ne zatvori modal
      >
        <div className="modal-header">
          <h2>Moja wishlist-a</h2>
          <button 
            className="close-btn" 
            onClick={onClose}
            aria-label="Zatvori"
          >
            ×
          </button>
        </div>
        
        <div className="modal-content">
          {wishlist.length === 0 ? (
            <div className="empty-wishlist">
              <p>Nema igara u wish listi.</p>
            </div>
          ) : (
            <div className="games-grid-clean">
              {wishlist.map(game => (
                <div
                  key={game.id}
                  className="game-card-clean"
                  onClick={() => {
                    navigate(`/game/${game.id}`);
                    onClose();
                  }}
                >
                  <img
                    src={game.slika_url}
                    alt={game.naziv}
                    className="game-cover-clean"
                  />
                  <div className="game-info-clean">
                    <h3 className="game-title-clean">{game.naziv}</h3>
                    <span className="game-genre-clean">{game.zanr}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}