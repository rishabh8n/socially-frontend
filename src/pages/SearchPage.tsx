import axios from "@/axios/axios";
import ProfileCard from "@/components/ProfileCard";
import { SearchIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchUsers = useDebouncedCallback(async (query: string) => {
    try {
      if (!query) {
        return;
      }
      setLoading(true);
      const response = await axios.post(`/search/users`, {
        query: query,
      });
      setData(response.data.data.users);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, 1000);
  return (
    <div className="h-full flex flex-col">
      <div className="p-2 w-full flex items-center justify-center border-b border-gray-300">
        <div className="relative w-full max-w-[500px]">
          <SearchIcon className="absolute top-1/2 left-3 transform -translate-y-1/2 text-primary/60" />
          <input
            type="text"
            autoFocus
            value={query}
            className="w-full max-w-[500px] py-2 px-11 border border-gray-300 rounded-full focus:outline-none"
            placeholder="Search"
            onChange={(e) => {
              setQuery(e.target.value);
              searchUsers(e.target.value);
            }}
          />
          <button
            className="absolute top-1/2 right-3 transform -translate-y-1/2"
            onClick={() => setQuery("")}
          >
            <XIcon />
          </button>
        </div>
      </div>
      {query && (
        <div className="w-full overflow-y-auto">
          <div className="p-2 md:p-0 w-full max-w-[500px] mx-auto flex flex-col gap-2">
            <p>Search results for '{query}'</p>
            {data?.length === 0 && !loading && <p>No results found</p>}
            {loading && <p>Loading</p>}
            {data.map((user) => (
              <ProfileCard key={user._id} userDetails={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
