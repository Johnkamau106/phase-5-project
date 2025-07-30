import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchOrphanageById, selectOrphanageById } from '../redux/orphanagesSlice';

const OrphanageDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const orphanage = useSelector((state) => selectOrphanageById(state, id));
  const loading = useSelector((state) => state.orphanages.loading);
  const error = useSelector((state) => state.orphanages.error);

  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    dispatch(fetchOrphanageById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (orphanage && orphanage.reviews) {
      setReviews(orphanage.reviews);
    }
  }, [orphanage]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (review.trim()) {
      // For now, just add review locally
      setReviews([...reviews, { id: Date.now(), text: review }]);
      setReview('');
    }
  };

  if (loading) return <div>Loading orphanage details...</div>;
  if (error) return <div>Error loading orphanage: {error}</div>;
  if (!orphanage) return <div>Orphanage not found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{orphanage.name}</h1>
      <p className="mb-4">{orphanage.description}</p>
      <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
      <ul className="mb-4">
        {reviews.map((r) => (
          <li key={r.id} className="border-b py-2">{r.text}</li>
        ))}
      </ul>
      <form onSubmit={handleReviewSubmit} className="mb-6">
        <textarea
          className="w-full border rounded p-2 mb-2"
          rows="3"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Leave a review"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>
      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={() => alert('Donation functionality to be implemented')}
      >
        Donate
      </button>
    </div>
  );
};

export default OrphanageDetails;
