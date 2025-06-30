import { useState } from 'react';
import axios from 'axios';

const platforms = ['LinkedIn', 'Twitter', 'Instagram'];

function App() {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState(platforms[0]);
  const [post, setPost] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!topic) return alert('Please enter a topic.');
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate-post', {
        topic,
        platform,
      });
      setPost(response.data.post);
    } catch (error) {
      setPost('Failed to generate post. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Social Post Generator</h1>

      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <label className="block mb-2 font-medium">Enter Topic:</label>
        <input
          type="text"
          className="w-full border px-3 py-2 rounded mb-4"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />

        <label className="block mb-2 font-medium">Select Platform:</label>
        <select
          className="w-full border px-3 py-2 rounded mb-4"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          {platforms.map((plat) => (
            <option key={plat} value={plat}>
              {plat}
            </option>
          ))}
        </select>

        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Generate Post'}
        </button>
      </div>

      {post && (
        <div className="w-full max-w-md mt-6 bg-white p-4 rounded shadow">
          <p className="font-semibold">Platform: {platform}</p>
          <p className="mt-2 whitespace-pre-line">{post}</p>
        </div>
      )}
    </div>
  );
}

export default App;
