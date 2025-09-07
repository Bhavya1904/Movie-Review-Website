import {useEffect, useRef} from 'react';
import api from '../../api/axiosConfig.js';
import {useParams} from 'react-router-dom';

const Reviews = ({getMovieData, movie, reviews, setReviews}) => {

    const revText = useRef();
    let params = useParams();
    const movieId = params.movieId;

    useEffect(()=>{
        getMovieData(movieId);
    },[])

    const addReview = async (e) =>{
        e.preventDefault();
        const rev = revText.current;
        try
        {
            const response = await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId});
            const updatedReviews = [...reviews, {body:rev.value}];
            rev.value = "";
            setReviews(updatedReviews);
        }
        catch(err)
        {
            console.error(err);
        }
    }

  return (
    <div className="container mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <img src={movie?.poster} alt="" className="w-full rounded-lg shadow-lg" />
            </div>
            <div>
                <h3 className="text-3xl font-bold mb-4">Reviews</h3>
                <form>
                    <textarea ref={revText} placeholder="Write a Review..." className="w-full p-4 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                    <button onClick={addReview} className="mt-4 bg-yellow-400 text-gray-900 font-semibold py-2 px-4 rounded-lg hover:bg-yellow-500 transition-colors">
                        Submit
                    </button>
                </form>
                <hr className="my-6 border-gray-700"/>
                {
                    reviews?.map((r, index) => {
                        return(
                            <div key={index} className="p-4 bg-gray-800 rounded-lg mb-4">
                                <p>{r.body}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
  )
}

export default Reviews

