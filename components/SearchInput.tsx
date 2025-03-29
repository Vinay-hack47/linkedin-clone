import { Input } from "@/components/ui/input"


const SearchInput = () => {
  return (
    <div className="flex items-center gap-3">
      <Input placeholder="Search..." 
      type="text"
      className="bg-[#EDF3F8] w-80 rounded-lg border-none"
      />
    </div>
  );
};

export default SearchInput;